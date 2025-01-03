import axiosInstance from "../../constants/axiosConfig.ts";
import {NotifConfig} from "../../components/Alert.tsx";

interface ISignInBody {
    username: string;
    password: string;
}

export const signIn = async (
    signInData: ISignInBody
) => {
    const body = signInData;
    const notifConfig: NotifConfig = {
        timeout: 1500, notifType: "success", text: "ورود با موفقیت انجام شد!", show: true
    };
    try {
        const res = await axiosInstance.post("/api/token/", body);
        notifConfig.notifType = "success";
        notifConfig.text = "ورود با موفقیت انجام شد!";
        return {success: true, data: res.data, config: notifConfig};
    } catch (e) {
        console.log(e.message);
        notifConfig.notifType = "error";
        notifConfig.text = "مشکلی پیش آمده است.";
        return {success: false, error: e, config: notifConfig};
    }
};
