import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/Home";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  authStateChangeUser } from '../redux/auth/AuthOperation';
import ProfileScreen from '../Screens/ProfileScreen';



const MainStack = createStackNavigator();

export default function Main () {  
 

  const dispatch = useDispatch()

    const {stateChange} = useSelector((state)=> state.auth)    

    useEffect(() => {
      dispatch(authStateChangeUser())      
    }, []);   
   
    
  const isLogin = () => {
    if (!stateChange) {
      return (
        <>
          <MainStack.Screen
            name="RegistrationScreen"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <RegistrationScreen
                navigation={navigation}                
              />
            )}
          </MainStack.Screen>
          <MainStack.Screen name="LoginScreen" options={{ headerShown: false }}>
            {({ navigation }) => (
              <LoginScreen navigation={navigation} />
            )}
          </MainStack.Screen>
        </>
      );
    }
    return (    
     <>
       <MainStack.Screen name="HomeScreen" options={{ headerShown: false }}>
        {({ navigation }) => (
          <Home navigation={navigation} dispatch={dispatch}/>
        )}
      </MainStack.Screen>       
     </> 
    );
  };
   
     
  return (
    <NavigationContainer>
        <MainStack.Navigator loading={null} initialRouteName="LoginScreen">
          {isLogin()}
        </MainStack.Navigator>
      </NavigationContainer>
  )
}

