import React from "react";
import Slider from "react-slick";

const OurPartners = () => {
  const images = [
    {
      img: "/images/brand-1.svg",
    },
    {
      img: "/images/brand-2.svg",
    },
    {
      img: "/images/brand-3.svg",
    },
    {
      img: "/images/brand-4.svg",
    },
    {
      img: "/images/brand-5.svg",
    },
    {
      img: "/images/brand-6.svg",
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
