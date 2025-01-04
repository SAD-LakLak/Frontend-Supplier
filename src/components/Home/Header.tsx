import * as React from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className={"flex justify-between h-24 bg-white rounded-2xl px-8"}>
            <div className={"flex flex-1 items-center gap-2 "}>
                <Link to="/login" className={" gap-2 flex items-center"}>
                    <AccountCircleOutlinedIcon fontSize={"large"} className="text-primary"/>
                    <p className={"font-IRANSansXBold text-primary"}>
                        ورود/ثبت نام
                    </p>
                </Link>
            </div>
            <Link to={"/"} className={"flex flex-1 justify-center items-center "}>
                <img src={"./images/logo.png"} className={"h-full"}/>
            </Link>
            <div className={"flex flex-1  justify-end items-center"}>
                <Link to="/shop" className={" gap-2 flex items-center"}>
                    <p className={"font-IRANSansXBold text-primary"}>
                        پرسش‌های متداول
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Header;
