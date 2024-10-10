import { createSlice } from "@reduxjs/toolkit";

const joinRoom  = createSlice({
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

export const {setRoomName, removeRoomName} = joinRoom.actions;
export default joinRoom.reducer;