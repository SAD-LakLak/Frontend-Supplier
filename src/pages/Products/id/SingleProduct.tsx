import React, {useEffect, useState} from 'react';
import {Product} from '../../../types/Product.ts';
import {useNavigate, useParams} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../../constants/axiosConfig.ts";
import {useAuth} from "../../../context/AuthContext.tsx";
import {replaceEnglishDigits} from "../../../utils/replacePersianNumbers.ts";
import {formatPrice} from "../../../utils/formatePrice.ts";

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const auth = useAuth();

    const fetchProduct = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/products/`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });
            const products = response.data.results;
            const selectedProduct = products.find((product: Product) => product.id === Number(id));
            if (selectedProduct) {
                setProduct(selectedProduct);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct(Number(id));
        }
    }, [id]);

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 3000,
    };


    if (!product) {
        return <div className="text-center mt-10 text-gray-600" dir={"rtl"}>محصولی یافت نشد!</div>;
    }

    return (
        <div className={"bg-primaryMiddle w-full h-screen flex justify-center items-center"}>
            <div className="w-1/2 h-2/3 flex mx-auto p-4 gap-2 justify-between pt-8 rounded-xl shadow-lg bg-primary">
                <div className="w-1/2 h-full">
                    {product.product_images.length > 0 ?
                        (
                            <Slider {...settings}>
                                {product.product_images.map((image, i) => (
                                    <div key={i} className="flex justify-center items-center">
                                        <img
                                            className="w-full h-96 object-cover rounded-xl"
                                            src={image.image_url}
                                            alt={`Product Image ${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <Slider {...settings}>
                                <img className="w-full h-96 object-cover rounded-xl" src={"/images/productPH.png"}/>
                            </Slider>)
                    }
                </div>

                <div className={"flex w-1/2 flex-col mx-4 mb-12 bg-white rounded-2xl grow justify-between py-4 gap-4"}>
                    <div className={"flex justify-between items-center font-IRANSansXMedium px-4 py-2 "}>
                        <p className={"text-onBackground h-full"}>{product.name}</p>
                        <p className={"text-primary"}>نام محصول</p>
                    </div>
                    <div className={"bg-onBackground opacity-10 w-full h-0.5"}></div>
                    <div
                        className={"flex justify-between gap-4 items-center font-IRANSansXMedium px-4 py-2 "}>
                        <p className={"text-onBackground text-xs text-right"} dir={"rtl"}>{product.info}</p>
                        <p className={"text-primary"}>توضیحات</p>
                    </div>
                    <div className={"bg-onBackground opacity-10 w-full h-0.5"}></div>
                    <div
                        className={"flex justify-between gap-4 items-center font-IRANSansXMedium px-4 py-2 "}>
                        <p className={"text-onBackground text-right"}
                           dir={"rtl"}>{formatPrice(product.price) + " تومان"}</p>
                        <p className={"text-primary"}>قیمت</p>
                    </div>
                    <div className={"bg-onBackground opacity-10 w-full h-0.5"}></div>
                    <div
                        className={"flex justify-between gap-4 items-center font-IRANSansXMedium px-4 py-2"}>
                        <p className={"text-onBackground text-right"}
                           dir={"rtl"}>{formatPrice(product.stock) + " عدد"}</p>
                        <p className={"text-primary"}>موجودی</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
