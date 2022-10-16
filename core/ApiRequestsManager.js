
const BASE_URL = "https://pro-api.coinmarketcap.com";
const API_KEY = "c5edc459-1455-4291-88ff-89fadab8c08a";

const getAllCryptocurrencies = (successFunc, failureFunc, errorFunc) => {
        fetch(
            `${BASE_URL}/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=NGN`,
             {
              method: "GET",
              headers: {
                "X-CMC_PRO_API_KEY" : API_KEY,
              }
            })
            .then(response => response.json() )
            .then(response =>{
               if(response.status.error_message === null)
                 successFunc(response.data);
               else
                 failureFunc();
            })
            .catch(error => {
               errorFunc(error);
            });
    };

const getSpecificCryptocurrencies = ( ids, successFunc, failureFunc, errorFunc ) =>{
          fetch(
            `${BASE_URL}/v1/cryptocurrency/quotes/latest?id=${ids}&convert=NGN`,
            {
              method: 'GET',
              headers:{
                "X-CMC_PRO_API_KEY" : API_KEY
              }
            })
            .then(response => response.json())
            .then(response => {
              if(response.status.error_message === null)
                successFunc(response.data);
              else
                failureFunc();
            })
            .catch(error => {
               errorFunc(error);
            });
    };

  
export { 
   getAllCryptocurrencies,
   getSpecificCryptocurrencies,
};