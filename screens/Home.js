import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { assets } from "../constants";
import FavoritesSubscreen from "./sub_screeens/FavoritesSubscreen";
import HomeSubscreen from "./sub_screeens/HomeSubscreen";
import SearchSubscreen from "./sub_screeens/SearchSubscreen";

const HOME_TAG = "Home";
const SEARCH_TAG = "Search";
const FAVORITES_TAG = "Favorites";

function getCurrentSubscreen(tag, style, navigation ){
    switch(tag){
        case HOME_TAG: 
           return <HomeSubscreen navigation={navigation} props_style={style}/> 
        case SEARCH_TAG:
            return <SearchSubscreen navigation={navigation} props_style={style}/>
        case FAVORITES_TAG:
            return <FavoritesSubscreen navigation={navigation} props_style={style}/>       
    }
}

const Home = ({ route, navigation }) => {
    const [activeItemIndex, setCurrentActiveItemIndex] = useState(0);
    const [currentSubScreen, setCurrentSubScreen] = useState(HOME_TAG);

    const itemList = [
        {
          text: HOME_TAG,
          imageSrc: assets.home_img,
          isTinted: true,
          onClickHandler : () => {
             setCurrentActiveItemIndex(0);
             setCurrentSubScreen(HOME_TAG);
          }   
        },
        {
          text: SEARCH_TAG,
          imageSrc: assets.search_img,
          isTinted: false,
          onClickHandler : () => {
             setCurrentActiveItemIndex(1);
             setCurrentSubScreen(SEARCH_TAG);
          } 
        },
        {
          text: FAVORITES_TAG,
          imageSrc: assets.favorites_img,
          isTinted: false,
          onClickHandler : () =>{ 
            setCurrentActiveItemIndex(2);
            setCurrentSubScreen(FAVORITES_TAG);
          }  
        }
    ];

    return (
        <SafeAreaView style={[styles.main_container, {paddingTop:StatusBar.currentHeight}]}>
              { getCurrentSubscreen(currentSubScreen, styles.screen, navigation) }  
              <BottomNavigationBar props_style={styles.bottom_nav_view} itemList={itemList} activeItemIndex={activeItemIndex}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        flexDirection: 'column'
    },
    screen:{
        flex: 1,
        overflow: 'scroll'
    },
    bottom_nav_view:{
       position: "absolute",
       height: 70,
       bottom: 0,
       zIndex: 1
    }
});


export default Home;