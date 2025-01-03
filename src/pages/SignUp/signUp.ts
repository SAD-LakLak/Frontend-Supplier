import axiosInstance from "../../constants/axiosConfig.ts";
import {NotifConfig} from "../../components/Alert.tsx";

interface ISignUpBody {
    phone_number: string;
    first_name: string;
    email: string;
    username: string;
    national_code: string;
    password: string;
    password2: string;
    role: string;
}

export const signUp = async (
    signUpData: ISignUpBody,
    showNotification: (config: NotifConfig) => void
) => {
    const body = signUpData;
    const notifConfig: NotifConfig = {
        timeout: 1500, notifType: "success", text: "ثبت‌نام با موفقیت انجام شد!", show: true
    };

    axiosInstance
        .post("/register/", body)
        .then(() => {
            notifConfig.notifType = "success";
            notifConfig.text = "ثبت‌نام با موفقیت انجام شد!";
        })
        .catch((err) => {
            notifConfig.notifType = "error";
            notifConfig.text = err.response?.data?.detail || "مشکلی پیش آمده است.";
        })
        .finally(() => {
            showNotification(notifConfig);
        });
};
