import { StyleSheet, View } from "react-native";
import { COLORS, SHADOWS } from "../constants";
import BottomNavigationItem from "./BottomNavigationItem";


const BottomNavigationBar = ({ itemList, activeItemIndex, props_style }) =>{
    return (
       <View style={[styles.main_container, props_style]}>
          {
            itemList.map((item, index) =>{
               activeItemIndex === index ? item.isTinted = true : item.isTinted = false;
              
               return <BottomNavigationItem 
                         text = {item.text} 
                         imageSrc = {item.imageSrc}
                         isTinted={item.isTinted}
                         onClickHandler={item.onClickHandler}
                         props_style={styles.item}
                         />
            })
          }
       </View>
    )
}

const styles = StyleSheet.create({
   main_container: {
      height: 66,
      width: "100%",
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: COLORS.light_grey,
      ...SHADOWS.dark
   },
   item:{
      height: 60,
      width: 60
   }
});


export default BottomNavigationBar;