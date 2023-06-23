import React, { useState, useContext, useEffect } from 'react';
import {Text, TextInput, View, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { CountContext } from '../../Components/CountContext';
import DateComponent from '../../Components/DateComponent';
import {  getDocs,updateDoc, doc, collection, addDoc, onSnapshot} from "firebase/firestore";
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';



function CommentsScreen({route}) {  
  const {uri}  = route?.params ?? {};
  const {postId} = route.params;
  const [photos, setPhotos] = useState([uri]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('') 
  const [isFocused, setIsFocused] = useState(false);   

  const {login} = useSelector((state)=>state.auth) 


  useEffect(()=>{

    if (!postId) {
          console.error(`Failed to load post comments! postId (${postId}) was falsy`);
          setComments(null);     
          console.log("Invalid post ID");    
          return;
        }
      
    getPosts()
  },[])


  const getPosts = async () => {
    const postsCollectionRef = collection(db, 'users', postId, 'comments');
    const querySnapshot = await getDocs(postsCollectionRef);
    const tempComments = [];
   try {
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      tempComments.push(postData);
    });
    setComments(tempComments);
   } catch (error) {
    console.log(error);
    console.log(error.message);
   }
  }
 

const createComment =async () => {
  const date = new Date().toLocaleDateString('uk-Ua');
  const time = new Date().toLocaleTimeString();

  const postDocRef =await doc(db, 'users', postId);
  const newComment = {   
    timePublished: Date.now().toString(),
    comment,
    name: login,
    date,
    time,    
  }

  try {
    await addDoc(collection(postDocRef, 'comments'), newComment);
    await updateDoc( postDocRef, {
    comments: [...comments, newComment]
  })
  setComments([...comments, newComment]);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

  const handleCommentSubmit = () => {    
    if (!comment.trim()) return;
   
    createComment()
    setComment('');   
  };

  const handleFocus = (input) => setIsFocused(input);
  const handleBlur = () => setIsFocused(false);
  


  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
<SafeAreaView style={{flex: 1}}>
{user ? (
  <Image source={{ uri: user }} style={styles.user} />
) : (
  <Image source={require('../../assets/img/userComentImage.png')} style={styles.user} />
)}
</SafeAreaView>
      <View style={styles.commentContent}>      
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={styles.commentTimestamp}>{<DateComponent />}</Text>
      </View>
    </View>
  );

  

  return (
    <View style={styles.container}>
   <View>
   <FlatList 
      data={photos} 
      keyExtractor={(item, indx)=>indx.toString()}
      renderItem={({item})=>{        
        return (
          <View style={styles.imageThumb}>          
            <Image source={{uri: item}} style={styles.image} />
          </View>
        );
      }}  
    />
   </View>  

<FlatList data={comments} keyExtractor={(item, indx) => indx.toString()} renderItem={renderComment} />

<View>
<TextInput  style={[styles.input, isFocused === 'comment' && styles.inputFocus]}
placeholder={'Коментувати...'} 
onChangeText={setComment} 
value={comment}
onFocus={()=>{handleFocus('comment')}}
onBlur={handleBlur}   
>
  
</TextInput>
<TouchableOpacity style={styles.iconInput} onPress={handleCommentSubmit}>   
   <Ionicons name="arrow-up-circle-sharp" size={34} color="#FF6C00" />
</TouchableOpacity>
</View>
  
    
  </View>

  );
}

export default CommentsScreen


const styles = StyleSheet.create({
  container: {      
    flex: 1,    
    paddingTop: 32,
    paddingHorizontal: 16,    
  },
  imageThumb: {
    marginBottom: 32,
   
  },
  image: {
    width: '100%', 
    height: 240,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'black',
  },
  thumbComment: {

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
  inputFocus: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  iconInput: {
    position: 'absolute',
  top: 0,
  right: 0,
  padding: 8,
  },
  user: {
    width: 28,
    height: 28,
    borderRadius: 25,
    marginRight: 16,
  },
  commentText: {
    fontSize: 13,
  lineHeight: 18,
  fontFamily: 'Roboto-Regular', 
  
  },
  commentTimestamp: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
    textAlign: 'right',    
  },
  commentContainer: {
    flexDirection: 'row',
  },
  commentContent: {
width: 299,
paddingHorizontal:16,
paddingVertical:16,
  }

})