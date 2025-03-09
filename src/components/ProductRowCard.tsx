import React, {useState} from 'react';
import {Product} from '../types/Product.ts';
import {replaceEnglishDigits} from "../utils/replacePersianNumbers.ts";
import {Button} from "@material-tailwind/react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {deleteProduct} from "../pages/Products/deleteProduct.ts";
import axiosInstance from "../constants/axiosConfig.ts";

interface ProductRowCardProps {
    product: Product;
    onDelete: (productId: number) => void;
    state: Boolean
}


const ProductRowCard: React.FC<ProductRowCardProps> = ({product, onDelete, state}) => {
    const navigate = useNavigate();
    const {accessToken} = useAuth();
    const [isActive, setIsActive] = useState(product.is_active);

    function handleDisableProduct() {
        axiosInstance.post("/products/update/", {
            id: product.id,
            active: !product.is_active,
        }, {headers: {Authorization: `Bearer ${accessToken}`}});
        setIsActive(!isActive)
    }

    return (
        <div
            className={`rounded-xl h-12 flex flex-row-reverse justify-between items-center px-4 py-6 border-2 flex-grow ${state ? "border-accent" : ""}`}>
            <Link className={" w-1/4 flex justify-end"} to={`/products/${product.id}`}>
                <p className=" font-IRANSansXMedium">{replaceEnglishDigits(product.name)}</p>
            </Link>
            <p className=" font-IRANSansXDemiBold w-1/6 text-left" dir="rtl">
                {replaceEnglishDigits(String(product.price)) + " تومان "}
            </p>
            <p className="font-IRANSansXDemiBold w-1/5 justify-end text-center" dir="rtl">
                {replaceEnglishDigits(String(product.stock)) + " عدد "}
            </p>

            <Button onClick={handleDisableProduct}
                    className={`rounded-full w-20 text-center bg-accent font-IRANSansXDemiBolduse ${!isActive ? "opacity-50" : ""}`}>{isActive ? "فعال" : "غیرفعال"}</Button>
            <div className={'flex items-center gap-2 justify-between'}>
                <DeleteForeverOutlinedIcon onClick={() => {
                    onDelete(product.id)
                    deleteProduct(accessToken, product.id).then(() => {
                        navigate("/products")
                    })
                }} className={"text-accent hover:cursor-pointer"} fontSize={"large"}/>
                <BorderColorOutlinedIcon className={"text-primary hover:cursor-pointer"} fontSize={"medium"}/>
            </div>
        </div>
    );
};

export default ProductRowCard;
