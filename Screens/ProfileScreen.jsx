import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Image, TouchableOpacity, FlatList, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase/config';
import { Feather } from '@expo/vector-icons';
import AddUserImage from '../Components/AddUserImage';
import { signOutDB } from '../redux/auth/AuthOperation';





const ProfileScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const {email, login, avatar, userId} = useSelector((state)=>state.auth)
  const [posts, setPosts] = useState([]) 
 
  
  const dispatch = useDispatch()

  useEffect(()=>{
   if(userId) {
    getUserPosts()
   }
  }, [userId])

  const handleSignOut = () => {   
    signOutDB()(dispatch);
 };

const getUserPosts = async () => {
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where("userId", "==", userId));

try {
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());    
  });

  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  setPosts(prevState => [...prevState, ...data])
} catch (error) {
  console.log(error);
  console.log(error.message);
}
}

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
  
      <TouchableOpacity style={styles.buttonThumbLocal} onPress={() => sendMap(item.location)}>
      <Feather style={styles.locationIcon}  name="map-pin" size={20} color={!item.location ? "#BDBDBD" : '#FF6C00'} /> 
      <Text>{item.textLocation.split(',')[item.textLocation.split(',').length - 1].trim()}</Text>     
      </TouchableOpacity>
     </View>   
    </View>
  )
  
  return (   
    <ImageBackground source={require('../assets/img/bgImage.jpg')}
      style={{ position: 'absolute', width: width, height: height }}>


<View style={styles.thumb}>
<View style={ styles.thumbLogout}>
<TouchableOpacity style={{ marginRight: 16, marginBottom: 10 }} 
                 onPress={handleSignOut}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity> 
</View>

<AddUserImage  onImage={avatar} />

<Text style={ styles.titleRegistration}>{login}</Text>

<View>

<FlatList data={posts} 
    keyExtractor={(item, indx)=>indx.toString()}
    renderItem={renderPostItem}    
    />

</View>

</View>
      </ImageBackground>
  )
}

export default ProfileScreen


const styles = StyleSheet.create({
  container: {      
    flex: 1, 
    justifyContent: 'flex-end',  
    
  },
  thumb: {
    marginTop: 147,
    paddingTop: 92,    
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  }, 
  thumbLogout: {
    position: 'absolute',
    top: 22,
   right: 0,
    
  }, 

  titleRegistration: {  
    marginBottom: 32,
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    textAlign: 'center',
  },

  // container: {
  //   flex: 1,
  //   paddingTop: 32,
  //   paddingHorizontal: 16, 
  //   marginTop: 148,
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 25,
  // },
  // containerTest: {      
  //   flex: 1, 
  //   justifyContent: 'flex-end',  
    
  // },
  // avatarContainer: {
  //   marginBottom: 32,
  // },
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
  buttonThumbLocal: {
    flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto',
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
  
});

