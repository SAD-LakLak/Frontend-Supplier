import React, {useState} from "react";
import Home from "../../components/Home/Home.tsx";
import {Button, Input} from "@material-tailwind/react";
import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {signUp} from "./signUp.ts";
import {AlertNotif, useAlertNotif} from "../../components/Alert.tsx";
import {Link, useNavigate} from "react-router-dom";
import {replacePersianNumbers} from "../../utils/replacePersianNumbers";
import {nationCodeValidator} from "../../utils/nationalCodeValidator";

function SignUp() {
    const [formData, setFormData] = useState({
        first_name: "",
        phone_number: "",
        email: "",
        username: "",
        national_code: "",
        password: "",
        password2: "",
        showPassword: false,
        role: "customer"
    });

    const [errors, setErrors] = useState({
        first_name: "",
        phone_number: "",
        email: "",
        username: "",
        national_code: "",
        password: "",
        password2: ""
    });

    const {alertConfig, showNotification} = useAlertNotif();
    const navigate = useNavigate();

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

        if (!formData.phone_number.match(/^\d{11}$/)) {
            newErrors.phone_number = "شماره تماس نامعتبر";
            isValid = false;
        }

        if (!nationCodeValidator(formData.national_code)) {
            newErrors.national_code = "کد ملی نامعتبر است";
            isValid = false;
        }


        if (!formData.email.match(/^\w+@\w+$/)) {
            newErrors.email = "ایمیل نامعتبر است";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSignUp = () => {
        if (validateForm()) {
            formData.phone_number = replacePersianNumbers(formData.phone_number);
            formData.national_code = replacePersianNumbers(formData.national_code);
            formData.role = "customer";

            signUp(formData, showNotification).then(() => {
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            });
        }
    };

    return (
        <Home>
            <AlertNotif alertConfig={alertConfig}/>
            <div
                className="flex w-fit  rounded-2xl gap-0 bg-primary h-[95%] overflow-hidden shadow-2xl shadow-gray-800">
                <img className="flex-1 h-full object-cover hidden lg:block" src="/images/form.png"
                     alt="Background"/>
                <div className="flex-1 w-[50%] flex flex-col justify-between items-center bg-primaryMiddle h-full px-4">
                    <p className="w-full text-center text-2xl font-IRANSansXBold text-black mt-4">ثبت‌نام</p>
                    <div className={"flex flex-col gap-2 w-fit mx-4 "}>
                        <div className={"flex justify-between items-center w-full gap-4"}>
                            <Input
                                label="نام و نام خانوادگی"
                                placeholder="نام کامل خود را وارد کنید"
                                type="text"
                                value={formData.first_name}
                                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXDemiBold "
                                error={errors.first_name !== ""}
                            />
                            <Input
                                label="شماره تماس"
                                placeholder="09193726908"
                                type="tel"
                                value={formData.phone_number}
                                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXDemiBold "
                                error={errors.phone_number !== ""}
                            />
                        </div>

                        <div className={"flex justify-between items-center w-full gap-4"}>
                            {errors.first_name &&
                                <p className="w-full text-red-500 text-sm mt-1">{errors.first_name}</p>}
                            {errors.phone_number &&
                                <p className="w-full text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                        </div>

                        <div className={"flex justify-between items-center w-full gap-4"}>
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
                            <Input
                                label="نام کاربری"
                                placeholder="example1234"
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXDemiBold"
                                error={errors.username !== ""}
                            />
                        </div>

                        <div className={"flex justify-between items-center w-full gap-4"}>
                            {errors.email && <p className="w-full text-red-500 text-sm">{errors.email}</p>}
                            {errors.username && <p className="w-full text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        <div className={"flex flex-col justify-between items-center w-full gap-4"}>
                            <Input
                                label="کد ملی"
                                placeholder="4409185731"
                                type="tel"
                                value={formData.national_code}
                                onChange={(e) => setFormData({...formData, national_code: e.target.value})}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXDemiBold "
                                error={errors.national_code !== ""}
                            />
                            {errors.national_code &&
                                <p className="w-full text-red-500 text-sm">{errors.national_code}</p>}
                        </div>

                        <div className={"flex justify-between items-center w-full"}>
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
                        </div>
                        <div className={"flex justify-between items-center w-full gap-4"}>
                            {errors.password && <p className="w-full text-red-500 text-sm mt-1">{errors.password}</p>}
                            {errors.password2 && <p className="w-full text-red-500 text-sm mt-1">{errors.password2}</p>}
                        </div>

                    </div>
                    <div className={"flex flex-col items-center w-full mb-4"}>
                        <Button
                            onClick={handleSignUp}
                            className="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary text-white mb-2"
                        >
                            ثبت‌نام
                        </Button>
                        <p className="font-IRANSansXDemiBold w-full text-center mt-2" dir="rtl">
                            حساب کاربری دارید؟
                            <Link to="/login" className="hover:underline">وارد شوید.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Home>
    );
}

export default SignUp;
