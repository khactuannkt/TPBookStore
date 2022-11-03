import React from "react";
import { useSelector } from "react-redux";

const CustomerReview = () => {
  const getReviewCustomer = useSelector((state) => state.productList);
  const { products } = getReviewCustomer;

  //   const newProduct = products
  //     ?.sort((a, b) => b.numReviews - a.numReviews)
  //     .slice(0, 3)
  //     .map((item) => {
  //       return item.reviews.sort((a, b) => b.rating - a.rating);
  //     });
  const newProduct = products
    ?.filter((item) => item.rating >= 4)
    ?.map((item) => {
      return item.reviews.sort((a, b) => b.rating - a.rating);
    });

  return (
    <div className="evaluate">
      <div className="evaluate__title">
        <h2 className="evaluate__heading">Outstanding customer reviews</h2>
      </div>
      <div className="evaluate__overlay"></div>
      <div className="grid wide">
        <div className="row evaluate__container">
          <div className="col l-4 m-6">
            <div className="evaluate__user">
              <div className="evaluate__user-img">
                <img src="../images/avatar/default.png" alt="" />
              </div>
              <div className="evaluate__content">
                <div className="evaluate__content-icon">
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                </div>
                <h3 className="evaluate__content--name">Nguyen Khac Tuan</h3>
                <p className="evaluate__content--desc">
                  {newProduct
                    ? newProduct[2]?.[0]?.reviewContent
                    : `There are many meaningful books here and their prices are also very reasonable.`}
                </p>
              </div>
            </div>
          </div>
          <div className="col l-4 m-6">
            <div className="evaluate__user">
              <div className="evaluate__user-img">
                <img src="../images/avatar/default.png" alt="" />
              </div>
              <div className="evaluate__content">
                <div className="evaluate__content-icon">
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                  <i className="evaluate__content-icon--star fas fa-star"></i>
                </div>
                <h3 className="evaluate__content--name">Nguyen Viet Phu</h3>
                <p className="evaluate__content--desc">
                  {newProduct
                    ? newProduct[1]?.[0]?.reviewContent
                    : `There are many meaningful books here and their prices are also very reasonable`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;