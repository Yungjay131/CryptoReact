import { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import OnBoardingTab from "../components/OnboardingTab";
import OutlinedButton from "../components/OutlinedButton";
import ProgressBar from "../components/ProgressBar";
import { assets, COLORS, FONTS } from "../constants";

const text1 =
  "improve your business with accurate data, and latest cryptocurrency information";
const text2 = "get in-depth analysis and forcasts for your favorite cryptocurrencies";
const text3 = 
    "Drive up your business revenue by saving costs " +
     "otherwise spent on forecasting sites - by using our services";
const textArray = [text1, text2, text3];

const img1 = assets.onboarding_img_1;
const img2 = assets.onboarding_img_2;
const img3 = assets.onboarding_img_3;
const imageArray = [img1, img2, img3];

const increment = 0.1;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function sleep2(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));

  // console.log("Hello");
  // sleep(2000).then(() => { console.log("World!"); }); 
}

const OnBoarding = ({ route, navigation }) => {
  const [progressBar1Value, setProgressBar1Value] = useState(0);
  const [progressBar2Value, setProgressBar2Value] = useState(0);
  const [progressBar3Value, setProgressBar3Value] = useState(0);
  const [currentOnboarding, setCurrentOnboarding] = useState(0);
  const [currentImage, setCurrentImage] = useState(img1);
  const [currentText, setCurrentText] = useState(text1);

  const map = new Map([
    [0, {value:progressBar1Value, setter:setProgressBar1Value}],
    [1, {value:progressBar2Value, setter:setProgressBar2Value}],
    [2, {value:progressBar3Value, setter:setProgressBar3Value}]
  ]);

  let setIntervalFunc;

  const nextFunc = () => { 
    setCurrentImage(imageArray[currentOnboarding + 1]);
    setCurrentText(textArray[currentOnboarding + 1]); 
    setCurrentOnboarding(currentOnboarding + 1); 
  } 

  const previousFunc = () => {
    setCurrentImage(imageArray[currentOnboarding - 1]);
    setCurrentText(textArray[currentOnboarding - 1]); 
    setCurrentOnboarding(currentOnboarding - 1); 
  }

  const navigateToActivityFunc = () => { navigation.navigate('Home'); }
  
  useEffect(() => {
     setIntervalFunc = setInterval(function(){
       let { value, setter } = map.get(currentOnboarding);
       setter(value + increment);
       
       if(value === 100 && currentOnboarding === 2)
         clearInterval(setIntervalFunc);

       if(value === 100 && currentOnboarding < 2)
         setCurrentOnboarding(currentOnboarding + 1);
     }, 200);

  }, [currentOnboarding]);

  
  return (
    <SafeAreaView style={[styles.main_container, {paddingTop:StatusBar.currentHeight + 10}]}>
      <View style={styles.progress_container}>
        <ProgressBar progress={progressBar1Value} props_style={styles.progress_bar}/>
        <View style={styles.view_spacing} />
        <ProgressBar progress={progressBar2Value} props_style={styles.progress_bar}/>
        <View style={styles.view_spacing} />
        <ProgressBar progress={progressBar3Value} props_style={styles.progress_bar} />
      </View>

      <Image
        style={styles.img}
        source={currentImage}
        resizeMode="cover"
      />

      <Text style={styles.text}>{currentText}</Text>

      <View style={styles.tabs_container}>
         <OnBoardingTab shouldBeTinted={currentOnboarding === 0}/>  
         <OnBoardingTab shouldBeTinted={currentOnboarding === 1}/>  
         <OnBoardingTab shouldBeTinted={currentOnboarding === 2}/>  
      </View> 

      <View style={styles.btn_container}>
        {
            currentOnboarding > 0 &&
            <OutlinedButton
             text={"Previous"}
             leftImgSrc={assets.left_arrow_img}
             onClickHandler={previousFunc} 
             props_style={styles.btn_previous}/>
       }

       {
            currentOnboarding < 2 &&
            <OutlinedButton
              text={"Next"}
              rightImgSrc={assets.right_arrow_img}
              onClickHandler={nextFunc}
              props_style={styles.btn_next} /> 
       }
        
       {
           currentOnboarding === 2 &&
            <OutlinedButton
              text={"Start"} 
              rightImgSrc={assets.start_img}
              onClickHandler={navigateToActivityFunc}
              props_style={styles.btn_next}/>
        }
      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    backgroundColor: "#fff",
  },
  progress_container: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    paddingStart: 16,
    paddingEnd: 16,
    margingTop:48
  },
  progress_bar: {
    flex: 0.3,
  },
  view_spacing: {
    flex: 0.05,
  },
  img: {
    flex: 0.5,
    width: "100%",
  },
  text: {
    flex: 0.2,
    fontSize: 20,
    color: COLORS.blue,
    textAlign: "center",
    fontFamily: FONTS.lato,
    marginStart: 16,
    marginEnd: 16,
  },
  tabs_container:{
      flex: 0.05,
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
  },
  btn_container: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingStart: 16,
    paddingEnd: 16,
  },
  btn_previous: {
     position: "absolute",
      left: 16
  },
  btn_next: { 
     position: "absolute",
     right: 16
  },
});

export default OnBoarding;
