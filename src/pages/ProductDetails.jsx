import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../redux/reducers/ProductDetailsSlice";
import Carousel from "react-material-ui-carousel";
import Button from "../components/Button";
import { addToCart } from "../redux/reducers/CartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { p_details } = useSelector((state) => state?.pDetails);
  const { id } = useParams();
  const imageUrl = [p_details?.images];
  console.log("imageurl", imageUrl);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch]);
  return (
    <Layout title={"Product-Details"}>
      <center>
        <div className="container-sm shadow-2xl shadow-black py-20 mt-20">
          <div className="row">
            <div className="col">
            {imageUrl?.map((image, index) => {
              return (
                <>
                <Carousel>
                  {image?.map((element, i) => {
                    return (
                      <>
                        
                            <img src={element} key={i}/>
                        {console.log("imggg", element)}
                      </>
                    );
                  })}
                  </Carousel>
                </>
              );
            })}
            </div>
            <div className="col">
            <p class="font-mono ...">{p_details?.title}</p>
            <p class="font-mono ...">Description: {p_details?.description}</p>
            <p class="font-mono ...">Price: {p_details?.price}</p>
            <p class="font-mono ...">Rating: {p_details?.rating}</p>
            <p class="font-mono ...">DiscountPercentage: {p_details?.discountPercentage}</p>
            <p class="font-mono ...">Stock: {p_details?.stock}</p>
            <p class="font-mono ...">Brand: {p_details?.brand}</p>
            <p class="font-mono ...">Category: {p_details?.category}</p>
            <button className="bg-purple-600 text-white font-[Poppins] py-2 px-3 my-3 rounded md:ml hover:bg-purple-400 
    duration-500 cursor-pointer" onClick={() =>
      dispatch(addToCart(p_details))
    }>Add to Cart</button>
            </div>
          </div>
        </div>
      </center>
    </Layout>
  );
};

export default ProductDetails;
