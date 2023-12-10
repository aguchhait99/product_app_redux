import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../reducers/ProductSlice";
import { catNameSlice } from "../reducers/CategorySlice";
import { catDetailsSlice } from "../reducers/CatDetailsSlice";
import { productDetailsSlice } from "../reducers/ProductDetailsSlice";
import { searchSlice } from "../reducers/SearchSlice";
import { cartSlice } from "../reducers/CartSlice";


export const Store = configureStore({
    reducer: {
        product: productSlice.reducer,
        catName: catNameSlice.reducer,
        catDetails: catDetailsSlice.reducer,
        pDetails: productDetailsSlice.reducer,
        search: searchSlice.reducer,
        carts: cartSlice.reducer,
    }
})