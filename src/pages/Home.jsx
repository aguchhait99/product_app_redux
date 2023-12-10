import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/reducers/ProductSlice";
import { fetchCategoryName } from "../redux/reducers/CategorySlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/reducers/CartSlice";

const Home = () => {
  const { product_data } = useSelector((state) => state?.product);
  const { cat_name } = useSelector((state) => state?.catName);
  const dispatch = useDispatch();
  const nav = useNavigate()

  console.log("product", product_data);
  console.log("CatName", cat_name);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCategoryName());
  }, [dispatch]);

  // Load More Data Option
  const dataPerRow = 6;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

  return (
    <>
      <Layout title={"Product-Home"}>
        <div className="container">
          <div className="row">
            {/* Category */}
            <div
              className="col-3"
              style={{ marginTop: "120px", marginBottom: "25px" }}
            >
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-header">Category</div>
                <ul className="list-group list-group-flush">
                  {cat_name?.map((cat, index) => {
                    return (
                      <>
                        <Link
                          to={`/categorydetails/${cat}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <li className="list-group-item" key={index}>
                            {cat}
                          </li>
                        </Link>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Product */}
            <div className="col-9">
              <div
                className="row"
                style={{ marginTop: "120px", marginBottom: "25px" }}
              >
                {product_data?.length > 0 &&
                  product_data?.slice(0, loadMoreData)?.map((product, key) => {
                    return (
                      <>
                        <div className="col" key={key}>
                          <div
                            className="max-w-sm rounded overflow-hidden shadow-2xl shadow-black"
                            style={{
                              width: "18rem",
                              marginBottom: "20px",
                              height: 400,
                            }}
                          >
                            <img
                              src={product?.thumbnail}
                              className="card-img-top"
                              alt="..."
                              style={{ height: 200 }}
                            />
                            <div className="card-body">
                              <div className="font-bold text-xl mb-2">{product?.title}</div>
                              <p className="card-text">
                                {product?.description?.slice(0, 50)}
                              </p>
                              <button
                                className="bg-purple-600 text-white font-[Poppins] py-2 px-3 my-3 rounded md:ml hover:bg-purple-400 
    duration-500 cursor-pointer"
                                onClick={() =>
                                  nav(`/productdetails/${product?.id}`)
                                }
                              >
                                Show Details
                              </button>
                              <button
                                className="bg-purple-600 text-white font-[Poppins] py-2 px-3 my-3 ml-1 rounded md:ml hover:bg-purple-400 
    duration-500 cursor-pointer"
                                onClick={() =>
                                  dispatch(addToCart(product))
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              {loadMoreData < product_data?.length && (
                <>
                  <button
                    className="bg-purple-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-purple-400 
    duration-500"
                    style={{ marginBottom: 20 }}
                    onClick={handleMoreData}
                  >
                    Load More
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
