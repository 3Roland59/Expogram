import { StyleSheet, TouchableOpacity, Platform, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import ReelScreen from "../Screens/ReelScreen";
import Blank from "../Screens/Blank";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useUserContext } from "../../Context/UserContext";
import Profile from "../Screens/Profile";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    borderTopWidth: 0.3,
    borderTopColor: "#444",
    height: 60,
    backgroundColor: "#000",
    paddingBottom: 10,
  },
};

const BottomTabs = ({ navigation }) => {
  const { currentUser } = useUserContext();
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <MaterialIcons name="home-filled" size={30} color={"#fff"} />
            ) : (
              <Octicons name="home" size={24} color={"#fff"} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={27}
                color={"#fff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Blank"
        component={Blank}
        options={{
          tabBarIcon: ({ focused }) => {
            return <FontAwesome name="plus-square-o" size={28} color={"#fff"} />;
          },
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate("MediaLibrary", {
                  initialSelectedType: "New post",
                });
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? "play-box" : "play-box-outline"}
                size={27}
                color={"#fff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
                currentUser?.profile_picture?<Image
                source={{uri: currentUser?.profile_picture}}
                className="w-[28px] h-[28px] rounded-full " style={{borderWidth: focused? 2:0, borderColor: '#fff'}}
              />:<Image source={require('../../assets/images/profile_thumbnail.png')} className="w-[28px] h-[28px] rounded-full " style={{borderWidth: focused? 2:0, borderColor: '#fff'}}/>
            )
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

