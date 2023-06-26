import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import CreatePostsScreen from './CreatePostsScreen'
import PostsScreen from './PostsScreen'
import ProfileScreen from './ProfileScreen'
import {  signOutDB} from '../redux/auth/AuthOperation';



const Tab = createBottomTabNavigator();

function Home({ navigation, dispatch}) {
  
  const handleSignOut = () => {   
    signOutDB()(dispatch);
 };

 
  return (
    <Tab.Navigator 
     id="home"
    screenOptions={{
 headerTitleAlign: 'center',

headerStyle: {
  borderBottomWidth: 1,
  borderColor: '#E5E5E5',
},

tabBarShowLabel: false,
tabBarActiveBackgroundColor: '#FF6C00',
tabBarActiveTintColor: '#ffffff',
tabBarInactiveTintColor: '#212121',

tabBarStyle: {
  height: 83,
  paddingTop: 10,
  paddingBottom: 34,
  paddingHorizontal: 80,
  borderTopWidth: 1,
  borderColor: '#E5E5E5',
},

tabBarItemStyle: {
  borderRadius: 20,
},
    }}>
    <Tab.Screen
        name='PostsScreen'
        component={PostsScreen}
        options={{
            
            headerTitle: () => (
                <Text style={{
                    marginBottom: 10,
                    fontWeight: 500,
                    fontSize: 17,
                    lineHeight: 22,    
                    fontFamily: 'Roboto-Medium',
    
                }}>Публікації</Text>
            ),
            headerLeft: () => (
           <TouchableOpacity
             style={{ marginLeft: 16, marginBottom: 10 }}
             onPress={() => navigation.goBack()}
           >
             <Feather name="arrow-left" size={24} color="#212121" />
           </TouchableOpacity>
         ),

            headerRight: ()=> (
                <TouchableOpacity style={{ marginRight: 16, marginBottom: 10 }} 
                onPress={handleSignOut}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>                
            ),
            tabBarIcon: ({color})=> (
                <Feather name="grid" size={24} color={color} />
            )
            
        }}
    />
    <Tab.Screen
        name='CreatePostsScreen'
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          headerShown: true,               
           headerTitle: () => (
           <Text
             style={{
               marginBottom: 10,
                   fontWeight: 500,
                   fontSize: 17,
                   lineHeight: 22,    
                   fontFamily: 'Roboto-Medium',
             }}
           >
             Створити публікацію
           </Text>
         ),

         headerLeft: () => (
           <TouchableOpacity
             style={{ marginLeft: 16, marginBottom: 10 }}
             onPress={() => navigation.goBack()}
           >
             <Feather name="arrow-left" size={24} color="#212121" />
           </TouchableOpacity>
         ),

         tabBarIcon: ({ color }) => (
           <Feather name="plus" size={24} color={color} />
         ),        
       }}
    />
    <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{                
            headerShown: false,
            tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
    />
      
    </Tab.Navigator>
  )
}

export default Home

