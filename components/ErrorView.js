import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { FONTS, COLORS } from "../constants";
import { useRef, useEffect } from "react";

const ErrorView = ({ imageSrc, props_text, props_style }) => {
  const animation = useRef(null);
  useEffect(() => {
   animation.current.play();
  }, []);

  return (
    <View style={[styles.main_container, props_style]} >
      <LottieView
        autoplay
        loop
        ref={animation}
        style={{ width: 500,  height: 400 }}
        source={imageSrc}
        />
      <View style={styles.text_container}>
        <Text style={styles.text}>{props_text}</Text>
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flexDirection: "column",
    backgroundColor: COLORS.white
  },
  image: {
    height: 300,
    width: "100%",
    alignSelf: "center",
    top: 50,
  },
  text_container:{
     marginStart: 16,
     marginEnd: 16,
     justifyContent: "center",
     alignItems: "center",
     alignSelf: "center",
     top: 12
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: FONTS.chivo,
    color: COLORS.blue,
  },
});

export default ErrorView;
