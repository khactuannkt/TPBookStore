import React, { useEffect } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSlider, listBanner } from "../Redux/Actions/bannerActions";
const Slideshow = () => {
  const dispatch = useDispatch();

  const sliderList = useSelector((state) => state.sliderList);
  const { error, loading, sliders } = sliderList;

  const bannerList = useSelector((state) => state.bannerList);
  const { banners } = bannerList;

  useEffect(() => {
    dispatch(listSlider());
  }, [dispatch]);
  return (
    <div className="grid wide">
      <div className="row">
        <div className="slide-container">
          <div className="slide__img">
            <Fade>
              {sliders?.map((item, index) => (
                <div className="slide-container__img">
                  <div className="each-slide" key={index}>
                    <Link to={item.linkTo}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
          <div className="slide__banner">
            <div>
              {banners?.length > 0 ? (
                <Link to={banners[1].linkTo}>
                  <img src={banners[1].image} alt={banners[1].name} className="slide__banner-img" />
                </Link>
              ) : (
                <img className="slide__banner-img" src="" alt="Banner"></img>
              )}
            </div>
            <div>
              {banners?.length > 0 ? (
                <Link to={banners[2].linkTo}>
                  <img src={banners[2].image} alt={banners[2].name} className="slide__banner-img" />
                </Link>
              ) : (
                <img className="slide__banner-img" src="" alt="Banner"></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slideshow;