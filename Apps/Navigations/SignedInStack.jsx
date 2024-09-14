import { Platform } from "react-native";
import BottomTab from "./BottomTab";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import HomeScreen from "../Screens/HomeScreen";
import { UserProvider } from "../../Context/UserContext";
import MediaLibrary from "../Screens/MediaLibrary";
import NewPost from "../Screens/NewPost";
import { StoriesProvider } from "../../Context/StoriesContext";
import NewStory from "../Screens/NewStory";
import UserDetail from "../Screens/UserDetail";
import Notifications from "../Screens/Notifications";
import Story from "../Screens/Story";
import Detail from "../Screens/Detail";
import Share from "../Screens/Share";
import Favorites from "../Screens/Favorites";
import EditProfile from "../Screens/EditProfile";
import EditPost from "../Screens/EditPost";
import UserFollow from "../Screens/UserFollow";
import EditingProfile from "../Components/profile/edit/EditingProfile";
import Chat from "../Screens/Chat";
import NewReel from "../Screens/NewReel";
import Chating from "../Screens/Chating";
import About from "../Screens/About";
import Follow from "../Screens/Follow";
import Likes from "../Screens/Likes";
import Following from "../Screens/Following";
import Settings from "../Screens/Settings";
import InviteFriends from "../Screens/InviteFriends";
import SavedPosts from "../Screens/SavedPosts";
import ChatingAi from "../Screens/ChatingAi";
import ChatingSelf from "../Screens/ChatingSelf";
import DisplayImage from "../Screens/DisplayImage";
import VideoCall from "../Screens/VideoCall";
import RoomScreen from "../Screens/RoomScreen";
import JoinScreen from "../Screens/JoinScreen";
import CallScreen from "../Screens/CallScreen";
import ImageBrowser from "../Screens/ImageBrowser";
import BrowseScreen from "../Screens/BrowserScreen";
import PlayerScreen from "../Screens/PlayerScreen";

const Stack = createStackNavigator();

const SignedInStack = () => {
  return (
    <StoriesProvider>
    <UserProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main Screen" component={BottomTab} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen
                name="MediaLibrary"
                component={MediaLibrary}
                options={{
                  gestureEnabled: false,
                  animation: "slide_from_left",
                }}
              />
              <Stack.Screen
                name="NewStory"
                component={NewStory}
                options={{
                  gestureEnabled: false,
                  animation: "slide_from_left",
                }}
              />
              <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="UserDetail"
                component={UserDetail}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{
                animation: "slide_from_right",
              }}
            />
              <Stack.Screen
              name="Story"
              component={Story}
              options={{
                animation: "slide_from_right",
              }}
            />
              <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
                name="ShareQR"
                component={Share}
                options={{
                  presentation: "transparentModal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="EditingProfile"
                component={EditingProfile}
                options={{
                  animation: "slide_from_right",
                }}EditPost
              />
              <Stack.Screen
                name="EditPost"
                component={EditPost}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="UserFollow"
                component={UserFollow}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="NewReel"
                component={NewReel}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Chating"
                component={Chating}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="About"
                component={About}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Follow"
                component={Follow}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Likes"
                component={Likes}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Following"
                component={Following}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="InviteFriends"
                component={InviteFriends}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="SavedPosts"
                component={SavedPosts}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="ChatingAi"
                component={ChatingAi}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="ChatingSelf"
                component={ChatingSelf}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="DisplayImage"
                component={DisplayImage}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="VideoCall"
                component={VideoCall}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="RoomScreen"
                component={RoomScreen}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="JoinScreen"
                component={JoinScreen}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="CallScreen"
                component={CallScreen}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="ImageBrowser"
                component={ImageBrowser}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="BrowserScreen"
                component={BrowseScreen}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="PlayerScreen"
                component={PlayerScreen}
                options={{
                  animation: "slide_from_right",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
        </UserProvider>
        </StoriesProvider>
  );
};

export default SignedInStack;
