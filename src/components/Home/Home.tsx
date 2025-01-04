import React from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
};

function Home({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col px-16 py-4 gap-4 bg-primaryLight h-auto justify-between relative">
            <Header/>

            {/* Banners */}
            <Link to="/signUp">
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
            </Link>

            {/* Branding 101 */}
            <Link to="/signUp">
                <div>
                    <img src="/images/home-page.png" alt="Home Background"/>
                </div>
            </Link>
            {/* <div className="rtl items-end text-right bg-no-repeat bg-center h-[744px] mx-auto p-5"
            style={{backgroundImage: "url('/images/blob-bg.png')", backgroundSize: "contain",}}>
                <h1 className="rtl font-IRANSansXDemiBold text-primary">ماجرای لک لک</h1>
                <p className="rtl font-IRANSansXMedium text-onBackground">خانواده‌ی لک‌لک دور هم جمع شدند تا خوش‌آمدگویی به اعضای جدید خانواده‌های دیگر را راحت‌تر و دلنشین‌تر کنند.</p>
                <p className="rtl font-IRANSansXMedium text-onBackground">اگر کسب‌وکار شما محصولاتی یا خدماتی ارائه می‌دهد که والدین چشم به راه، مادرانی که تازه زایمان کرده‌اند، یا نوزادان به آن احتیاج دارند، مشتاق پیوستن شما به خانواده‌ی کوچکمان هستیم.</p>
                <p className="rtl font-IRANSansXMedium text-onBackground">گروه لک‌لک محصولات و خدمات شما را در بسته‌های کاربردی و جذاب دسته‌بندی می‌کند تا هم دردسر خرید برای کاربران کم شود، و هم کسب‌وکار شما به مشتریان جدید معرفی شود.</p>
                <Link to="/signUp">
                    <p className={"rtl rounded-3xl w-fit px-6 py-2 bg-primary mt-4 font-IRANSansXBold text-white"}>
                        با ما همراه شوید
                    </p>
                </Link>
            </div> */}

            {/* <div className="absolute inset-0 mt-24 mb-20 mx-16 flex justify-center items-center z-10">
                {children}
            </div> */}

            <Footer/>
        </div>
    );
}

export default Home;
