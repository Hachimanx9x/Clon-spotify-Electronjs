import React, { useState, useEffect } from "react";

import Slider from "react-slick";

import firebase from "../../../utils/firebase";
import { Link } from "react-router-dom";
import "firebase/storage";
import "./BasicSliderItems.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RenderItem({ item, folderImage, urlName }) {
  const [imgUrl, setImgUrl] = useState(null);
  // console.log(item);
  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImage}/${item.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImgUrl(url);
      })
      .catch((err) => {
        console.log(err);
        console.log(item);
      });
  }, [item, folderImage]);

  return (
    <Link to={`/${urlName}/${item.id}`}>
      {" "}
      <div className="o-basic-alider-items__list-item">
        <div
          className="o-avatar "
          style={{ backgroundImage: `url("${imgUrl}")` }}
        />
        <h3>{item.name}</h3>
      </div>
    </Link>
  );
}
export default function BasicSliderItems({
  title,
  data,
  folderImage,
  urlName,
}) {
  // console.log(data);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToshow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "o-basic-alider-items__list",
  };
  if (data.length < 1) {
    return <h3>Dentro de muy poco tiempo mas contenido de tu interes</h3>;
  } else if (data.length < 5) {
    return (
      <div className="o-basic-alider-items">
        <h2>{title}</h2>
        <div className="o-basic-alider-items__no-slide">
          {data.map((item) => (
            <RenderItem
              key={item.id}
              item={item}
              folderImage={folderImage}
              urlName={urlName}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="o-basic-alider-items">
        <h2>{title}</h2>
        <Slider {...settings}>
          {data.map((item) => (
            <RenderItem
              key={item.id}
              item={item}
              folderImage={folderImage}
              urlName={urlName}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
