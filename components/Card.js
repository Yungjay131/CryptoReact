import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FavoriteButton from "../components/FavoriteButton";
import { assets, COLORS, SHADOWS, FONTS  } from "../constants";
import * as DataManager from "../core/DataManager";
import FunctionUtils from "../core/FunctionUtils";
import { useState , useEffect} from "react";

const Card = ({ cryptoCurrency, onClickHandler, favoriteBtnOnClickHandler, props_style }) =>{
   return (
       <TouchableOpacity
          style={[styles.main_container, props_style]}
          activeOpacity={0.8}
          onPress={ () => onClickHandler(cryptoCurrency.id) }>
          <Image 
             style={styles.img_container}
             defaultSource={assets.placeholder_image}
             source={{uri:DataManager.getImageURL(cryptoCurrency.id)}}
             resizeMode="contain"/>

          <View style={styles.text_container}>
            <Text style={styles.name_text}>{cryptoCurrency.name}</Text>
            <Text style={styles.price_text}>{`Price: ${FunctionUtils.formatToMoney(cryptoCurrency.price)}`}</Text>
          </View> 
         
          <View style={styles.favorite_btn_container}>
            <Text style={styles.rank_text}>{`rank:${cryptoCurrency.rank}`}</Text>
            <FavoriteButton
                props_style={styles.favorite_btn}
                isToggled={cryptoCurrency.is_favorite} 
                onClickHandler={favoriteBtnOnClickHandler}/>
          </View>
          
       </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
    main_container:{
        flexDirection: "row",
        paddingStart: 16,
        paddingEnd: 16,
        ...SHADOWS.dark,
        borderRadius: 16,
        backgroundColor: COLORS.transparent
    },
    img_container:{
        flex: 0.2,
        alignSelf:'center',
        width:128,
        height:128
    },
    text_container:{
        flex: 0.6,
        flexDirection: "column",
        marginStart: 16,
        paddingTop: 4,
        paddingBottom: 4,
    },
    favorite_btn_container:{
        flex: 0.2,
        flexDirection: "column",
        alignItems: "space-between",
        paddingTop: 4,
        paddingBottom: 4
    },
    name_text: {
        width: "100%",
        position:"absolute",
        top: 16,
        fontSize: 18,
        fontFamily: FONTS.lato
    },
    price_text: {
        width: "100%",
        position: "absolute",
        bottom: 16,
        fontSize: 18,
        fontFamily: FONTS.lato
    },
    rank_text: {
        width: "100%",
        position:"absolute",
        top: 16,
        fontSize: 18,
        fontFamily: FONTS.lato
    },
    favorite_btn: {
        width: "100%",
        position:"absolute",
        bottom: 16
    }
});

export default Card;