import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants";

const BottomNavigationItem = ({ text, imageSrc, isTinted, onClickHandler, props_style }) =>{ 
   return (
      <TouchableOpacity
        style={[
          styles({isTinted: isTinted}).main_container,
          props_style
        ]}
        onPress={onClickHandler} >

        <View style={styles({ isTinted: isTinted }).img_container}>

        <Image
          style={styles({ isTinted: isTinted }).img}
          source={imageSrc}
          resizeMode="contain" />

        </View>  
        
        <Text style={styles({ isTinted: isTinted }).text}>{text}</Text> 

      </TouchableOpacity>
    );
};

const styles = ({ isTinted }) => StyleSheet.create({
    main_container:{
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center"
    },
    img_container:{
      flex: 0.6,
      width: "100%",
      height: "100%",
      flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 16,
       backgroundColor: isTinted ? COLORS.sky_blue : COLORS.transparent
    },
    img: {
       width: 24,
       height: 24,
       alignSelf:"center",
    },
    text: {
       flex:  0.4,
       paddingTop: 8,
       textAlign: "center",
       fontFamily: FONTS.chivo,
       fontSize: isTinted ? 12 : 12
    },
    spacing:{
      flex: 0.2
    }
});

export default BottomNavigationItem;