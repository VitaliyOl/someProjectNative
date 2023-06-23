import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function AppProvider({ children }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}