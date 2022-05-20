import React, { useState, useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  formatDateSimple,
  generateUUID,
  heightPercentageToPixels,
  Theme,
  typeLocalization,
  widthPercentageToPixels,
} from "../../helpers";
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faPen,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Lang from "../../language";
import {
  addItemsFromReceipt,
  getItemsFromReceipt,
} from "../../api/ScannerRequests";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Divider from "../../components/Divider";
import { MaskedTextInput } from "react-native-mask-text";
import { InventoryTypings } from "../../constants";
import { FlatList } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import ScreenNames from "../ScreenNames";
import { LoadingSpinner } from "../../components";
import { InventoryItemObject } from "../../types";

type CapturedImageProps = {
  uri: string;
  clearImage: any;
};
const CapturedImage = ({ uri, clearImage }: CapturedImageProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={clearImage}
        hitSlop={10}
        style={{ position: "absolute", top: 50, right: 50 }}
      >
        <FontAwesomeIcon
          icon={faTimes}
          color={Theme.colors.mainContrast}
          size={45}
        />
      </Pressable>
      {uri && (
        <Image
          source={{ uri: uri }}
          style={{ width: "85%", height: "90%", borderRadius: 30, zIndex: -1 }}
        />
      )}
    </View>
  );
};

/* TODO: TextInputs in the rendered list can cause crashes. 
  Fix: 
  change edit mode of the item names to be i.e a popup that allows easier edits. should solve the issue.
*/

// INFO: only works in the DEV env as of 09/03/2022

// same type def in ScannerRequests.ts. Should probably be exported from somewhere
type ItemArray = {
  expirationDate: Date | undefined;
  itemName: string;
  type: string;
};

