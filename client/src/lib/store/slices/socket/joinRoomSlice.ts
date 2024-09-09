import { createSlice } from "@reduxjs/toolkit";

const joinRoomSlice  = createSlice({
    name : "Join Room",
    initialState : {roomName : ""},
    reducers : {
        setRoomName : (state,action)=> {
            state.roomName = action.payload.roomName;
        },

        removeRoomName : (state,action) => {
            state.roomName = "";
        }
    }
    
})

export const {setRoomName, removeRoomName} = joinRoomSlice.actions;
export default joinRoomSlice.reducer;