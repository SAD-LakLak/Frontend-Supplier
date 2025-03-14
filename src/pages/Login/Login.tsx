import React, {useState} from "react";
import {Button, Input} from "@material-tailwind/react";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {signIn} from "./login.ts";
import {AlertNotif, useAlertNotif} from "../../components/Alert.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate()
    const {isAuthenticated,login} = useAuth()
    if (isAuthenticated){
        navigate("/dashboard")
    }
    const handleSignIn = async () => {
        if (validateForm()) {
            const result = await signIn(formData)
            if (result.success) {
                setTimeout(() => {
                    navigate("/dashboard")
                    login({accessToken: result?.data.access, refreshToken: result?.data.refresh})
                }, 1000)
            }
            showNotification(result.config)
        }
    };

    // Custom validation rules
    const validateForm = () => {
        let isValid = true;
        const newErrors = {username: "", password: ""};

        // Username validation
        if (!formData.username.match(/^\w{4,12}$/)) {
            newErrors.username = "نام کاربری معتبر نیست.";
            isValid = false;
        }

        // Password validation
        if (formData.password.length < 8) {
            newErrors.password = "رمز عبور باید حداقل 8 کاراکتر باشد.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {alertConfig, showNotification} = useAlertNotif();

    return (
        <div className={"flex justify-center items-center w-full h-screen bg-primaryLight"}>
            <AlertNotif alertConfig={alertConfig}/>
            <div
                className="flex w-[50%] rounded-2xl gap-0 bg-primary h-[75%] overflow-hidden shadow-2xl shadow-gray-800">
                <div
                    className="flex-1 flex  flex-col justify-center items-center bg-primaryMiddle h-full overflow-hidden px-4">
                    <p className="w-full text-center text-3xl font-IRANSansXBold text-black mb-8">ورود</p>

                    {/* Username Field */}
                    <>
                        <div className="w-full">
                            <Input
                                label="نام کاربری"
                                placeholder="09193726908"
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                color="orange"
                                variant={"standard"}
                                className="font-IRANSansXDemiBold"
                                error={errors.username !== ""}
                            />
                        </div>
                        {errors.username && (
                            <p dir={"rtl"} className="w-full text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </>

                    {/* Password Field */}
                    <>
                        <div className="relative w-full mt-4">
                            <div className={"flex items-center"}>
                                <Input
                                    label="رمز عبور"
                                    placeholder="رمز عبور خود را وارد کنید"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    color="orange"
                                    variant={"standard"}
                                    className="font-IRANSansXDemiBold"
                                    error={errors.password !== ""}
                                />
                                <button
                                    type="button"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <VisibilityOutlinedIcon/>
                                    ) : (
                                        <VisibilityOffOutlinedIcon/>
                                    )}
                                </button>
                            </div>
                        </div>
                        {errors.password && (
                            <p dir={"rtl"} className=" mb-4 w-full text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </>


                    {/* Sign In Button */}
                    <Button
                        onClick={handleSignIn}
                        className="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary text-white mt-4"
                    >
                        ورود
                    </Button>

                    {/* Forgot Password Link */}
                    <p className="font-IRANSansXDemiBold w-full text-center mt-6 hover:cursor-pointer" dir="rtl">
                        <Link to="/resetPassword" className="hover:underline">
                            رمز عبور خود را فراموش کرده‌ام.
                        </Link>
                    </p>

                    {/* Sign Up Link */}
                    <p className="font-IRANSansXDemiBold w-full text-center mt-16" dir="rtl">
                        حساب کاربری ندارید؟{" "}
                        <Link to="/signUp" className="hover:underline">
                            ثبت نام کنید.
                        </Link>
                    </p>

                </div>
                <img className="flex-1 h-full  -z-0 object-cover hidden lg:block" src="/images/form.png"
                     alt="Background"/>
            </div>
        </div>
    );
}

export default Login;
