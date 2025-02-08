import React from "react";
import {Button} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";

function DashboardMenu() {

    const navigate = useNavigate()

    return (
        <div className={"flex w-1/4 flex-col gap-4 rounded-2xl bg-white items-center justify-between"}>
            <Link className={"hover:cursor-pointer w-1/2 mt-4"} to={"/"}>
                <img src={"/images/logo.png"} alt="logo"/>
            </Link>
            <div className={"flex flex-col gap-4 w-full items-center mb-16"}>
                <Button onClick={() => {
                    navigate("/dashboard")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">حساب کاربری</Button>
                <Button onClick={() => {
                    navigate("/products")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">محصولات</Button>
                <Button onClick={() => {
                    navigate("/products/createProduct")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">ایجاد محصول</Button>
                <Button onClick={() => {
                    navigate("/orders")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">سفارشات</Button>
                <Button disabled={true} onClick={() => {
                    navigate("/contact")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">پشتیبانی</Button>
            </div>
            <p className={"font-IRANSansXDemiBold text-xs mb-4"}>© LakLak 2024</p>
        </div>

    );
}

export default DashboardMenu;
