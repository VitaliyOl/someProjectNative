import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, ImageBackground, StyleSheet, useWindowDimensions, View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux';
import { loginDB } from '../../redux/auth/AuthOperation';


const userState = {
  email: '',
  password: '',
}

const LoginScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState(userState)
  const [secureTextEntry, setSecureTextEntry] = useState(true);  
  const {height, width} = useWindowDimensions();

  const dispatch = useDispatch()

  const navigation = useNavigation()
 

  const handleButtonPress = () => {
    setIsHidden(!isHidden);
  };

  const handleFocus = (input) => setIsFocused(input)

  
  const handleBlur = () => setIsFocused(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
   
  };



  const handleSubmit = () => {
    setState(userState) 
    // setIsAuth(true)      
    dispatch(loginDB(state))
    
      }
    

      

  return (  
   
      <ImageBackground source={require('../../assets/img/bgImage.jpg')}
      style={{ position: 'absolute', width: width, height: height }}>
 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
         style={styles.container} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -208 : -208}
         >

      <View style={{...styles.wrapper,  }}>
        <Text style={styles.title}>Увійти</Text>
        <View View style={{...styles.form, }}>       

        <TextInput style={[styles.input, isFocused === 'email' && styles.inputFocus]} placeholder="Адреса електронної пошти"  value={state.email}
       onChangeText={(value) => {
          setState(prev => ({
              ...prev, email : value
          }))
        }} 
        onFocus={()=>{handleFocus('email')}}
        onBlur={handleBlur}
        />
     <View style={{...styles.passwordContainer,  }}>
     <TextInput style={[styles.input, isFocused === 'password' && styles.inputFocus]} placeholder="Пароль" secureTextEntry={secureTextEntry} value={state.password}
        onChangeText={(value) => {
          setState(prev => ({
              ...prev, password : value
          }))
        }} 
        onFocus={()=>{handleFocus('password')}}
        onBlur={handleBlur}
        />

  <TouchableOpacity  style={styles.passwordButton}onPress={toggleSecureTextEntry}>      
      <Text style={styles.passwordTitle}>{secureTextEntry ? 'Показати' : 'Приховати'}</Text>
      </TouchableOpacity>
     </View>
        </View>


        <TouchableOpacity  style={styles.button} onPress={handleSubmit}>      
      <Text style={styles.registerTitle}>Увійти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{navigation.navigate("RegistrationScreen")}}>      
      <Text style={{...styles.loginTitle}}>Немає акаунту? <Text style={{textDecorationLine: 'underline'}}>Зареєструватися</Text></Text>
      </TouchableOpacity>

      </View>

          </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
      </ImageBackground>
      
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
 container: {      
    flex: 1, 
    justifyContent: 'flex-end',    
    
  },
  wrapper: {
    paddingTop: 32,    
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {   
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
  inputFocus: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    marginBottom: 43,
  },
  passwordButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 16,

    // backgroundColor: 'transparent',
  },
  passwordTitle: {
  fontSize: 16,
  fontFamily: 'Roboto-Regular',
  color: '#1B4371',
 },
 button: {
  paddingVertical: 16,
  paddingHorizontal: 32,
  marginBottom: 16,
  borderRadius: 100,
  backgroundColor: '#FF6C00',
},
registerTitle: {
  textAlign: 'center',
  fontSize: 16,
  lineHeight: 19,
  fontFamily: 'Roboto-Regular',
  color: '#FFFFFF',
},
loginTitle: {
  marginBottom: 111,
  textAlign: 'center',
  fontSize: 16,
  fontFamily: 'Roboto-Regular',
  lineHeight: 19,
  color: '#1B4371',
},
})
