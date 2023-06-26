import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';

import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { Image ,Text, View, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';



function CreatePostsScreen({navigation}) {
  const [location, setLocation] = useState(null);
  const [camera, setCamera] = useState(null)
  const [comment, setComment] = useState('')
  const [textLocation,setTextLocation] = useState('')
  const [photo, setPhoto] = useState(null)
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); 


  const {userId, login} = useSelector((state)=>state.auth)



useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    await MediaLibrary.requestPermissionsAsync();

    setHasPermission(status === "granted");
  })();
}, []);

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }    
  })();
}, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function pickImage() {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need permissions to make this work!');
      return;
    }  

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setPreviewVisible(true);
    } else {
      alert('You did not select any image.');
    }
    
  }
  
  const takePhoto = async () => {     
    if (camera){     
        const { uri } = await camera.takePictureAsync();
       await MediaLibrary.createAssetAsync(uri);
       setPhoto(uri)
       setPreviewVisible(true)
       let location = await Location.getCurrentPositionAsync({});
       const coords = {
        latitude: location.coords.latitude,
       longitude: location.coords.longitude,
      };
      
      setLocation(coords);         
    
    let address = await Location.reverseGeocodeAsync(coords);
    let locationName = `${address[0].name}, ${address[0].city}, ${address[0].region}`;
    setTextLocation(locationName);

      }    
  }

  const handleFocus = (input) => setIsFocused(input);
  const handleBlur = () => setIsFocused(false);

  

  const retakePicture = async () => {    
    setPreviewVisible(false);
    setPhoto(null);
    setComment('')
    setTextLocation('')
  };
  

  const sendPhoto = () => {
    writeDataToFirestore()
    navigation.navigate('DefaultScreen', {isDataLoaded})
    setComment('')
    setTextLocation('')
  }



  const writeDataToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        photo: photo,
        location: location,
        comment: comment,
        textLocation: textLocation,
        login: login,
        userId: userId,
      });
      console.log('Document written with ID: ', docRef.id);
      setIsDataLoaded(true);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

const deleteForm = () => {
  setPhoto(null);
  setComment('')
  setTextLocation('')
  setPreviewVisible(false);
}
 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
   <Camera style={styles.camera} ref={setCamera} ratio={'4:3'}>  
   {photo && <Image source={{ uri: photo }} style={styles.previewImage} />
   
   }
   <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
   <MaterialIcons  name="camera-alt" size={24} color="gray" />
   </TouchableOpacity>     
   </Camera>

   {!previewVisible ? (
    <TouchableOpacity onPress={pickImage} >
   <Text style={styles.titleUpload}>Завантажте фото</Text>
   </TouchableOpacity>
   ) : (
    <TouchableOpacity  onPress={retakePicture}>
   <Text style={styles.titleUpload}>Редагувати</Text>
   </TouchableOpacity>
   )}
  
   <View style={styles.form}>
    <TextInput style={[styles.input, isFocused === 'comment' && styles.inputFocus]} 
    placeholder={'Назва...'} 
    onChangeText={setComment} 
    value={comment}
    onFocus={()=>{handleFocus('comment')}}
    onBlur={handleBlur}  
    ></TextInput>
    <View>
    
    <TextInput style={[styles.inputLocation, isFocused === 'textLocation' && styles.inputFocus]}  
    placeholder={'Місцевість...'} 
    onChangeText={setTextLocation} 
    value={textLocation}
    onFocus={()=>{handleFocus('textLocation')}}
    onBlur={handleBlur}  
    ></TextInput>
    <Feather style={styles.locationIcon} name="map-pin" size={20} color="#BDBDBD" />
    </View>
    
   </View>
   {!photo ? (<Text style={styles.titlePublish}>Опубліковати</Text>) : 
   (<TouchableOpacity  style={styles.button} onPress={sendPhoto}>      
      <Text style={styles.publishedTitle}>Опубліковати</Text>      
      </TouchableOpacity>)
      }
   
      <TouchableOpacity style={styles.deleteIcon} onPress={deleteForm}>      
      <Feather name="trash-2" size={24} color="#BDBDBD" />  
      </TouchableOpacity>

  </View>
  
  </TouchableWithoutFeedback>
  )
}


export default CreatePostsScreen




const styles = StyleSheet.create({
  container: {      
    flex: 1,    
    paddingTop: 32,
    paddingHorizontal: 16,    
  },
  camera: {   
    height: 240,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 25,   
  },
  cameraIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',   
  },
  titleUpload: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
  },
  form: {
    marginTop: 32,
marginBottom: 32,
gap: 16,
  },
  input: {
    padding: 16,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#F6F6F6',
  },
  inputLocation: {
    padding: 16,
    paddingHorizontal:24,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#F6F6F6',
  },
  inputFocus: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  button: {
    paddingVertical: 16,
     
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  publishedTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF',
  },

  locationIcon: {
position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 16,
  },
  deleteIcon: {
 alignItems: 'center',
 marginTop: 87,
 
  },
 titlePublish: {
  textAlign: 'center',
  marginBottom: 65,
  fontSize: 16,
  lineHeight: 19,
  fontFamily: 'Roboto-Regular',
  color: '#BDBDBD',
 }
})