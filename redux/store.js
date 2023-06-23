import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/AuthReducer'
// import {
//     persistReducer,
//     persistStore,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist';
//   import AsyncStorage from '@react-native-async-storage/async-storage';


  const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer
    // auth: authSlice.reducer
    })

  // const persistConfig = {
  //   key: 'root',
  //   storage: AsyncStorage,
  // };

  // const reducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: rootReducer,
  })

  // export const store = configureStore({
  //   reducer,
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       },
  //     }),
  // });
  
  // export const persistor = persistStore(store);

 


// export const store = configureStore({
//     reducer: rootReducer,
// })