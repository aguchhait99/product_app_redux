import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../layout/Layout'
import { fetchSearch } from '../redux/reducers/SearchSlice'
import { fetchCategoryName } from '../redux/reducers/CategorySlice'

const Search = () => {
    const {search_data} = useSelector((state)=>state?.search)
    const { cat_name } = useSelector((state) => state?.catName);
    const dispatch = useDispatch()
    const {query} = useParams()
    const nav = useNavigate()
    console.log('search', query);

    useEffect(()=>{
        if(query){
            dispatch(fetchSearch(query))
        }
        dispatch(fetchCategoryName())
    },[dispatch, query])

    // Load more data
    const dataPerRow = 3
    const [loadMoreData, setLoadMoreData] = useState(dataPerRow)
    const handleMoreData = ()=>{
        setLoadMoreData(loadMoreData+dataPerRow)
    }

  return (
    <Layout title={'Search'}>
      <div className="container">
          {
            search_data?.length == 0 ? <h1 className='py-60 mt-20 text-center text-4xl text-purple-700'>No Data Found Regarding Your Search '{query}'</h1> :
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
            {/* Search Product */}
            <div className="col-9">
              <div
                className="row"
                style={{ marginTop: "120px", marginBottom: "25px" }}
              >
                {search_data?.length > 0 &&
                  search_data?.slice(0, loadMoreData)?.map((product, key) => {
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
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              {loadMoreData < search_data?.length && (
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
          }
        </div>
    </Layout>
  )
}

export default Search
