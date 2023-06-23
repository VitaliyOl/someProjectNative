import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const AddUserImage = ({onImage, onLoad, onDelete}) => {
    const imageSource = onImage !== null ? { uri: onImage } : null;

  return (
    
    <View style={styles.thumbUser}>
    <Image style={styles.userFoto} source={imageSource} />  
    {!imageSource ? 
    (  <TouchableOpacity style={styles.addFoto} onPress={onLoad}>
    <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
    </TouchableOpacity> ) 
    : 
    (<TouchableOpacity style={styles.addFoto} onPress={onDelete}>
        <AntDesign name="closecircleo" size={25} color="#BDBDBD" style={styles.addAvatar}/>
        </TouchableOpacity>)}             
                   
     
   </View>
  )
}

export default AddUserImage


const styles = StyleSheet.create({
    thumbUser: {
        position: 'absolute',
        top: -60,
        alignSelf: 'center', 
       
      },
      userFoto: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#f6f6f6',
       
      },
      addFoto: {
        position: 'absolute',
        bottom: 14,
        right: -12, 
        color: '#ff6c00',    
      },
})