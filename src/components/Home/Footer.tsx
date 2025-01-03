import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className={"flex flex-col justify-center items-center h-auto bg-white rounded-2xl px-8 py-4"}>
            <div className={"flex flex-row justify-center items-center h-auto"}>
                <div>
                    <img src={"./images/logo.png"} style={{ width: "136px", height: "121px" }}/>
                </div>
                <div className={"flex flex-col items-end h-auto px-16"}>
                    <Link to="/blog">
                        <p className={"font-IRANSansXBold text-onBackground"}>
                            بلاگ
                        </p>
                    </Link>
                    <Link to="/">
                        <p className={"font-IRANSansXBold text-onBackground"}>
                            فروشگاه لک‌لک
                        </p>
                    </Link>
                </div>
                <div className={"flex flex-col items-end h-auto px-16"}>
                    <Link to="/faq">
                        <p className={"font-IRANSansXBold text-onBackground"}>
                            پرسش‌های متداول
                        </p>
                    </Link>
                    <Link to="/privacy-policy">
                        <p className={"font-IRANSansXBold text-onBackground"}>
                            قوانین و مقررات
                        </p>
                    </Link>
                </div>
                <div className={"flex flex-col items-end h-auto px-16"}>
                    <Link to="/about-us">
                        <p className={"font-IRANSansXBold text-onBackground"}>
                            درباره‌ی ما
                        </p>
                    </Link>
                    <Link to="/contact-us">
                        <p className={"font-IRANSansXBold text-onBackground"}>
                            تماس با ما
                        </p>
                    </Link>
                </div>
            </div>
            <p dir={"rtl"} className={"font-IRANSansXMedium text-sm size-14px text-onBackground"}>
                کلیه‌ی حقوق این وب‌سایت متعلق به گروه لک‌لک است.
            </p>
        </div>
    );
}

export default Footer;
