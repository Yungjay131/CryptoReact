import AsyncStorage from '@react-native-async-storage/async-storage';

    const BASE_URL = "https://pro-api.coinmarketcap.com";
    const IMAGE_URL = "https://s2.coinmarketcap.com/static/img/coins/128x128/%s.png";
    const API_KEY = "c5edc459-1455-4291-88ff-89fadab8c08a"
   

   const getImageURL = (cryptoCurrencyID) => {
    return `https://s2.coinmarketcap.com/static/img/coins/128x128/${cryptoCurrencyID}.png`;
   }
    
   /**
    * method to map a CryptoCurrency response object to a POJO-like object to be used within the app.
    *
    * @method mapResponseToCryptoCurrency
    * @param {String} response: raw response from api.
    * @param {String} favoriteIDs: array of string IDs of user favorite cryptocurrencies.
    */
   const mapResponseToCryptoCurrency = (response, favoriteIDs) => {
      return response.map((item) =>{
        const isFavorite = favoriteIDs.includes(item.id.toString());

        return mapItem(item, isFavorite);
      });
   }

   const mapResponseToCryptoCurrencyNormal = (response) => {
    return response.map((item) =>{
      const isFavorite = favoriteIDs.includes(item.id);

      return mapItem(item, isFavorite);
    });
 }

 const mapResponseToCryptoCurrencyFavorite = (response, favoriteIDs) => {
  const data = [];
  for(i = 0; i < favoriteIDs.length; i++){
     const item = response[favoriteIDs[i]];
     const _item = mapItem(item, true);

     data.push(_item);
  }

  return data;
 }

 const mapItem = (item, isFavorite) => { 
    return {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      number_of_market_pairs: item.num_market_pairs,
      date_added: item.date_added,
      tags: item.tags,
      max_supply: item.max_supply,
      circulating_supply: item.circulating_supply,
      is_active: (item.is_active === 1) ? true : false,
      rank: item.cmc_rank,
      price: item.quote.NGN.price,
      is_favorite: isFavorite
    };
 }

   const saveFavoriteToDB = async(key, favoriteID) => {
    let status = false;
    let _favorites = [];
    try {
        let favorites = 
        await getFavoritesFromDB(key);

        console.log("favorites gotten in saveFavoriteToDB\n" + favorites);
        console.log("typeof favorites object:\n" + typeof favorites);

        if(favorites != null){
           console.log("__favorites before forEach: " + favorites);

           favorites.forEach((item) => { _favorites.push(item); }); }
          
          _favorites.push(favoriteID.toString());  
        
          const jsonValue = JSON.stringify(_favorites);

          console.log("result of JSON.stringify:" + jsonValue);

          await AsyncStorage.setItem(key, jsonValue)

          status = true;
      } catch (e) {
        console.error('an error occurred saving data to the DB:' + e);
      } finally {
        return status;
      }
   }
   
   const removeFavoriteFromDB = async (key, favoriteID) => {
    let status = false;
    try {
        let favorites = 
        await getFavoritesFromDB(key);

        if(favorites != null){
          const jsonValue = JSON.stringify(favorites);
          await AsyncStorage.setItem(key, jsonValue)
          
          status = true;
        }
      } catch (e) {
        console.error('an error occurred saving data to the DB:' + e);
      } finally {
        return status;
      }
   }

   /** should return a comma seperated list of the IDs */
   const getFavoritesFromDB = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return (jsonValue != null) ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error('an error occurred retrieving data from DB' + e);
      return null;
    }
   }

   /** please always pass a list */ 
  const saveDataToDB = async (key, data) => {
    let status = false;
    try {
        const jsonValue = JSON.stringify(data);

        //console.log("key:");
        //console.log(key);
        //console.log("jsonValue to be saved:");
        //console.log(jsonValue);

        await AsyncStorage.setItem(key, jsonValue)
        status = true;
      } catch (e) {
        console.error('an error occurred saving data to the DB:' + e);
      } finally {
        return status;
      }

      return status;
   }

   const getDataFromDB = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);

       /*  console.log("key:");
        console.log(key);
        console.log("jsonValue being retrieved");
        console.log(jsonValue); */

        return (jsonValue != null) ? JSON.parse(jsonValue) : null;
      } catch(e) {
        console.error('an error occurred retrieving data from DB' + e);
        return null;
      }
   }

   export {
      getImageURL,
      mapResponseToCryptoCurrency,
      mapResponseToCryptoCurrencyNormal,
      mapResponseToCryptoCurrencyFavorite,
      saveDataToDB,
      getDataFromDB,
      saveFavoriteToDB,
      removeFavoriteFromDB,
      getFavoritesFromDB,
   };
