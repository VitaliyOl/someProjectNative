import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import AppProvider from './Components/AppProvider';
import Main from './Components/Main';


export default function App() {
  const [isAuth, setIsAuth] = useState(false);


  return (
    <>
    <AppProvider>  
    {/* <PersistGate  persistor={persistor}> */}
      <StatusBar style="auto" />
      <Main isAuth={isAuth} setIsAuth={setIsAuth} />     
      {/* </PersistGate> */}     
      </AppProvider>
    </>
  );
}
