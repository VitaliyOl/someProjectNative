import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import {updateUserProfile, authStateChange} from '../auth/AuthReducer'



export const registerDB = ({email, password, login}) => async (dispatch, getState) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user  = await auth.currentUser
    
    await updateProfile(user, {
        displayName: login,
      });

      const {displayName, uid } = auth.currentUser;    
   
    dispatch(updateUserProfile({
      userId: uid,
      login: displayName,
    }));
  } catch (error) {
    throw error;
  }
};


// export const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {           
//           onChange(user);
//   });
// };



export const authStateChangeUser = () => async (dispatch, getState) => {
      await onAuthStateChanged(auth, (user) => {
          if(user) {
            const userUpdate = {
              userId: user.uid,
              login: user.displayName,
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
    
    const {displayName, uid} = credentials.user;
    dispatch(updateUserProfile({
      userId: uid,
      login: displayName,
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
    }));
    
    dispatch(authStateChange({stateChange: false}));
  } catch (error) {
     console.log(error);
     console.log(error.message);
     throw error;
  }
};


const updateUser = async (dispatch, update) => {
  
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {

  // оновлюємо його профайл
        try {
           await updateProfile(user, update);  
           console.log(user);          
          dispatch(updateUserProfile({
            userId: user.uid,
            login: user.displayName,
          }))   
                
        } catch(error) {
            throw error
        }
  }
};

