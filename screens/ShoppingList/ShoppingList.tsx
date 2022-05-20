import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
} from "../../helpers";
import Divider from "../../components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArchive,
  faArrowRight,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  addShoppingList,
  deleteShoppingList,
  getAllShoppingLists,
} from "../../api/ShoppingListRequests";
import InputField from "../../components/InputField";
import Lang from "../../language";
import ScreenNames from "../ScreenNames";
import { Auth, getAuth } from "firebase/auth";
import RBSheet from "react-native-raw-bottom-sheet";
import { ShoppingListProps } from "../../types";

// TODO add types
// TODO rename folder to follow camelCase

export const ShoppingList = ({ navigation, route }: any) => {
  const [addList, setAddList] = useState<boolean>(false);
  const [newList, setNewList] = useState<string>("");
  const [fetchedLists, setFetchedLists] = useState<ShoppingListProps[]>([]);
  const [displayedLists, setDisplayedLists] = useState<ShoppingListProps[]>([]);
  const [archivedLists, setArchivedLists] = useState<ShoppingListProps[]>([]);

  const { currentUser }: Auth = getAuth();

  const refArchivedList = useRef<RBSheet>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => refArchivedList.current?.open()}
          hitSlop={7}
          style={{ paddingRight: 15 }}
        >
          <FontAwesomeIcon
            icon={faArchive}
            size={widthPercentageToPixels(7)}
            color={"white"}
          />
        </Pressable>
      ),
    });
  }, [archivedLists]);

  async function deleteList(listId: string) {
    const response = await deleteShoppingList(currentUser?.uid, listId);
    let newFetchedLists: ShoppingListProps[] = [];

    if (response) {
      alert(Lang.general.oops);
    } else {
      newFetchedLists = fetchedLists.filter(
        (list: ShoppingListProps, index) => {
          if (list._id !== listId) {
            return list;
          }
        }
      );

      setFetchedLists(newFetchedLists);
    }
  }

  async function createList() {
    if (newList.length > 0) {
      const response = await addShoppingList(currentUser?.uid, newList);

      if (response === 403) {
        alert(Lang.screens.shoppingList.duplicateList);
      } else if (response === 400) {
        alert(Lang.general.oops);
      } else {
        if (fetchedLists.length === 0) {
          setFetchedLists([response]);
        } else {
          setFetchedLists((prevState) => [...prevState, response]);
        }
      }
    }

    setNewList("");
    setAddList(false);
  }

  // TODO return all lists from the createShoppingList request to avoid this hacky shit
  useMemo(async () => {
    const response = await getAllShoppingLists(currentUser?.uid);

    if (response === 204) {
      setFetchedLists([]);
    } else if (response) {
      setFetchedLists(response);
    } else {
      alert(Lang.general.oops);
    }
  }, [route.params]);

  useMemo(() => {
    let _displayedLists: ShoppingListProps[] = [];
    let _archivedLists: ShoppingListProps[] = [];

    fetchedLists.length > 0 &&
      fetchedLists.filter((list, index) => {
        if (list.archived) {
          _archivedLists.push(list);
        } else if (!list.archived) {
          _displayedLists.push(list);
        }
      });

    setDisplayedLists(_displayedLists);
    setArchivedLists(_archivedLists);
  }, [fetchedLists]);

  return (
    <View style={styles.container}>
      <View style={styles.addList}>
        {!addList ? (
          <Pressable
            style={{
              flexDirection: "row",
            }}
            onPress={() => setAddList(!addList)}
          >
            <FontAwesomeIcon
              icon={faPlus}
              size={widthPercentageToPixels(8)}
              color={Theme.colors.mainText}
              style={{ marginRight: widthPercentageToPixels(2) }}
            />
            <Text style={styles.newListText}>
              {Lang.screens.shoppingList.addNewList}
            </Text>
          </Pressable>
        ) : (
          <View style={styles.addListField}>
            <TextInput
              onChangeText={setNewList}
              value={newList}
              placeholder={Lang.screens.shoppingList.addNewListPlaceholder}
              style={{ flexGrow: 1, color: Theme.colors.mainText }}
              placeholderTextColor={Theme.colors.mainText}
              onSubmitEditing={async () => await createList()}
              onEndEditing={() => setAddList(false)}
              autoFocus={addList}
            />
          </View>
        )}
      </View>

      <Divider width={widthPercentageToPixels(50)} opacity={0.5} />
      <ScrollView style={{ marginTop: "10%" }}>
        {displayedLists ? (
          displayedLists?.map((list, index) => {
            return (
              <View key={list._id} style={{ flexDirection: "row" }}>
                <Pressable
                  style={styles.list}
                  onPress={() => {
                    navigation.navigate(ScreenNames.SingleList, {
                      name: list.listName,
                      id: list._id,
                    });
                  }}
                >
                  <Text numberOfLines={1} style={styles.listName}>
                    {list.listName}
                  </Text>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    color={Theme.colors.tomato}
                    size={24}
                  />
                </Pressable>

                <Pressable
                  style={{
                    alignSelf: "center",
                    paddingLeft: 10,
                  }}
                  onPress={() => deleteList(list._id)}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    color={Theme.colors.light}
                    size={widthPercentageToPixels(5)}
                  />
                </Pressable>
              </View>
            );
          })
        ) : (
          <Text
            style={{
              color: Theme.colors.mainText,
              fontSize: widthPercentageToPixels(5),
              textAlign: "center",
              alignSelf: "center",
              maxWidth: "90%",
            }}
          >
            {Lang.screens.shoppingList.noLists}
          </Text>
        )}
      </ScrollView>

      <RBSheet
        ref={refArchivedList}
        customStyles={{
          container: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: Theme.colors.background,
            paddingVertical: "2%",
          },
        }}
        height={heightPercentageToPixels(45)}
      >
        <Text
          style={{
            fontSize: Theme.fonts.sizes.normal,
            color: Theme.colors.mainText,
            alignSelf: "center",
            paddingBottom: 5,
          }}
        >
          {Lang.screens.shoppingList.archivedLists}
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {archivedLists &&
            archivedLists.length > 0 &&
            archivedLists.map((list) => {
              return (
                <View key={list._id} style={styles.archivedList}>
                  <Pressable
                    style={{
                      width: "80%",
                    }}
                    onPress={() => {
                      refArchivedList.current?.close();
                      navigation.navigate(ScreenNames.SingleList, {
                        id: list._id,
                        name: list.listName,
                        isArchived: list.archived,
                      });
                    }}
                  >
                    <Text numberOfLines={1} style={styles.listName}>
                      {list.listName}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      deleteList(list._id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size={widthPercentageToPixels(5)}
                      color={Theme.colors.mainContrast}
                    />
                  </Pressable>
                </View>
              );
            })}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    height: "100%",
    alignItems: "center",
    paddingTop: heightPercentageToPixels(5),
  },
  newListText: {
    color: Theme.colors.mainText,
    fontSize: widthPercentageToPixels(5),
  },
  list: {
    width: widthPercentageToPixels(65),
    borderRadius: 5,
    paddingVertical: "3%",
    marginVertical: "2%",
    backgroundColor: Theme.colors.darkAccent,
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  listName: {
    maxWidth: "90%",
    color: Theme.colors.mainText,
    fontSize: widthPercentageToPixels(4.5),
  },
  archivedList: {
    width: "45%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: "1.5%",
    backgroundColor: Theme.colors.darkAccent,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  addList: {
    alignItems: "center",
    justifyContent: "center",
    height: heightPercentageToPixels(9),
    width: widthPercentageToPixels(55),
    // borderWidth: 1,
  },
  addListField: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    width: "90%",
    height: "90%",
  },
});
