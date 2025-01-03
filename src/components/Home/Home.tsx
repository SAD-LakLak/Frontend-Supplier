import React from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
};

function Home({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col px-16 py-4 gap-4 bg-primaryLight h-screen justify-between relative">
            <Header/>

            {/* Banners */}
            <Slider {...settings}>
                <div>
                <img className="flex-grow h-full object-cover rounded-2xl"
                src="/images/banner1.png"
                alt="Banner 1"/>
                </div>
                <div>
                <img className="flex-grow h-full object-cover rounded-2xl"
                src="/images/banner2.png"
                alt="Banner 2"/>
                </div>
            </Slider>

            {/* محتوا وسط صفحه */}
            <div className="absolute inset-0 mt-24 mb-20 mx-16 flex justify-center items-center z-10">
                {children}
            </div>

            <Footer/>
        </div>
    );
}

export default Home;
