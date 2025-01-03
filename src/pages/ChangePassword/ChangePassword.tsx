import {Link, useLocation, useNavigate} from "react-router-dom";
import {AlertNotif, useAlertNotif} from "../../components/Alert";
import Home from "../../components/Home/Home.tsx";
import {Button, Input} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {changePass} from "./changePassword.ts";

const ResetPassword = () => {
    const {alertConfig, showNotification} = useAlertNotif();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    useEffect(() => {
        if (!token) {
            navigate('/resetPassword');
        }
    }, [token, navigate]);


    const [formData, setFormData] = useState({
        password: "",
        password2: "",
        showPassword: false,
    });
    const [errors, setErrors] = useState({
        password: "",
        password2: ""
    });

    const togglePasswordVisibility = () => {
        setFormData({...formData, showPassword: !formData.showPassword});
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {...errors};

        Object.keys(formData).forEach(key => {
            if (!formData[key] && key !== "showPassword" && key !== "role") {
                newErrors[key] = `${key} is required`;
                isValid = false;
            }
        });

        if (formData.password !== formData.password2) {
            newErrors.password2 = "پسورد اول و دوم یکسان نیستند!";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleResetPassword = () => {
        if (validateForm()) {
            changePass(formData, {token}, showNotification).then(() => {
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            })
        }
    };


    return (
        <div className={"bg-primaryMiddle w-full h-screen flex justify-center items-center"}>
            <AlertNotif alertConfig={alertConfig}/>
            <div
                className=" flex w-fit px-16 rounded-2xl gap-0 bg-white h-[70%] overflow-hidden shadow-2xl shadow-gray-800 ">
                <div className="flex-1 w-fit flex flex-col justify-between items-center bg-white h-full px-4 ">
                    <Link to={"/"} className={"h-32 mt-8"}>
                        <img src={"./images/logo.png"} className={"h-full w-full"}/>
                    </Link>
                    <p className="w-full text-center text-2xl font-IRANSansXBold text-black mt-4">تعویض گذرواژه</p>
                    <div className={"flex flex-col gap-2 w-fit mx-4 "}>
                        <p dir={"rtl"} className="w-full text-center text-sm font-IRANSansXDemiBold text-black my-4">رمز
                            عبور جدید خود را وارد کنید.</p>
                        <div className="relative w-full">
                            <Input
                                label="رمز عبور"
                                placeholder="رمز عبور خود را وارد کنید"
                                type={formData.showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXDemiBold"
                                error={errors.password !== ""}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                                onClick={togglePasswordVisibility}
                            >
                                {formData.showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/>}
                            </button>
                        </div>
                        <div className={"flex justify-between items-center w-full gap-4"}>
                            {errors.password && <p className="w-full text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <Input
                            label="تکرار رمز عبور"
                            placeholder="رمز عبور خود را وارد کنید"
                            type="password"
                            value={formData.password2}
                            onChange={(e) => setFormData({...formData, password2: e.target.value})}
                            color="blue"
                            variant={"standard"}
                            className="font-IRANSansXDemiBold"
                            error={errors.password2 !== ""}
                        />
                        <div className={"flex justify-between items-center w-full gap-4"}>
                            {errors.password2 && <p className="w-full text-red-500 text-sm mt-1">{errors.password2}</p>}
                        </div>

                    </div>
                    <div className={"flex flex-col items-center w-full mb-4"}>
                        <Button
                            onClick={handleResetPassword}
                            className="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary text-white mb-8"
                        >
                            تعویض گذرواژه
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
