import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants"; /* from index.js */

const OutlinedButton = ({ text, onClickHandler, rightImgSrc, leftImgSrc, props_style}) => {
  return (
    <TouchableOpacity style={[styles.outlined_btn, props_style]} onPress={onClickHandler}>
       { leftImgSrc &&
        <Image style={styles.img_left} source={leftImgSrc} resizeMode="contain"/>
       }

      <Text style={styles.text}>{text}</Text>

       { rightImgSrc && 
        <Image style={styles.img_right} source={rightImgSrc} resizeMode="contain"/>
       }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outlined_btn: {
    height: 40,
    minWidth: 105,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.extraLarge,
    borderWidth: 1,
    borderColor: COLORS.blue,
    paddingStart: 8,
    paddingEnd: 8
  },
  container:{

  },
  img_left:{
     height: 20,
     width: 20, 
  },
  text: {
    color: COLORS.blue,
    fontFamily: FONTS.chivo,
    fontSize: 16,
    marginStart: 8,
    marginEnd: 8
  },
  img_right:{
    height: 20,
    width: 20
  }
});

export default OutlinedButton;