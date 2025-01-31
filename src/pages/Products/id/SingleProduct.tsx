import React, {useEffect, useState} from 'react';
import {Product} from '../../../types/Product.ts';
import {useNavigate, useParams} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../../constants/axiosConfig.ts";
import {useAuth} from "../../../context/AuthContext.tsx";

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
        <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
            <div className="mb-6">
                {product.product_images.length > 0 ?
                    (
                        <Slider {...settings}>
                            {product.product_images.map((image, i) => (
                                <div key={i} className="flex justify-center items-center">
                                    <img
                                        className="w-full h-64 object-cover rounded-xl"
                                        src={image.image_url}
                                        alt={`Product Image ${i + 1}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <Slider {...settings}>
                            <img className="w-full h-64 object-cover rounded-xl" src={"/images/productPH.png"}/>
                        </Slider>)
                }
            </div>

            <div className="text-center text-xl font-bold mb-4">{product.name}</div>
            <div className="text-gray-700 mb-2">{product.info}</div>
            <div className="text-gray-700 mb-2">موجودی: {product.stock} عدد</div>
            <div className="text-green-600 text-lg font-bold">قیمت: {product.price} تومان</div>
        </div>
    );
};

export default SingleProduct;
