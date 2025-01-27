import React, {useEffect, useState} from 'react';
import {Product} from '../../types/Product';
import {useParams} from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../constants/axiosConfig.ts";

const SingleProduct = () => {
    const {id} = useParams(); // دریافت id از URL
    const [product, setProduct] = useState<Product | null>(null); // حالت برای نگهداری اطلاعات محصول

    const fetchProduct = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/products/`);
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
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (!product) {
        return <div className="text-center mt-10 text-gray-600">محصولی یافت نشد!</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
            {/* اسلایدشو تصاویر */}
            <div className="mb-6">
                {product.product_images.length > 0 ? (
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
                    <p className="text-center text-gray-500">تصویری برای این محصول موجود نیست.</p>
                )}
            </div>

            {/* اطلاعات محصول */}
            <div className="text-center text-xl font-bold mb-4">{product.name}</div>
            <div className="text-gray-700 mb-2">{product.info}</div>
            <div className="text-gray-700 mb-2">موجودی: {product.stock} عدد</div>
            <div className="text-green-600 text-lg font-bold">قیمت: {product.price} تومان</div>
        </div>
    );
};

export default SingleProduct;
