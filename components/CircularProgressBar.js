import LottieView from "lottie-react-native";
import { assets } from "../constants";
import { useRef, useEffect } from "react";

const CircularProgressBar = ({ props_style = {alignSelf: "center", width: 100, height: 100} }) => {
  const animation = useRef(null); 
  useEffect(() => { 
     animation.current.play();
   }, []);

   return (
     <LottieView
       autoplay
       loop
       ref={animation}
       style={props_style}
       source={assets.progress} />
   );
}

export default CircularProgressBar;

