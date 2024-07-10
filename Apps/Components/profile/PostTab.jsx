import { View, Text } from 'react-native'
import React from 'react'
import { Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TagPosts from './TagPosts';
import StoryFlatlist from './StoryFlatlist';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();


export default function PostTab({routeName}) {

  return (
    <Tab.Navigator
     screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor:'gray',
        tabBarStyle: {backgroundColor: "#000", height: 55, border: 1, borderColor: '#000',},
        tabBarIndicatorStyle: {backgroundColor:'#fff', height:1}
        
        }}>
        <Tab.Screen name='UserPost' component={StoryFlatlist}
         options={{
            tabBarLabel: ({color})=>(
            <Text style={{color: color}} className=""></Text>
            ),
            tabBarIcon: ({color})=>(
              <MaterialCommunityIcons name="grid" size={26} color={color} />
            )
        }}
         />
        <Tab.Screen name='TagPost' component={TagPosts}
         options={{
            tabBarLabel: ({color})=>(
            <Text style={{color: color}} className=""></Text>
            ),
            tabBarIcon: ({color})=>(
                <Fontisto name='hashtag' size={22} color={color} />
            )
        }}
         />
    </Tab.Navigator>
  )
}