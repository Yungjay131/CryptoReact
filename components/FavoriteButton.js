import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { assets, COLORS } from ".../../constants";
import { useState } from 'react';

const FavoriteButton = ({ isToggled, onClickHandler, props_style }) => {
   const [isFavorite, setIsFavorite] = useState(isToggled);
   
   return <TouchableHighlight
     style={[styles.main_container,props_style ]}
     onPress={() => {
         setIsFavorite(!isFavorite)
         onClickHandler() 
      } }>
          <View>
            <Image 
               style={[styles.image]}
               source={isFavorite ? assets.favorite_filled_img : assets.favorite_outlined_img }
               resizeMode="contain"/>
          </View>
   </TouchableHighlight>
};

const styles = StyleSheet.create({
    main_container: {
       width: 24,
       height: 24,
    },
    image:{
      width:"100%",
      height: "100%",
      tintColor: COLORS.pink
    }
});

export default FavoriteButton;