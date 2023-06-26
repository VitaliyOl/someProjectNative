import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';


function DefaultScreenPosts({navigation, route}) {
  const [posts, setPosts] = useState([]) 

  const {email, login, avatar, userId} = useSelector((state)=>state.auth)

 
 

  const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      
      // Перевіряємо у консолі отримані дані
      snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
  
      // Конвертуємо об'єкт QuerySnapshot у масив об'єктів
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(prevState => [...prevState, ...data])
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(()=>{
    if(route.params || db || userId) {
      getDataFromFirestore()   
    }
      
  }, [db, route.params, userId]) 
  

 const sendMap = (location) => {
  navigation.navigate('Map', {location})  
 }


 const renderPostItem = ({ item }) => (
  <View style={styles.imageThumb}>
    <Image
      source={{ uri: item.photo }}
      style={styles.image}
    />
      <Text style={styles.nameTitle}>{item.comment}</Text>      
   <View style={styles.buttonThumb}>   
   <TouchableOpacity style={styles.buttomComment} onPress={()=> navigation.navigate('Comments', {postId: item.id, uri: item.photo})}>
    <Feather style={styles.commentIcon} name="message-circle" size={20} color={!item.comments ? "#BDBDBD" : '#FF6C00'} />  
    <Text>{item.comments && item.comments.length}</Text>    
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonThumb} onPress={() => sendMap(item.location)}>
    <Feather style={styles.locationIcon}  name="map-pin" size={20} color={!item.location ? "#BDBDBD" : '#FF6C00'} /> 
    <Text>{item.textLocation}</Text>     
    </TouchableOpacity>
   </View>   
  </View>
)
  
  return (   

   
    <View style={styles.container}>
    <View style={styles.fotoContainer }>
    <Image style={styles.userFoto} source={avatar !== null ? {uri: avatar} : null } />
    <View style={styles.textContainer}>
      <Text style={styles.textLogin}>{login}</Text>
      <Text style={styles.textEmail}>{email}</Text>
    </View> 
    </View>
    
    <View style={{flex: 1}}>
    <FlatList data={posts} 
     keyExtractor={(item, indx)=>indx.toString()}
     renderItem={renderPostItem}    
     />
    </View>    
    </View>
    
    
  )
}

export default DefaultScreenPosts


const styles = StyleSheet.create({
  thumb: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
container: {
  flex: 1,
  paddingTop: 32,
  paddingHorizontal: 16, 
},
fotoContainer: {
  flex: 0.13,
  flexDirection: 'row', 
  marginBottom: 32,  
},
userFoto: {
  width: 60,
  height: 60,
  borderRadius: 16,
  backgroundColor: '#f6f6f6',
  marginRight: 8,
 
},
textContainer: {
  justifyContent: 'center',  
},
textEmail: { 
  fontSize: 11,
  lineHeight: 13,
  fontFamily: 'Roboto-Medium',
  color: '#212121CC'
},
textLogin: { 
  fontSize: 13,
    lineHeight: 16,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
},
imageThumb: { 
  marginBottom: 32,
},
image: {
  width: 383, 
  height: 240,
  borderWidth: 1,
 
},
testing: {
  width: 383, 
  height: 240,
  borderWidth: 1,
},
button: {
  paddingVertical: 16,
    marginBottom: 40,
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
nameTitle: {
  fontSize: 16,
  lineHeight: 19,
  fontFamily: 'Roboto-Regular',
 marginVertical: 8, 
},
buttonThumb: {
  flexDirection: 'row',
    alignItems: 'center',
},
buttomComment: {
  flexDirection: 'row',
  marginRight: 24,  
},
commentIcon: {
  marginRight: 8,
},
locationIcon: {
  marginRight: 4,
}
})

