import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/brand-1.svg";
import img2 from "../../assets/images/brand-2.svg";
import img3 from "../../assets/images/brand-3.svg";
import img4 from "../../assets/images/brand-4.svg";
import img5 from "../../assets/images/brand-5.svg";
import img6 from "../../assets/images/brand-6.svg";

const OurPartners = () => {
  const images = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
    {
      img: img4,
    },
    {
      img: img5,
    },
    {
      img: img6,
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="our-partners-wrapper">
      <div className="container">
        <div className="brands-container mt-5">
          <Slider {...settings}>
            {images.map((image) => (
              <div className="brand">
                <img src={image.img} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
