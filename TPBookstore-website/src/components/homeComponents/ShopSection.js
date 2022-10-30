import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/productActions";
import Message from "./../base/LoadingError/Error";
import Filter from "../../screens/Filter";
import { listCategory } from "../../Redux/Actions/categoryActions";
import CardProductLoading from "../base/LoadingError/CardProductLoading";
import SortBy from "./SortBy";

const ShopSection = (props) => {
  const { keyword, pageNumber, isFilter, setIsFilter } = props;
  const dispatch = useDispatch();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [minPrice, setMinPriceInput] = useState("");
  const [maxPrice, setMaxPriceInput] = useState("");

  const [sortBy, setSortBy] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;

  // const checkNameCategory = (item) => item.name === categoryFilter;
  // const nameCate = category?.find(checkNameCategory)?.name;
  const checkIsFilter = useCallback(() => {
    if (categoryFilter !== "" || ratingFilter !== "" || maxPrice > 0) {
      setIsFilter(true);
    } else {
      return isFilter;
    }
  }, [categoryFilter, ratingFilter, maxPrice, isFilter, setIsFilter]);

  const loadData = useCallback(() => {
    dispatch(listProducts(keyword, pageNumber, categoryFilter, ratingFilter, minPrice, maxPrice, sortBy));
    dispatch(listCategory());
  }, [dispatch, keyword, pageNumber, categoryFilter, ratingFilter, minPrice, maxPrice, , sortBy]);

  useEffect(() => {
    loadData();
    checkIsFilter();
  }, [loadData, checkIsFilter]);
  return (
    <>
      <div className="container all-products">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12  article">
              <div className="shopcontainer row">
                <div className="title-section">
                  <h2 className="heading-section main-effect">all products</h2>
                </div>

                <SortBy sortBy={sortBy} setSortBy={setSortBy} />

                <div className="row">
                  <div className="find-product col-2 pc-header">
                    <Filter
                      category={category}
                      categoryFilter={categoryFilter}
                      setCategoryFilter={setCategoryFilter}
                      ratingFilter={ratingFilter}
                      setRatingFilter={setRatingFilter}
                      setMinPriceInput={setMinPriceInput}
                      setMaxPriceInput={setMaxPriceInput}
                    />
                  </div>

                  <div className="col-8 row product-container ">
                    {loading ? (
                      products?.map((product) => {
                        return (
                          <div className="col-lg-3" aria-hidden="true" key={product._id}>
                            <div className="shadow p-3 mb-4 bg-body rounded">
                              <CardProductLoading />
                            </div>
                          </div>
                        );
                      })
                    ) : error ? (
                      <Message variant="alert-danger">{error}</Message>
                    ) : (
                      products?.map((product) => (
                        <div className="col-lg-3 col-md-6" key={product._id}>
                          <div className="shadow p-3 mb-4 bg-body border border-1 rounded">
                            <Link to={`/product/${product._id}`}>
                              <div className="shopBack main-effect">
                                <img className="main-scale" src={product.image} alt={product.name} />
                              </div>
                            </Link>

                            <div className="shoptext">
                              <p className="shoptext__name">
                                <Link to={`/product/${product._id}`}>
                                  {product.name.length >= 55 ? `${product.name.slice(0, 55)}...` : ` ${product.name}`}
                                </Link>
                              </p>

                              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                              <div className="shoptext__price">
                                <p className="shoptext__price-special">
                                  <span className="shoptext__price-special-new">${product.priceSale}</span>
                                  {product.priceSale < product.price ? (
                                    <span className="shoptext__price-special-discount">
                                      -{Math.round(100 - (product.priceSale / product.price) * 100)}%
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </p>
                                {product.priceSale < product.price ? (
                                  <p className="shoptext__price-old">${product.price}</p>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Pagination */}
                <Pagination page={page} pages={pages} keyword={keyword ? keyword : ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
