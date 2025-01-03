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
    autoplaySpeed: 4000,
};

function Home({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col px-16 py-4 gap-4 bg-primaryLight h-auto justify-between relative">
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

            {/* Branding 101 */}
            <div>
                <img src="/images/home-page.png" alt="Home Background"/>
            </div>

            {/* <div className="relative">
                <img className="absolute top-0 left-0" src="/images/blob-bg.png" alt="Home Background"/>
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col items-end">
                        <p>
                            ماجرای لک‌لک
                        </p>
                        <p>
                            خانواده‌ی لک‌لک دور هم جمع شدند تا خوش‌آمد‌گویی به اعضای جدید خانواد‌ه‌های دیگر را ‌راحت‌تر و دلنشین‌تر کنند.
                        </p>
                        <p>
                            اگر کسب‌وکار شما محصولات یا خدماتی ارائه می‌دهد که والدین چشم به راه، مادرانی که تازه زایمان کرده‌اند، یا نوزادان به آن احتیاج دارند، مشتاق پیوستن شما به خانواده‌ی کوچکمان هستیم.
                        </p>
                        <p>
                            گروه لک‌لک محصولات و خدمات شما را در بسته‌های کاربردی و جذاب دسته‌بندی می‌کند تا هم دردسر خرید برای کاربران کم شود، و هم کسب‌وکار شما به مشتریان جدید معرفی شود.
                        </p>
                    </div>
                </div>
            </div> */}

            {/* <div className="absolute inset-0 mt-24 mb-20 mx-16 flex justify-center items-center z-10">
                {children}
            </div> */}

            <Footer/>
        </div>
    );
}

export default Home;
