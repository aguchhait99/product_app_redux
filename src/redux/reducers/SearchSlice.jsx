import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSearch = createAsyncThunk('fetchSearch', async(query)=>{
    try{
        const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
        return res?.data?.products
    }catch(error){
        console.log('error');
    }
} )

const initialState = {
    search_data: [],
    status: 'success'
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSearch.pending, (state)=>{
            state.search_data=null
        })
        builder.addCase(fetchSearch.fulfilled, (state, action)=>{
            state.search_data = action.payload
        })
        builder.addCase(fetchSearch.rejected, (state)=>{
            console.log('error');
            state.search_data = null
        })
    }
})