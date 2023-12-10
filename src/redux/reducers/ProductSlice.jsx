import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://dummyjson.com'

export const fetchProduct = createAsyncThunk("fetchProduct", async ()=>{
    try{
        const res = await axios.get(`${BASE_URL}/products`)
        return res?.data?.products
    }catch(error){
        console.log('error');
    }
})

const initialState = {
    product_data: [],
    status: 'success'
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchProduct.pending, (state)=>{
            state.product_data = null
        })
        builder.addCase(fetchProduct.fulfilled, (state, action)=>{
            state.product_data = action.payload
        })
        builder.addCase(fetchProduct.rejected, (state)=>{
            state.product_data = null
            console.log('Error');
        })
    }
})