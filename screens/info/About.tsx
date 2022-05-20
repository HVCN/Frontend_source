import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Theme } from "../../helpers";
import { foodomaticAPI } from "../../api/API";

export const About = () => {
  const [showDevInfo, setShowDevInfo] = useState(false);
  const [endpoint, setEndpoint] = useState<string | undefined>();

  useMemo(async () => {
    let end = await foodomaticAPI();
    end && setEndpoint(end.defaults.baseURL);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Her kan det stå noe greier</Text>
        <Pressable
          style={{
            borderWidth: 1,
            borderRadius: 5,
            alignSelf: "center",
            padding: 10,
          }}
          onLongPress={() => {
            setShowDevInfo(!showDevInfo);
          }}
        >
          <Text style={{ color: Theme.colors.mainContrast }}>
            Hemmelig knapp. Hold inne på meg :D
          </Text>
        </Pressable>
        {showDevInfo && endpoint && (
          <Text style={{ color: "white" }}>Endepunkt: {endpoint}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Theme.colors.background,
    justifyContent: "center",
    flex: 1,
  },
  container: {
    alignSelf: "center",
    width: "95%",
    height: "95%",
    backgroundColor: Theme.colors.darkAccent,
    borderRadius: 5,
    padding: 10,
    justifyContent: "space-evenly",
  },
});
