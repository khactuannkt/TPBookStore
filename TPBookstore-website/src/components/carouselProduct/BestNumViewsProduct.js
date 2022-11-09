import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsBestNumView } from "../../Redux/Actions/productActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "../homeComponents/Rating";
import CardProductLoading from "../base/LoadingError/CardProductLoading";
import formatCash from "../../utils/formatCash";

const BestNumViewsProduct = () => {
  const dispatch = useDispatch();
  const getBestNumViewProduct = useSelector((state) => state.productListBestNumView);
  const { loading, products } = getBestNumViewProduct;

  const newProducts = products?.sort((a, b) => b.numViews - a.numViews);

  useEffect(() => {
    dispatch(listProductsBestNumView());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          initialSlide: 0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      }
    ]
  };
  return (
    <>
      <div className="row best-number-view">
        <div className="title-section">
          <h2 className="heading-section main-effect">Sản phẩm được xem nhiều nhất</h2>
        </div>
        <div className="best-seller-container">
          <Slider {...settings}>
            {loading
              ? newProducts?.map((product) => {
                  return (
                    <div className="mb-4 col-lg-3" key={product._id}>
                      <div className="shadow p-3 mb-4 me-2 rounded">
                        <CardProductLoading />
                      </div>
                    </div>
                  );
                })
              : newProducts?.map((product, index) => {
                  return (
                    <div className="mb-4 col-lg-3" key={index}>
                      <div className="shadow p-3 mb-4 me-2 border border-1 rounded">
                        <Link to={`/product/${product._id}`}>
                          <div className="shopBack main-effect">
                            <img className="main-scale" src={product.image} alt={product.name} />
                            <span className="label-product_discount">
                              -{Math.round(100 - (product.priceSale / product.price) * 100)}%
                            </span>
                          </div>
                        </Link>

                        <div className="shoptext">
                          <p className="shoptext__name">
                            <Link to={`/product/${product._id}`}>
                              {product.name.length >= 55 ? `${product.name.slice(0, 55)}...` : ` ${product.name}`}
                            </Link>
                          </p>
<<<<<<< HEAD
                          <div className="shoptext__price-selling">
=======
                          <Rating value={product.rating} numRating={product.rating} />
                          <div className="shoptext__price">
                            <p className="shoptext__price-special">
                              <span className="shoptext__price-special-new">{formatCash(product.priceSale)}</span>
                            </p>
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
                            {product.priceSale < product.price ? (
                              <p className="shoptext__price-old">{formatCash(product.price)}</p>
                            ) : (
                              <></>
                            )}
                            <p className="shoptext__price-special">
                              <span className="shoptext__price-special-new">{formatPrice(product.priceSale)}</span>
                            </p>
                          </div>
                          <div className="shoptext__rating">
                            <Rating value={product.rating} numRating={product.rating} />
                            <p>
                              Lượt xem: <b>{product.numViews}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default BestNumViewsProduct;
