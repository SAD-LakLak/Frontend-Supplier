import React, {useEffect, useState} from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import {Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";


function Dashboard() {
    const {accessToken,logout} = useAuth();
    const [userData, setUserData] = useState({
        username: "",
        phone_number: "",
        national_code: "",
        birth_date: "",
    });

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        axiosInstance.get("/user/", {headers})
            .then((result) => {
                console.log(result.data)
                setUserData({
                    username: result.data.username,
                    phone_number: result.data.phone_number,
                    national_code: result.data.national_code,
                    birth_date: result.data.birth_date,
                });
            })
            .catch(() => {
                setUserData({
                    username: "",
                    phone_number: "",
                    national_code: "",
                    birth_date: "",
                });
                console.error("Error fetching user data");
            });
    }, [accessToken]);
    const navigate = useNavigate()

    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            {/*right part*/}
            <DashboardMenu/>
            {/*left part*/}
            <div className={"flex w-4/5 flex-col gap-4 rounded-2xl"}>
                {/*top part*/}
                <div className={"flex w-full flex-col gap-8 rounded-2xl bg-white p-8 items-end"}>
                    <p className={"w-full font-IRANSansXBold text-3xl "} dir={"rtl"}>اطلاعات حساب کاربری</p>
                    <div className={"flex w-full justify-end gap-8"}>
                        <div className={"flex flex-col w-[30%]"}>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between rounded-t-md px-4 py-4 border-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>نام کاربری</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData ? userData.username : "در حال بارگذاری..."}
                                </p>
                            </div>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between px-4 py-4 border-x-2 border-b-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>شماره تماس</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData ? userData.phone_number : "در حال بارگذاری..."}
                                </p>
                            </div>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between px-4 py-4 border-x-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>کد ملی</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData ? userData.national_code : "در حال بارگذاری..."}
                                </p>
                            </div>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between rounded-b-md px-4 py-4 border-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>تاریخ تولد</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData && userData.birth_date ? userData.birth_date : "ثبت نشده"}
                                </p>
                            </div>
                        </div>
                        <div className={"flex flex-col py-3 w-[20%] items-center justify-between"}>
                            <Button disabled={true} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">به‌روزرسانی
                                اطلاعات</Button>
                            <Button onClick={() => {
                                navigate("/resetPassword")
                            }} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">تغییر رمز عبور</Button>
                            <Button disabled={true} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">تایید
                                شماره تماس</Button>
                            <Button onClick={logout}
                                    className="rounded-full w-full bg-white border-2 text-primary border-primary font-IRANSansXDemiBold hover:bg-primary hover:text-white">خروج
                                از حساب کاربری</Button>
                        </div>
                    </div>
                </div>
                {/*down part*/}
                <div className={"flex w-full h-2/5 flex-col gap-4 rounded-2xl bg-white"}></div>
            </div>
        </div>
    );

}

export default Dashboard;
