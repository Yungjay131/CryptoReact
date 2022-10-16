import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants";

function convertProgressToFlexValue(progress) {
  return progress * 10;
}

const ProgressBar = ({ progress, props_style }) => {
  return (
    <View style={[styles.main, props_style]}>
      <View
        style={[{ flex: convertProgressToFlexValue(progress) }, styles.view_1 ]}
      />
      <View
        style={[{ flex: 1 - convertProgressToFlexValue(progress) }, styles.view_2 ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    height: 4,
    borderRadius: 6
  },
  view_1:{
    backgroundColor: COLORS.blue,
  },
  view_2: {
    backgroundColor: COLORS.light_blue,
  }
});

export default ProgressBar;
