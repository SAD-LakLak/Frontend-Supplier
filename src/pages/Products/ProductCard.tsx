import React from 'react';
import {Product} from '../../types/Product';
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import {Button} from "@material-tailwind/react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    return (
        // TODO: Add Edit/Delete Post Page
        <div
            className={"rounded-xl h-12 flex flex-row-reverse justify-between items-center px-4 py-6 border-2"}>
            <p className={"font-IRANSansXMedium"}>{product.name}</p>
            <p className={"font-IRANSansXDemiBold w-1/5 text-left"}
               dir={"rtl"}>{replaceEnglishDigits(String(product.price)) + " تومان "}</p>
            <p className={"font-IRANSansXDemiBold w-1/6 justify-end text-left"}
               dir={"rtl"}>{replaceEnglishDigits(String(product.stock)) + " عدد "}</p>
            <Button disabled={true}
                    className="rounded-full w-fit bg-accent opacity-70  font-IRANSansXDemiBold">غیرفعال</Button>
            <div className={'flex items-center gap-2 justify-between'}>
                <DeleteForeverOutlinedIcon className={"text-accent hover:cursor-pointer"} fontSize={"large"}/>
                <BorderColorOutlinedIcon className={"text-primary hover:cursor-pointer"} fontSize={"medium"}/>
            </div>
        </div>
    );
};

export default ProductCard;
