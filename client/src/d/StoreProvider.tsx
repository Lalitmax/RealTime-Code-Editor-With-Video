'use client'
import { setRoomName } from '@/lib/store/slices/socket/joinRoomSlice'
import { AppStore, makeStore } from '@/lib/store/store'
import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({children} : {children:ReactNode})=> {
    const storeRef = useRef<AppStore>()
    if(!storeRef.current) {
        storeRef.current = makeStore();
        // storeRef.current.dispatch(setRoomName("Room"))

    }
    return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider