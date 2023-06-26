import { useState } from 'react';
import { View } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';

function MapScreen({navigation, route}) { 
  const { location } = route?.params ?? {};
  const [userLocation, setUserLocation] = useState(location);
  const isFocuseded = useIsFocused();  


  useEffect(() => {
    if (isFocuseded) {
      navigation?.getParent('home')?.setOptions({
        tabBarStyle: { display: 'none' },
        headerShown: false,       
      });
    }
  }, []);
  

  return ( 

  <View style={{flex: 1}}>
  <MapView
    style={{flex: 1}}
    initialRegion={{
      latitude: userLocation?.latitude || 0,
      longitude: userLocation?.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    showsMyLocationButton={true}
  >
    {userLocation &&
      <Marker coordinate={userLocation} />
    }
  </MapView>
</View>
  )
}

export default MapScreen
