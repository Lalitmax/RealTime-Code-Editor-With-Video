import {configureStore} from '@reduxjs/toolkit'
import joinRoom from './slices/socket/joinRoomSlice';
 
export const makeStore = () => {
  return configureStore({
    reducer: {joinRoom},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']