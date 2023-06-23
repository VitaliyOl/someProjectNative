import { useState } from 'react';
import { View } from 'react-native'
import MapView, { Marker } from "react-native-maps";

function MapScreen({route}) { 
  const { location } = route?.params ?? {};
  const [userLocation, setUserLocation] = useState(location);
  

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
