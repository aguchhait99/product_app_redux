import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCatDetails = createAsyncThunk('fetchCatDetails', async (category)=>{
    try{
        const res = await axios.get(`https://dummyjson.com/products/category/${category}`)
        return res?.data?.products
    }catch(error){
        console.log(error);
    }
})

const initialState = {
    cat_details: [],
    status: 'success'
}

export const catDetailsSlice = createSlice({
    name: 'catDetails',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchCatDetails.pending, (state)=>{
            state.cat_details=null
        })
        builder.addCase(fetchCatDetails.fulfilled, (state, action)=>{
            state.cat_details=action.payload
        })
        builder.addCase(fetchCatDetails.rejected, (state)=>{
            console.log('error');
            state.cat_details=null
        })
    }
})