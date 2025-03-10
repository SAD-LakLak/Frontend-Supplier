import axiosInstance from "../../constants/axiosConfig.ts";

export function deleteProduct(accessToken, productId) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }
    return axiosInstance.delete(`/products/delete/${productId}/`, {headers})
}