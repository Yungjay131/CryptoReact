import * as Network from 'expo-network';

export default class FunctionUtils{
    static formatToMoney(text) {
       return `₦${text.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }

    static mapIDsToString(ids){
       let _ids = '';
       ids.forEach((id) =>{ _ids = (_ids != '') ? `${_ids},${id}` : `${id}`; });
       return _ids;
    }

// {
//   type: NetworkStateType.CELLULAR,
//   isConnected: true,
//   isInternetReachable: true,
// }
    static getNetworkStatus(){
      return Network.getNetworkStateAsync();
    }
}