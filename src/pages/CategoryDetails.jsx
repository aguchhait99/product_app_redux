import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { fetchCatDetails } from "../redux/reducers/CatDetailsSlice";
import { fetchCategoryName } from "../redux/reducers/CategorySlice";
import { addToCart } from "../redux/reducers/CartSlice";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const { cat_details } = useSelector((state) => state?.catDetails);
  const { cat_name } = useSelector((state) => state?.catName);
  const { category } = useParams();
  const nav = useNavigate()
  console.log("Params_cat", category);
  console.log("catDetails", cat_details);

  useEffect(() => {
    if (category) {
      dispatch(fetchCatDetails(category));
    }
    dispatch(fetchCategoryName());
  }, [dispatch, category]);

  // Load More Data Option
  const dataPerRow = 6;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

  return (
    <Layout title={"Product Details"}>
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
              {cat_details?.length > 0 &&
                cat_details?.slice(0, loadMoreData)?.map((product, key) => {
                  return (
                    <>
                      <div className="col" key={key}>
                        <div
                          className="card"
                          style={{
                            width: "18rem",
                            marginBottom: "20px",
                            height: 400,
                            boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                          }}
                        >
                          <img
                            src={product?.thumbnail}
                            className="card-img-top"
                            alt="..."
                            style={{ height: 200 }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product?.title}</h5>
                            <p className="card-text">{product?.description?.slice(0,70  )}</p>
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
            {loadMoreData < cat_details?.length && (
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
  );
};

export default CategoryDetails;
