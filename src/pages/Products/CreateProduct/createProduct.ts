import axiosInstance from "../../../constants/axiosConfig.ts";
import {NotifConfig} from "../../../components/Alert.tsx";

interface ICreateProdBody {
    type: string,
        // "clothing" | "service" | "sanitary" | "entertainment" | "food" | "other"
    name: string,
    description: string,
    price: string,
    stock: string,
}

export const createProduct = async (
    createProdData: ICreateProdBody,
    showNotification: (config: NotifConfig) => void,
    accessToken: string
) => {
    const body = createProdData;
    const notifConfig: NotifConfig = {
        timeout: 1500, notifType: "success", text: "محصول با موفقیت ایجاد شد!", show: true
    };

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    axiosInstance
        .post("/products/register/", body, {headers})
        .then(() => {
            notifConfig.notifType = "success";
            notifConfig.text = "محصول با موفقیت ایجاد شد!";
        })
        .catch((err) => {
            notifConfig.notifType = "error";
            notifConfig.text = err.response?.data?.detail || "مشکلی پیش آمده است.";
        })
        .finally(() => {
            showNotification(notifConfig);
        });
};
