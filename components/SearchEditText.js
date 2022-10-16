import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { COLORS, FONTS,assets } from "../constants";

const SearchEditText = ({ onClickHandler, props_style, onFocusListener }) =>{ 
    const [searchState, setSearchState] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles({isFocused: isFocused}).main_container, props_style]}>
            <TextInput 
               style={styles().text_input }
               placeholder={"Cryptocurrency name"}
               borderColor={COLORS.transparent}
               onFocus={() => {
                setIsFocused(true)
                //onFocusListener();
               }}
               onBlur={() => setIsFocused(false) }/>

            <TouchableOpacity
                style={styles({ searchState: searchState }).touchable_opacity}
                onPress={() => { 
                setSearchState(true)
                setTimeout(() => { setSearchState(false) }, 500);
                onClickHandler();
               }}>
                <Image 
                  style={styles().image }
                  resizeMode={"contain"}
                  source={assets.search_img} />
            </TouchableOpacity>
        </View>
    )
}

const styles = ({ isFocused, searchState } = { isFocused: false, searchState: false }) => StyleSheet.create({
   main_container :{
    flexDirection :'row',
    borderWidth : isFocused ? 2 : 1,
    borderColor : isFocused ? COLORS.blue : COLORS.black
   },
   text_input:{
      width: "100%",
      height: "100%",
      paddingStart: 8,
      paddingEnd: 40,
      fontSize: 16,
      fontFamily: FONTS.lato
   },
   touchable_opacity:{
       position: 'absolute',
       width: 32,
       backgroundColor: searchState ? COLORS.grey : COLORS.transparent,
       borderRadius: 10,
       padding: 4,
       end: 6,
       top: 6,
       bottom: 6,
   },
   image:{
     height: 28,
     width:  28,
     zIndex:1
   }
});

export default SearchEditText;