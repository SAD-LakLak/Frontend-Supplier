import React from 'react';
import {Product} from '../types/Product.ts';
import {replaceEnglishDigits} from "../utils/replacePersianNumbers.ts";
import {Button} from "@material-tailwind/react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {deleteProduct} from "../pages/Products/deleteProduct.ts";

interface ProductRowCardProps {
    product: Product;
}

const ProductRowCard: React.FC<ProductRowCardProps> = ({product}) => {
    const {accessToken} = useAuth()
    const navigate = useNavigate();
    return (
        // TODO: Add Edit/Delete Post Page
        <div
            className={"rounded-xl h-12 flex flex-row-reverse justify-between items-center px-4 py-6 border-2"}>
            <Link className={" w-1/4 flex justify-end"} to={`/products/${product.id}`}>
                <p className=" font-IRANSansXMedium">{product.name}</p>
            </Link>
            <p className=" font-IRANSansXDemiBold w-1/6 text-left" dir="rtl">
                {replaceEnglishDigits(String(product.price)) + " تومان "}
            </p>
            <p className="font-IRANSansXDemiBold w-1/5 justify-end text-center" dir="rtl">
                {replaceEnglishDigits(String(product.stock)) + " عدد "}
            </p>

            <Button disabled={!product.is_active}
                    className={`rounded-full w-fit bg-accent  font-IRANSansXDemiBolduse`}>{product.is_active ? "فعال" : "غیرفعال"}</Button>
            <div className={'flex items-center gap-2 justify-between'}>
                <DeleteForeverOutlinedIcon onClick={() => {
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
