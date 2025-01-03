import axiosInstance from "../../constants/axiosConfig";
import {useNavigate} from "react-router-dom";
import {NotifConfig} from "../../components/Alert";

interface IPassRecoveryBody {
    password: string;
    password2: string;
}

interface IPassRecoveryHeader {
    token: string;
}

export const changePass = async (
    recoveryData: IPassRecoveryBody,
    recoveryHeader: IPassRecoveryHeader,
    showNotification: (config: NotifConfig) => void
) => {
    const body = recoveryData;
    const {token} = recoveryHeader;
    const notifConfig: NotifConfig = {
        text: "",
        notifType: "error",
        timeout: 1000,
        show: true
    }
    try {
        await axiosInstance.post(`/reset_password/${token}`, body);
        notifConfig.notifType = "success";
        notifConfig.text = "رمز عبور با موفقیت تغییر کرد!";
    } catch (err) {
        notifConfig.notifType = "error";
        notifConfig.text = err.response?.data?.detail || "مشکلی پیش آمده است.";
    } finally {
        showNotification(notifConfig);
    }
};
