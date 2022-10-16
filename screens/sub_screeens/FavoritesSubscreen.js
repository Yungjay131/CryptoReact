import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { Circle } from "react-native-progress";
import { ProgressBar } from "react-native-ui-lib";
import ErrorView from "../../components/ErrorView";
import Card from "../../components/Card";
import { assets, COLORS, Constants } from "../../constants";
import * as DataManager from "../../core/DataManager";
import * as ApiRequestsManager from "../../core/ApiRequestsManager";
import FunctionUtils from "../../core/FunctionUtils";
import CircularProgressBar from "../../components/CircularProgressBar";
import { STATE_LOADING, STATE_SUCCESS, STATE_ERROR } from "../../constants/Constants";

let flatListItemFunc;
let favoriteBtnOnClickHandler;
let getDataFromApi;

let favorites;
  
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
      const data = DataManager.mapResponseToCryptoCurrencyFavorite(payload, favorites);
      
      return <FlatList
         style={styles.flatlist}
         data={data}
         renderItem={( { item } ) => (
           <Card 
            cryptoCurrency={item}
            onClickHandler={flatListItemFunc}
            favoriteBtnOnClickHandler={() => {
                favoriteBtnOnClickHandler( (item.is_favorite) ? Constants.REMOVE_FROM_FAVORITES : Constants.SAVE_TO_FAVORITES, item.id );   
           }}
            props_style={styles.card}/>
         )}
         keyExtractor={(item) => item.id}
         showsVerticalScrollIndicator={true}
       />;      
  }
}

const FavoritesSubscreen = ({ navigation, props_style }) => {
  const [data, setData] = useState({ state: STATE_LOADING, payload: {}  });

  flatListItemFunc = (id) => { navigation.navigate('Details', {id: id} ); }
  favoriteBtnOnClickHandler = (operationType, id) => {
    if(operationType == Constants.SAVE_TO_FAVORITES)
      DataManager.saveFavoriteToDB(Constants.FAVORITES_KEY, id);
    else
      DataManager.removeFavoriteFromDB(Constants.FAVORITES_KEY, id);  
  };

  getDataFromApi = (ids) => {
    ApiRequestsManager.getSpecificCryptocurrencies(
      ids,
      (data) => { setData({ state: STATE_SUCCESS, payload : data }) },
      () => { setData({ 
        state: STATE_ERROR,
        payload : {
             message: "request was not successful",
             imageSrc: assets.error
           }
       });
      },
      (error) => {
        console.log(error);
        setData({ 
         state: STATE_ERROR,
         payload : {
         message: error,
         imageSrc: assets.not_found_2
            }
        });
      }
   );
  }

  useEffect(() => {
     DataManager.getFavoritesFromDB(Constants.FAVORITES_KEY)
     .then((_favorites) => {
      console.log("favorites from DB:");
      console.log(_favorites);
        if(_favorites == null){
          setData({ 
            state: STATE_ERROR,
            payload : {
            message: "you currently have no Favorites. Check the 'heart' icon on any item to add that item to your Favorites!",
            imageSrc: assets.error
             }
           });
          return;
        }

         console.log("favorites from DB once again:" + _favorites);
         console.log("typeof favorites from DB:");
         console.log(typeof _favorites)

         favorites = _favorites;
         let __favorites = FunctionUtils.mapIDsToString(_favorites); 
         getDataFromApi(__favorites);
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
    height: "100%",
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

export default FavoritesSubscreen;
