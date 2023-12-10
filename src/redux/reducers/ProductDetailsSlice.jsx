import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProductDetails = createAsyncThunk('fetchProductDetails', async(id)=>{
    try{
        const res = await axios.get(`https://dummyjson.com/products/${id}`)
        return res?.data
    }catch(error){
        console.log('Error');
    }
})

const initialState = {
    p_details: [],
    status: 'success'
}

export const productDetailsSlice = createSlice({
    name: 'pDetails',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchProductDetails.pending, (state)=>{
            state.p_details=null
        })
        builder.addCase(fetchProductDetails.fulfilled, (state, action)=>{
            state.p_details=action.payload
        })
        builder.addCase(fetchProductDetails.rejected, (state)=>{
            console.log('Error');
            state.p_details=null
        })
    }
})