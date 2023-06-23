// import { createStackNavigator } from "@react-navigation/stack";
// import { useState } from "react";

// import RegistrationScreen from "./Screens/auth/RegistrationScreen";
// import LoginScreen from "./Screens/auth/LoginScreen";
// import Home from "./Screens/Home";


// const MainStack = createStackNavigator();

// function useRoute() {
//   const [isAuth, setIsAuth] = useState(false);

//   if (!isAuth) {
//     return (
//       <>
//         <MainStack.Screen
//           name="RegistrationScreen"
//           options={{ headerShown: false }}
//         >
//           {({ navigation }) => (
//             <RegistrationScreen
//               navigation={navigation}
//               setIsAuth={setIsAuth}
//             />
//           )}
//         </MainStack.Screen>
//         <MainStack.Screen name="LoginScreen" options={{ headerShown: false }}>
//           {({ navigation }) => (
//             <LoginScreen navigation={navigation} setIsAuth={setIsAuth} />
//           )}
//         </MainStack.Screen>
//       </>
//     );
//   }
//   return (    
//     <MainStack.Screen name="HomeScreen" options={{ headerShown: false }}>
//       {({ navigation }) => (
//         <Home navigation={navigation} setIsAuth={setIsAuth} />
//       )}
//     </MainStack.Screen>      
//   );
// }

// export default useRoute