export const ReceiptScanner = ({ navigation }: any) => {
  const [permissionStatus, setPermissionStatus] = useState<boolean | null>(
    null
  );
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [editList, setEditList] = useState(false); // default to false -- true for emu testing
  const [firebaseFilePath, setFirebareFilePath] = useState<string>("");
  const [itemList, setItemList] = useState<InventoryItemObject[] | null>(null);
  const [pressedItemIndex, setPressedItemIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>();

  const isFocused = useIsFocused();

  const auth = getAuth();

  const checkCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermissionStatus(status === "granted");

    if (status !== "granted") {
      alert("Needs permission to use the camera!");
    }
  };

  const populateList = async (uri: string) => {
    // const result = await getItemsFromReceipt(
    //   "https://firebasestorage.googleapis.com/v0/b/foodomatic-3c7c1.appspot.com/o/d61119e4-5fd2-4f7e-9bca-c29c097bfe2b?alt=media&token=4a478899-d9fd-4424-a49a-c81531586c70"
    // );
    // uncomment above for emu testing and comment below
    setIsLoading(true);
    const result = await getItemsFromReceipt(uri);

    if (result) {
      let tempArr: InventoryItemObject[] = [];

      result.length > 0 &&
        result.map((item: string) => {
          tempArr.push({
            itemName: item,
            expirationDate: new Date(),
            type: "",
          });
        });

      if (tempArr.length > 0) {
        setItemList(tempArr);
      }
    }

    setIsLoading(false);
  };

  const addScannedItems = async () => {
    if (auth.currentUser && itemList) {
      let result = await addItemsFromReceipt(auth.currentUser.uid, itemList);

      if (result) {
        setItemList([]);
        setEditList(false);
        navigation.navigate(ScreenNames.MainTab);
        alert("Items have been added");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      checkCameraPermissions();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const captureImage = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();

      if (image) {
        let _img = await processImage(image.uri);
        _img && setImage(_img);
      }
    }
  };

  const uploadImage = async (uri: string | null) => {
    if (uri) {
      const blob: Blob | Uint8Array | ArrayBuffer = await new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.onload = function () {
            resolve(xhr.response);
          };

          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };

          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        }
      );

      const storageRef = ref(getStorage(), generateUUID());
      // const result = await uploadBytes(storageRef, blob);
      if (storageRef && storageRef.fullPath) {
        let result = await uploadBytes(storageRef, blob)
          .then((snapshot) => {
            if (snapshot) {
              setEditList(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // if (storageRef && storageRef.fullPath) {
      //   setFirebaseFilePath(storageRef.fullPath);
      // }

      // blob.close();

      setImage(null);

      const url = await getDownloadURL(storageRef);
      if (url) {
        return url;
      }
      return null;
      // return await getDownloadURL(storageRef);
    }
  };

  const processImage = async (image: string) => {
    const processedImage =
      image &&
      (await manipulateAsync(
        image,
        [
          // the image needs to be flipped if taken with front cam (?)
          /* { flip: FlipType.Horizontal } */
        ],
        {
          compress: 0.1, // TODO: compress IOS more than Android
        }
      ));

    if (processedImage) {
      setImage(processedImage.uri);
      return processedImage.uri;
    }
  };

  const renderItem = (item: InventoryItemObject, index: number) => {
    console.log(item);
    return (
      <View>
        <View style={styles.editListItem}>
          <Pressable>
            <FontAwesomeIcon icon={faPen} size={15} color="white" />
          </Pressable>

          <Text /* numberOfLines={1} */ style={styles.editListItemName}>
            {item.itemName ?? "--"}
          </Text>

          <View style={styles.modifyListItem}>
            {pressedItemIndex !== index && (
              <MaskedTextInput
                mask="99/99/99"
                style={{
                  backgroundColor: "grey",
                  padding: 3,
                  borderRadius: 5,
                  height: heightPercentageToPixels(5.5),
                }}
                placeholder={
                  item.expirationDate
                    ? formatDateSimple(item.expirationDate)
                    : formatDateSimple(new Date())
                }
                placeholderTextColor={Theme.colors.mainText}
                maxLength={8}
                onChangeText={(text) => {
                  if (itemList && text.length === 8) {
                    let items = [...itemList];
                    let item = { ...items[index] };

                    item.expirationDate = new Date(
                      `${text.substring(3, 5)}/${text.substring(
                        0,
                        2
                      )}/${text.substring(6, 9)}`
                    );

                    item.expirationDate.setHours(
                      item.expirationDate.getHours() + 3
                    );

                    items[index] = item;

                    setItemList(items);
                  } else {
                    return;
                  }
                }}
                keyboardType="numeric"
              />
            )}
            {pressedItemIndex !== index ? (
              <>
                <Pressable
                  onPress={() => {
                    if (pressedItemIndex !== index) {
                      setPressedItemIndex(index);
                    } else {
                      setPressedItemIndex(-1);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.typeButton,
                      item.type.length > 0 && {
                        backgroundColor: Theme.colors.mainContrast,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {item.type.length > 0
                      ? typeLocalization(item.type)
                      : Lang.screens.receiptScanner.inventoryPicker}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (itemList) {
                      let items = [...itemList];

                      items.splice(index, 1);

                      setItemList(items);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size={20} color="white" />
                </Pressable>
              </>
            ) : (
              <View>
                <View style={styles.toggleButtonsContainer}>
                  <Pressable
                    style={[
                      styles.toggleButtons,
                      item.type.localeCompare(InventoryTypings.Freezer) ===
                        0 && {
                        backgroundColor: Theme.colors.mainContrast,
                      },
                    ]}
                    onPress={() => {
                      if (itemList) {
                        let items = [...itemList];
                        let item = { ...items[index] };

                        item.type = InventoryTypings.Freezer;
                        items[index] = item;
                        setItemList(items);

                        setPressedItemIndex(-1);
                      }
                    }}
                  >
                    <Text style={styles.toggleButtonsText} numberOfLines={1}>
                      {Lang.screens.inventory.freezer}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.toggleButtons,
                      item.type.localeCompare(InventoryTypings.Fridge) ===
                        0 && {
                        backgroundColor: Theme.colors.mainContrast,
                      },
                    ]}
                    onPress={() => {
                      if (itemList) {
                        let items = [...itemList];
                        let item = { ...items[index] };

                        item.type = InventoryTypings.Fridge;
                        items[index] = item;
                        setItemList(items);

                        setPressedItemIndex(-1);
                      }
                    }}
                  >
                    <Text style={styles.toggleButtonsText} numberOfLines={1}>
                      {Lang.screens.inventory.fridge}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.toggleButtons,
                      item.type.localeCompare(InventoryTypings.Pantry) ===
                        0 && {
                        backgroundColor: Theme.colors.mainContrast,
                      },
                    ]}
                    onPress={() => {
                      if (itemList) {
                        let items = [...itemList];
                        let item = { ...items[index] };

                        item.type = InventoryTypings.Pantry;
                        items[index] = item;
                        setItemList(items);

                        setPressedItemIndex(-1);
                      }
                    }}
                  >
                    <Text style={styles.toggleButtonsText} numberOfLines={1}>
                      {Lang.screens.inventory.pantry}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
        <Divider width={widthPercentageToPixels(90)} opacity={0.2} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!editList && !image ? (
        <View style={styles.cameraContainer}>
          {isFocused &&
            !editList && ( // !editList &&  - is this needed?
              <Camera
                ref={(ref) => setCamera(ref)}
                ratio="16:9" // this will probably fuck shit up on shitty phones
                style={styles.camera}
                type={cameraType}
              />
            )}
        </View>
      ) : (
        !editList &&
        image && <CapturedImage uri={image} clearImage={() => setImage(null)} />
      )}

      {!editList && !image ? (
        <Pressable
          style={{
            alignSelf: "center",
          }}
          onPress={async () => {
            await captureImage();
          }}
          hitSlop={10}
        >
          <FontAwesomeIcon
            icon={faCamera}
            size={widthPercentageToPixels(12)}
            color={"white"}
          />
        </Pressable>
      ) : !editList ? (
        <Pressable
          style={styles.scanButton}
          onPress={async () => {
            let upload = await uploadImage(image);

            if (upload) {
              await populateList(upload);
            }
          }}
        >
          <Text style={styles.scanButtonText}>
            {Lang.screens.receiptScanner.scan}
          </Text>
        </Pressable>
      ) : (
        <>
          {isLoading && (
            <LoadingSpinner
              size={widthPercentageToPixels(30)}
              animating={isLoading}
              color={"white"}
            />
          )}
          {itemList && (
            <FlatList
              data={itemList}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={() => generateUUID()}
              style={{
                marginHorizontal: widthPercentageToPixels(2.5),
              }}
            />
          )}
          {!isLoading && (
            <Pressable
              onPress={async () => {
                if (itemList && itemList.length > 0) {
                  await addScannedItems();
                } else {
                  setEditList(false);
                  // comment above and uncomment below for emu testing
                  // await populateList("");
                  //&& itemList.length > 0
                }
              }}
              style={styles.addItems}
            >
              <Text style={styles.addItemsText}>
                {itemList
                  ? Lang.screens.receiptScanner.addItems
                  : Lang.screens.receiptScanner.noItems}
              </Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    flexGrow: 1,
    justifyContent: "space-around",
    paddingVertical: "5%",
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Theme.colors.mainContrast,
    borderRadius: 30,
    overflow: "hidden",
    height: "85%",
    width: "85%",
  },
  scanButton: {
    backgroundColor: Theme.colors.darkAccent,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  scanButtonText: {
    color: Theme.colors.mainText,
    fontSize: widthPercentageToPixels(9),
    textAlign: "center",
  },
  editListItem: {
    height: heightPercentageToPixels(7),
    flexDirection: "row",
    alignItems: "center",
  },
  modifyListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "45%",
    alignItems: "center",
  },
  editListItemName: {
    color: Theme.colors.mainText,
    fontSize: widthPercentageToPixels(4.5),
    paddingHorizontal: 5,
    flex: 1,
  },
  modalView: {
    marginTop: 300,
    margin: 20,
    backgroundColor: Theme.colors.background,
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  toggleButtonsContainer: {
    flexDirection: "row",
    height: "80%",
  },
  toggleButtons: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  toggleButtonsText: {
    color: Theme.colors.mainText,
  },
  addItems: {
    borderRadius: 5,
    backgroundColor: "tomato",
    alignSelf: "center",
    marginTop: "3%",
  },
  addItemsText: {
    fontSize: widthPercentageToPixels(4),
    padding: 10,
    color: Theme.colors.mainText,
  },
  typeButton: {
    color: "white",
    backgroundColor: "grey",
    paddingHorizontal: 3,
    borderRadius: 5,
    height: "80%",
    textAlignVertical: "center",
  },
});
