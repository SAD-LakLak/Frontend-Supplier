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
import {formatPrice} from "../utils/formatePrice.ts";

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
            className={`rounded-xl w-full h-12 flex justify-between items-center px-4 py-6 gap-8 border-2 ${state ? "border-accent" : ""}`}>
            <Link className={" w-1/2 flex justify-start"} to={`/products/${product.id}`}>
                <p className=" font-IRANSansXMedium">{replaceEnglishDigits(product.name)}</p>
            </Link>
            <p className="w-1/6 text-left">
                {formatPrice(String(product.price)) + " تومان "}
            </p>
            <p className="w-1/5 justify-start text-center">
                {formatPrice(String(product.stock)) + " عدد "}
            </p>

            <Button onClick={handleDisableProduct}
                    className={`rounded-full w-16 flex justify-center text-center bg-accent font-IRANSansXMedium ${!isActive ? "opacity-40" : ""}`}>{isActive ? "فعال" : "غیرفعال"}</Button>
            <div className={'flex items-center gap-2 justify-between'}>
                <BorderColorOutlinedIcon className={"text-primary hover:cursor-pointer"} fontSize={"medium"}/>
                <DeleteForeverOutlinedIcon onClick={() => {
                    onDelete(product.id)
                    deleteProduct(accessToken, product.id).then(() => {
                        navigate("/products")
                    })
                }} className={"text-accent hover:cursor-pointer"} fontSize={"large"}/>
            </div>
        </div>
    );
};

export default ProductRowCard;
