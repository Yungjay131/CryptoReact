import { View, StyleSheet, FlatList } from "react-native";
import { COLORS } from "../../constants";
import { useState } from 'react';
import { Circle } from 'react-native-progress'
import SearchEditText from "../../components/SearchEditText";
import Card from '../../components/Card';
import CircularProgressBar from "../../components/CircularProgressBar";
import ErrorView from "../../components/ErrorView";
import * as ApiRequestsManager from "../../core/ApiRequestsManager";
import * as DataManager from "../../core/DataManager";
import { STATE_LOADING, STATE_SUCCESS, STATE_ERROR, STATE_NORMAL } from "../../constants/Constants";

async function getCurrentComponent({ state, payload }){
   switch(state){
      case STATE_LOADING:
         return <CircularProgressBar props_style={{alignSelf: "center", width: 100, height: 100 }}/>;
      case STATE_ERROR: 
         return <ErrorView
                   props_style={styles.error_view}
                   props_text={payload.message}
                   imageSrc={payload.imageSrc} /> 

      case STATE_SUCCESS:  
        let favorites = await DataManager.getFavorites();
        favorites = (favorites != null) ? favorites : [];
        const data = DataManager.mapResponseToCryptoCurrency(payload.data, favorites);

          return <FlatList 
          style={styles.flatlist}
          data={data}
          renderItem={( { item } ) => (
            <Card cryptoCurrency={item} onClickHandler={flatListItemFunc} props_style={styles.card}/>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}/>
       
      case STATE_NORMAL:
         return <></>;
   }
}

const SearchSubscreen = ({ navigation, props_style }) =>{ 
    const [data, setData] = useState({ state: STATE_NORMAL, payload:{} });
    
    flatListItemFunc = (id) => { navigation.navigate('Details', {id: id} ); }
    
    const onSearchFunc = (query) => {
        ApiRequestsManager.getSpecificCryptocurrencies(
         query,
         (data) => { setData({ state: STATE_SUCCESS, payload: data })},
         () => { 
            setData({
                state: STATE_ERROR,
                payload: {
                  message: "CryptoCurrency not found",
                  imageSrc: assets.error
                }
         })},
         (error) => {
            console.log(error);
            setData({ 
             state: STATE_ERROR,
             payload : {
                 message: error,
                 imageSrc: assets.not_found_2
                }
            });
         });
    }

    return(
     <View style={[ styles.main_container, props_style ]}>
        <SearchEditText 
         props_style={styles.search_edittext}
         onClickHandler={onSearchFunc}
         onFocusListener={ setData({ state: STATE_LOADING, payload: {} }) }/>
        <View style={styles.view}>
            { getCurrentComponent(data) }
        </View>
    </View>
    ); 
}

const styles = StyleSheet.create({
   main_container:{
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow:"scroll",
    paddingStart: 16,
    paddingEnd: 16
   },
   search_edittext:{
      height: 50,
      borderRadius: 4,
      marginTop: 100
   },
   view:{
     width:"100%",
     height: "100%",
     marginTop: 16,
   },
   progress:{
      width:60,
      height:60,
      alignSelf: "center",
   }
});

export default SearchSubscreen;