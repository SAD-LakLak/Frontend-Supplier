import React from 'react';
import {Product} from '../../types/Product';
import {replacePersianNumbers} from "../../utils/replacePersianNumbers.ts";
import {Button} from "@material-tailwind/react";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    console.log(product)
    return (
        <div className={"rounded-xl debug h-12 flex flex-row-reverse justify-between items-center px-4"}>
            <p className={"font-IRANSansXMedium"}>{product.name}</p>
            <p className={"font-IRANSansXDemiBold"}
               dir={"rtl"}>{replacePersianNumbers(String(product.price)) + " تومان "}</p>
            <Button disabled={true}
                    className="rounded-full w-fit bg-accent opacity-70  font-IRANSansXDemiBold">غیرفعال</Button>
        </div>
    );
};

export default ProductCard;
