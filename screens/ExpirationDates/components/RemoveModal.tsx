import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { deleteItemFromInventory } from "../../../api/InventoryRequests";
import { Theme, widthPercentageToPixels } from "../../../helpers";
import Lang from "../../../language";
import { getAuth } from "firebase/auth";
import { ModalProps } from "../../../types";

export const RemoveModal = ({
  item,
  type,
  dispatch,
  reRender,
  state,
}: ModalProps) => {
  const [modalVisible, setModalVisible] = state;

  const auth = getAuth();

  const defaultLocation = "home";

  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible ?? false}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {Lang.screens.expiration.sureRemove} {item.itemName}?
          </Text>
          <View style={styles.buttonView}>
            <Pressable
              onPress={async () => {
                item._id &&
                  (await deleteItemFromInventory(auth?.currentUser?.uid, {
                    type: type,
                    location: defaultLocation,
                    id: item._id,
                  })
                    .then(() => {
                      dispatch(!reRender);
                      setModalVisible(false);
                    })
                    .catch(() => alert(Lang.general.oops)));
              }}
              style={styles.buttons}
            >
              <Text style={styles.buttonText}>
                {Lang.screens.expiration.remove}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.buttons}
            >
              <Text style={styles.buttonText}>
                {Lang.screens.expiration.no}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: 300,
    margin: 20,
    backgroundColor: Theme.colors.mainColor,
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
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToPixels(70),
  },
  buttons: {
    backgroundColor: Theme.colors.mainLight,
    borderRadius: 30,
    width: widthPercentageToPixels(30),
    padding: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Theme.colors.tomato,
    fontSize: widthPercentageToPixels(5),
  },
  modalText: {
    color: "white",
    marginBottom: 20,
    fontSize: widthPercentageToPixels(5),
    alignItems: "center",
    textAlign: "center",
  },
});
