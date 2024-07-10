import { Dimensions } from "react-native";
export const checkImageURL = (url) =>{
    if(!url) return false
    else{
        const pattern = new RegExp(`^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp|svg|tiff|tif|psd)|$`, 'i');
        return pattern.test(url);
    }
}

const COLORS = {
    primary: "#fea116",
    primaryVar: "#ff4500",
    light: "#F3F4F8",
    black: "#000",

    gray: "rgb(156 163 175)",
    grayLight: "rgb(243 244 246)",
  
    white: "#fff",
    lightWhite: "#FAFAFC",
  };
  
  const FONT = {
    regular: "Outfit",
    bold: "Outfit-Bold",
  };
  

  const SIZES = {
      Width: Dimensions.get('window').width,
      Height: Dimensions.get('window').height
  }
  
  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };
  
  export { COLORS, FONT, SIZES, SHADOWS};
