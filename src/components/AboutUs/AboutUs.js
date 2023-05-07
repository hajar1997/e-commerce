import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";

const AboutUs = () => {
  return (
    <div className="about__us">
      <div className="about_us__header">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Ana səhifə</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <span>Haqqımızda</span>
              </li>
            </ol>
          </nav>
          <div className="headline_center">
            <h2>Haqqımızda</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="main_headline_center">
          <h5>Project X</h5>
          <div className="main_headline__text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              lectus eget dignissim quis cursus orci ipsum. Volutpat ut varius
              nunc fringilla habitasse netus. Eget lorem parturient sed purus
              leo, fringilla adipiscing nisl. Turpis dictumst amet, amet dictum
              turpis mauris suscipit sit. Enim risus tincidunt ipsum, nunc, sed
              cras. Est in venenatis lobortis quis laoreet velit. Consectetur
              malesuada pellentesque ac velit fringilla est venenatis. Enim,
              sagittis lobortis lacus, arcu commodo. Sagittis, varius ac nulla
              a. Dui nisl, blandit in id hendrerit. Risus diam risus, nec sit.
              Sed mi arcu gravida iaculis tellus mollis tempor ac.
            </p>
          </div>
        </div>
        <div className="our__values">
          <h5>Dəyərlərimiz</h5>
          <div className="quality__ mt-5">
            <div className="quality_icon">
              <img src="/images/check.svg" />
            </div>
            <div className="quality_text">
              <h6>Keyfiyyət</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                laoreet commodo non magna ullamcorper tincidunt augue. Viverra
                porttitor arcu sed quisque.
              </p>
            </div>
          </div>
          <div className="client_satisfaction">
            <div className="client_satisfaction_icon">
              <img src="/images/hörmət.svg" />
            </div>
            <div className="client_satisfaction_text">
              <h6>Kreativ yanaşma</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                laoreet commodo non magna ullamcorper tincidunt augue. Viverra
                porttitor arcu sed quisque.
              </p>
            </div>
          </div>
          <div className="creativity">
            <div className="creativity_icon">
              <img src="/images/məmnuniyyət.svg" />
            </div>
            <div className="creativity_text">
              <h6>Müştəri məmnuniyyəti</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                laoreet commodo non magna ullamcorper tincidunt augue. Viverra
                porttitor arcu sed quisque.
              </p>
            </div>
          </div>
          <div className="young_people">
            <div className="young_people_icon">
              <img src="/images/nəticə_yönümlü.svg" />
            </div>
            <div className="young_people_text">
              <h6>Gənclər</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                laoreet commodo non magna ullamcorper tincidunt augue. Viverra
                porttitor arcu sed quisque.
              </p>
            </div>
          </div>
          <div className="best_prices">
            <div className="best_prices_icon">
              <img src="/images/manat.svg" />
            </div>
            <div className="best_prices_text">
              <h6>Ən yaxşı qiymətlər</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                laoreet commodo non magna ullamcorper tincidunt augue. Viverra
                porttitor arcu sed quisque.
              </p>
            </div>
          </div>
          <div className="many_presents">
            <div className="many_presents_icon">
              <img src="/images/gift.svg" />
            </div>
            <div className="many_presents_text">
              <h6>Çoxlu hədiyyələr</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                laoreet commodo non magna ullamcorper tincidunt augue. Viverra
                porttitor arcu sed quisque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
