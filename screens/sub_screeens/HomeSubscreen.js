import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { ProgressBar } from "react-native-ui-lib"
import ErrorView from "../../components/ErrorView";
import Card from "../../components/Card";
import CircularProgressBar from "../../components/CircularProgressBar";
import { assets, COLORS, Constants } from "../../constants";
import * as DataManager from "../../core/DataManager";
import FunctionUtils from "../../core/FunctionUtils";

const BASE_URL = "https://pro-api.coinmarketcap.com";
const API_KEY = "c5edc459-1455-4291-88ff-89fadab8c08a";

const STATE_LOADING = 1;
const STATE_ERROR = 2;
const STATE_SUCCESS = 3;

let flatListItemFunc;
let favoriteBtnOnClickHandler;

async function getDataFromDataSource(){
   let favorites = await DataManager.getFavoritesFromDB(Constants.FAVORITES_KEY);
 
   if(favorites == null) 
     favorites = [];

   const { isConnected } = 
   await FunctionUtils.getNetworkStatus();

   if(isConnected)
      return await getDataFromNetwork(favorites);
    else
      return await getDataFromDB(favorites);   
}

async function getDataFromNetwork(favoriteIDs){
  return await fetch(
    `${BASE_URL}/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=NGN`,
     {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY" : API_KEY,
      }
    })
    .then(response => response.json())
    .then(response => {
      DataManager.saveDataToDB(Constants.DATA_KEY, response.data)
      return response.data;
    })
    .then(response => {
      return DataManager.mapResponseToCryptoCurrency(response, favoriteIDs);
    })
    .catch((error) => {
      console.error(error);
      return null
    })

}

async function getDataFromDB(favoriteIDs){
    return await DataManager.getDataFromDB(Constants.DATA_KEY)
}

function getCurrentComponent({ state, payload }) {
  switch (state) {
    case STATE_LOADING:
      return <CircularProgressBar props_style={styles.progress} />

    case STATE_ERROR:
      return (
        <ErrorView
          props_style={styles.error_view}
          props_text={payload.message}
          imageSrc={payload.imageSrc}
        />
      );
  
    case STATE_SUCCESS:
      return <FlatList
         style={styles.flatlist}
         data={payload}
         renderItem={( { item } ) => (
           <Card 
             cryptoCurrency={item}
             onClickHandler={flatListItemFunc}
             favoriteBtnOnClickHandler={() => {
                if(item.is_favorite) 
                  favoriteBtnOnClickHandler(item.id, Constants.REMOVE_FROM_FAVORITES); 
                else
                  favoriteBtnOnClickHandler(item.id, Constants.SAVE_TO_FAVORITES)  
             }}
             props_style={styles.card}/>
         )}
         keyExtractor={(item) => item.id}
         showsVerticalScrollIndicator={true}
       />;
  }
}

  const HomeSubscreen = ({ navigation, props_style }) => {
  const [data, setData] = useState({ state: STATE_LOADING, payload: {}  });

  flatListItemFunc = (id) => { navigation.navigate('Details', {id: id} ); }
  favoriteBtnOnClickHandler = (id, operationType) => {
      if(operationType == Constants.SAVE_TO_FAVORITES)
        DataManager.saveFavoriteToDB(Constants.FAVORITES_KEY, id);
      else
        DataManager.removeFavoriteFromDB(Constants.FAVORITES_KEY,id);  
   }
   
  useEffect(() => {
      getDataFromDataSource()
      .then(data =>{
        if(data != null || data != undefined){
          setData({ state: STATE_SUCCESS, payload : data });
        }else{
          setData({ 
            state: STATE_ERROR,
            payload : {
            message: "request was not successful",
            imageSrc: assets.error
           }
           });
        }
      });
     
  }, []);

  return (
    <View style={[styles.main_container, props_style]}>
       { getCurrentComponent(data) }
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grey
  },
  progress: {
    alignSelf: "center",
    width: 100,
    height: 100
  },
  flatlist: {
    flex: 1,
    width: "100%",
  
    marginStart: 8,
    marginEnd: 8,
    marginBottom: 70,
  },
  error_view: {
    flex: 1
  },
  card:{ 
     height: 120 ,
     backgroundColor: COLORS.white,
     marginTop: 8,
     marginStart: 8,
     marginEnd: 8
    }
});

export default HomeSubscreen;
