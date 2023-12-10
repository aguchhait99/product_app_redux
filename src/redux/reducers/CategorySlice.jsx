import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategoryName = createAsyncThunk('fetchCategoryName', async ()=>{
    try{
        const res= await axios.get('https://dummyjson.com/products/categories')
        return res?.data
    }catch(error){
        console.log('Error');
    }
})

const initialState = {
    cat_name: [],
    status: 'success'
}

export const catNameSlice = createSlice({
    name: 'catName',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchCategoryName.pending, (state)=>{
            state.cat_name = null
        })
        builder.addCase(fetchCategoryName.fulfilled, (state, action)=>{
            state.cat_name = action.payload
        })
        builder.addCase(fetchCategoryName.rejected, (state)=>{
            state.cat_name = null
            console.log('Error');
        })
    }
})