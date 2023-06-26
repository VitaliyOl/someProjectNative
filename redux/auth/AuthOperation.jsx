import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import {updateUserProfile, authStateChange, setAvatar} from '../auth/AuthReducer'



export const registerDB = ({email, password, login, avatar}) => async (dispatch, getState) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user  = await auth.currentUser    
    
    await updateProfile(user, {
        displayName: login,
        photoURL: avatar,           
      });     

      const {displayName, uid, photoURL } = auth.currentUser;    
   
    dispatch(updateUserProfile({
      userId: uid,
      login: displayName,
      email: email,
      avatar: photoURL,          
    }));
  } catch (error) {
    throw error;
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
      await onAuthStateChanged(auth, (user) => {
          if(user) {
            const userUpdate = {
              userId: user.uid,
              login: user.displayName,
              email: user.email,
              avatar: user.photoURL,             
            }
            dispatch(updateUserProfile(userUpdate));
            dispatch(authStateChange({stateChange: true}));
            console.log('User is signed in');
          }
      })
};



export const loginDB = ({email,password}) => async (dispatch, getState) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);  
    
    
    const {displayName, uid, photoURL} = credentials.user;
   
    dispatch(updateUserProfile({
      userId: uid,
      login: displayName,
      email: email,
      avatar: photoURL,         
    }));
    
        return credentials.user;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    throw error;
   
  }
};


export const signOutDB = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    
    dispatch(updateUserProfile({
      userId: null,
      login: null,
      email: null,
      avatar: null,
    }));
    
    dispatch(authStateChange({stateChange: false}));
  } catch (error) {
     console.log(error);
     console.log(error.message);
     throw error;
  }
};