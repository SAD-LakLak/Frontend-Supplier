import React from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

function Home({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col px-16 py-4 gap-4 bg-primaryLight h-screen justify-between relative">
            <Header/>

            {/* تصویر زمینه */}
            <img
                className="flex-grow h-full object-cover rounded-2xl"
                src="/images/commingsoon.png"
                alt="Coming Soon"
            />

            {/* محتوا وسط صفحه */}
            <div className="absolute inset-0 mt-24 mb-20 mx-16 flex justify-center items-center z-10">
                {children}
            </div>

            <Footer/>
        </div>
    );
}

export default Home;
