import React from "react";
import {Button} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";

function DashboardMenu() {

    const navigate = useNavigate()

    return (
        <div className={"flex w-1/5 flex-col gap-4 rounded-2xl bg-white items-center justify-between"}>
            <img src={"/images/logo.png"} alt="logo" className={"w-1/2 mb-4 mt-8"}/>
            <div className={"flex flex-col gap-4 w-full h-full items-center justify-top mb-16"}>
                <Button onClick={() => {
                    navigate("/dashboard")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">حساب کاربری</Button>
                <Button onClick={() => {
                    navigate("/products")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">محصولات</Button>
                {/* <Button disabled={true} onClick={() => {
                    navigate("/orders")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">سفارشات</Button> */}
                <Button onClick={() => {
                    navigate("/tickets")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">پشتیبانی</Button>
            </div>
            <p className={"font-IRANSansXDemiBold text-xs mb-4"} dir={"ltr"}>© LakLak 2024</p>
        </div>

    );
}

export default DashboardMenu;
