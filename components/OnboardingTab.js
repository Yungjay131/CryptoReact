import { View } from "react-native";
import { COLORS } from "../constants";


const OnBoardingTab = ({ shouldBeTinted = false, props_style }) => {
    return (
        <View style={[{
            height: 10,
            width: shouldBeTinted ? 16 : 10,
            marginStart:2,
            marginEnd:2,
            borderRadius: 8,
            backgroundColor: shouldBeTinted ? COLORS.blue : COLORS.light_blue
        }, props_style]}/>
    );
};


export default OnBoardingTab;