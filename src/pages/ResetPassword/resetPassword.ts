import {NotifConfig} from "../../components/Alert.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import qs from "qs";

interface IResetPasswordBody {
    email: string;
}


export const resetPassword = async (signInData: IResetPasswordBody, showNotification: (config: NotifConfig) => void,) => {
    const body = signInData;
    const notifConfig: NotifConfig = {
        timeout: 1500, notifType: "success", text: "ورود با موفقیت انجام شد!", show: true
    };

    axiosInstance
        .post(
            "/reset_password/",
            qs.stringify({email: body.email}),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((res) => {
            notifConfig.notifType = "success";
            notifConfig.text = "لینک بازیابی رمز عبور با موفقیت ارسال شد!";
            console.log("res.data:\n");
            console.log(res.data);
        })
        .catch((err) => {
            notifConfig.notifType = "error";
            notifConfig.text = err.response?.data?.detail || "مشکلی پیش آمده است.";
        })
        .finally(() => {
            showNotification(notifConfig);
        });
};
