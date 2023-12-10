import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CategoryDetails from '../pages/CategoryDetails'
import ProductDetails from '../pages/ProductDetails'
import Search from '../pages/Search'
import Cart from '../pages/Cart'
import Contact from '../pages/Contact'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/categorydetails/:category' element={<CategoryDetails/>}/>
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>
        <Route path='/search/:query' element={<Search/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>


      </Routes>
    </>
  )
}

export default Routing
