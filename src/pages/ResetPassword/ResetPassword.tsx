import {Link, useNavigate} from "react-router-dom";
import {AlertNotif, useAlertNotif} from "../../components/Alert";
import Home from "../../components/Home/Home.tsx";
import {Button, Input} from "@material-tailwind/react";
import React, {useState} from "react";
import {signIn} from "../Login/login.ts";
import {resetPassword} from "./resetPassword.ts";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({
        email: "",
    });
    const navigate = useNavigate();
    const {alertConfig, showNotification} = useAlertNotif();
    const handleResetPassword = () => {
        if (validateForm()) {
            resetPassword(formData, showNotification).then(() => {
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {email: ""};

        if (!formData.email.match(/^\w+@\w+$/)) {
            newErrors.email = "ایمیل نامعتبر است.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    return (
        <Home>
            <AlertNotif alertConfig={alertConfig}/>
            <div
                className="flex w-fit rounded-2xl gap-0 bg-primary h-[95%] overflow-hidden shadow-2xl shadow-gray-800">
                <div
                    className="flex-1 flex flex-col justify-center items-center bg-primaryMiddle h-full overflow-hidden px-4">
                    <p className="w-full text-center text-3xl font-IRANSansXBold text-black mb-16">بازیابی رمز ورود</p>
                    <p dir={"rtl"} className="w-[70%] text-center text-sm font-IRANSansXDemiBold text-black mb-8">
                        برای دریافت لینک بازیابی رمز عبور، ایمیل خود را وارد کنید.
                    </p>

                    <Input
                        label="ایمیل"
                        placeholder="example@gmail.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        color="blue"
                        variant={"standard"}
                        className="font-IRANSansXDemiBold"
                        error={errors.email !== ""}
                    />
                    {errors.email && (
                        <p dir={"rtl"} className="w-full text-red-500 text-sm mt-1">{errors.email}</p>
                    )}


                    {/* Sign In Button */}
                    <Button
                        onClick={handleResetPassword}
                        className="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary text-white my-8"
                    >
                        دریافت لینک بازیابی
                    </Button>

                    <Link to="/login" className="hover:underline font-IRANSansXDemiBold text-xs" dir={"rtl"}>
                        بازگشت به صفحه‌ی ورود.
                    </Link>


                </div>
            </div>
        </Home>

    );
};

export default ResetPassword;
