import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem('cartItems')) || [],
  // cartProduct: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const find = state?.cart?.findIndex(
        (item) => item?.id === action?.payload?.id
      );
      console.log("index", find);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          
          return { ...item, quantity: item.quantity + 1 };
          
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(...state.cart, state.cart.quantity+=1));
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(...state.cart, state.cart.quantity-=1));
    },
    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
  },
});

export const {
  addToCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
} = cartSlice.actions;
