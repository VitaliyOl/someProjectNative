import { createStackNavigator } from "@react-navigation/stack"
import DefaultScreenPosts from "./nestedScrens/DefaultScreenPosts"
import MapScreen from "./nestedScrens/MapScreen"
import CommentsScreen from './nestedScrens/CommentsScreen'
import { CountProvider } from "../Components/CountContext"
// import { CountContext } from "../Components/CountContext"



const NestedScreen = createStackNavigator()


function PostsScreen() {
  return (
    <CountProvider>
        <NestedScreen.Navigator> 
      <NestedScreen.Screen name='DefaultScreen' component={DefaultScreenPosts} options={{ tabBarLabel: null }}/> 
      <NestedScreen.Screen name='Map' component={MapScreen}  options={{ headerShown: false, tabBarLabel: null }}/> 
      <NestedScreen.Screen name='Comments' component={CommentsScreen}  options={{ headerShown: false, tabBarLabel: null }}/> 
        </NestedScreen.Navigator> 
        </CountProvider>
)
}

export default PostsScreen







// import React, { useEffect, useState } from 'react'
// import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'


// function PostsScreen({navigation, route}) {
//   const [posts, setPosts] = useState([])
  


//   useEffect(()=>{
//     if(route.params) {
//       setPosts(prevState => [...prevState, route.params])

//     }
//   }, [route.params])

//   const sendMap = () => {
//     navigation.navigate('DefaultScreen')
//   }

//   const sendComment = () => {
//     navigation.navigate('DefaultScreen')
//   }
  
  
//   return (
//     <View style={styles.container}>
    
//      <FlatList data={posts} 
//      keyExtractor={(item, indx)=>indx.toString()}
//       renderItem={({item})=>{        
//          return (
//           <View >
//             <Image source={{uri: item.photo}}
//               style={styles.image}
//             />
//           </View>
//          )
//       }}
//      />

// <TouchableOpacity  style={styles.button} onPress={sendMap}>      
//       <Text style={styles.publishedTitle}>go map</Text>      
//       </TouchableOpacity>

//       <TouchableOpacity  style={styles.button} onPress={sendComment}>      
//       <Text style={styles.publishedTitle}>go comment</Text>      
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default PostsScreen

// const styles = StyleSheet.create({
// container: {
//   flex: 1
// },
// image: {
//   width: 383, 
//   height: 240,
//   borderWidth: 1,
//  marginBottom: 16,
// },
// testing: {
//   width: 383, 
//   height: 240,
//   borderWidth: 1,
// },
// button: {
//   paddingVertical: 16,
//     marginBottom: 40,
//   borderRadius: 100,
//   backgroundColor: '#FF6C00',
// },
// publishedTitle: {
//   textAlign: 'center',
//   fontSize: 16,
//   lineHeight: 19,
//   fontFamily: 'Roboto-Regular',
//   color: '#FFFFFF',
// },
// })
