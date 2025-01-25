import React, {useEffect, useState} from "react";
import {Button, Textarea, Input} from "@material-tailwind/react";
import {createProduct} from "./createProduct.ts";
import {AlertNotif, useAlertNotif} from "../../../components/Alert.tsx";
import {Link, useNavigate} from "react-router-dom";
import {replacePersianNumbers} from "../../../utils/replacePersianNumbers";
import DashboardMenu from "../../../components/DashboardMenu.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";
import axiosInstance from "../../../constants/axiosConfig.ts";


function CreateProduct() {
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const [errors, setErrors] = useState({
        description: "",
        price: "",
        stock: "",
        images: "",
        hasAccepted: "",
    });

    const [images, setImages] = useState<(File | string)[]>([
        "../../../public/images/placeholder.svg",
        "../../../public/images/placeholder.svg",
        "../../../public/images/placeholder.svg",
        "../../../public/images/placeholder.svg",
    ]);

    const {alertConfig, showNotification} = useAlertNotif();
    const navigate = useNavigate();
    const [hasAccepted, setHasAccepted] = useState<boolean>(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const newErrors = {...errors};
        if (files) {
            const newImages = Array.from(files);
            const validImages: File[] = [];

            for (const file of newImages) {
                if (file.size > 2 * 1024 * 1024) {
                    newErrors.images = "سایز تصاویر بیشتر از حد مجاز"
                    setErrors(newErrors);
                } else {
                    validImages.push(file);
                }
            }

            if (validImages.length > 0) {
                setImages((prev) => {
                    const updatedImages = [...prev];

                    for (const image of validImages) {
                        const placeholderIndex = updatedImages.findIndex(
                            (img) => typeof img === "string"
                        );
                        if (placeholderIndex !== -1) {
                            updatedImages[placeholderIndex] = image;
                        }
                    }

                    return updatedImages;
                });
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => {
            const updatedImages = [...prev];
            updatedImages[index] = "../../../public/images/placeholder.svg";
            return updatedImages;
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {...errors};

        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = `${key} is required`;
                isValid = false;
            }
        });

        if (+formData.price <= 0) {
            newErrors.price = "قیمت نامعتبر";
            isValid = false;
        }

        if (+formData.stock <= 0) {
            newErrors.stock = "موجودی نامعتبر";
            isValid = false;
        }

        if ((formData.description).length < 20) {
            newErrors.description = "توضیحات باید بیش از ۲۰ کاراکتر باشند";
            isValid = false;
        }

        if(!hasAccepted){
            newErrors.hasAccepted = "تایید شرط اجباری است";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreate = () => {
        if (validateForm()) {
            formData.price = replacePersianNumbers(formData.price);
            formData.stock = replacePersianNumbers(formData.stock);

            createProduct(formData, showNotification).then(() => {
                setTimeout(() => {
                    navigate("/products");
                }, 1000);
            });
        }
    };

    return (
        <div className={"bg-primaryLight min-h-screens h-fit w-fit py-8 px-16 flex gap-8"}>
            <AlertNotif alertConfig={alertConfig}/>
            {/*left div*/}
            <div className={"flex w-full flex-col gap-8 rounded-2xl bg-white p-8 items-center"}>
                <div className={"flex justify-between gap-16"}> {/* top div */}
                    <div className={"flex flex-col gap-16 items-end"}> {/* left div */}
                        <div className={"w-full flex justify-between gap-4"}> {/* images */}
                            {/* left div */}
                            <div className="w-3/5 flex flex-col gap-4">
                                <div className="w-full flex justify-between gap-4">
                                    {images.slice(0, 2).map((image, index) => (
                                        <div key={index} className="w-1/2 relative">
                                            <img
                                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-32 object-contain"
                                            />
                                            {typeof image !== "string" && (
                                                <button
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-2 right-2 bg-primary opacity-75 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    &times;
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full flex justify-between gap-4">
                                    {images.slice(2, 4).map((image, index) => (
                                        <div key={index + 2} className="w-1/2 relative">
                                            <img
                                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                                alt={`Image ${index + 3}`}
                                                className="w-full h-32 object-contain"
                                            />
                                            {typeof image !== "string" && (
                                                <button
                                                    onClick={() => handleRemoveImage(index + 2)}
                                                    className="absolute top-2 right-2 bg-primary opacity-75 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    &times;
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* right div */}
                            <div className={"flex flex-col gap-4 items-end"}> 
                                <p className={"w-full font-IRANSansXDemiBold text-3xl mb-8 text-onBackground"} dir={"rtl"}>تصاویر محصول</p>   
                                <p className={"w-[300px] font-IRANSansXRegular text-wrap text-l mb-4 text-onBackground"} dir={"rtl"}>
                                تا ۵ تصویر از محصول خود آپلود کنید. حداکثر سایز مجاز برای هر تصویر ۲ مگابایت است. استفاده از تصاویری که متعلق به شما نباشند غیرمجاز است و موجب غیرفعال شدن محصول خواهد شد.
                                </p>   
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    disabled={images.filter((img) => typeof img !== "string").length >= 4}
                                    className="mb-4"
                                />
                            </div>
                        </div>
                        <div className={"w-full inline-flex items-top gap-4"}> {/* checkbox */}
                            <p className={"w-full font-IRANSansXRegular text-wrap text-sm mb-4 text-onBackground opacity-90"} dir={"rtl"}>
                            تأیید می‌کنم که این محصول مطابق
                            <span className="inline-block px-1">
                                <Link to="/privacyPolicy" className="hover:text-primary underline">قوانین و مقررات لک‌لک</Link>
                            </span>
                            است و اطلاعات واردشده شامل هیچ‌گونه محتوای غیرقانونی، غیراخلاقی، یا ناقض حقوق دیگران نیستند.
                            </p> 
                            <label className="flex items-top py-2 cursor-pointer relative">
                                <input 
                                type="checkbox" id="check" checked={hasAccepted} onChange={(e) => setHasAccepted(e.target.checked)}
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary" 
                                onError={errors.hasAccepted !== ""}/>
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mb-5 h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </label>
                        </div>
                    {errors.hasAccepted && <p className="w-full text-red-500 text-sm mt-1 border-red">{errors.hasAccepted}</p>}
                    </div>
                    <div className={"flex flex-col gap-4 w-2/5 mx-4"}> {/* info form */}
                        <p className={"w-full font-IRANSansXDemiBold text-3xl mb-8 text-onBackground"} dir={"rtl"}>اطلاعات محصول</p>
                        <Input
                            label="نام محصول"
                            placeholder="نام محصول"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            color="orange"
                            variant={"filled"}
                            className="font-IRANSansXRegular"
                        />
                        <div className={"mb-16"}>
                            <Input
                                label="توضیحات"
                                placeholder="شامل برند، جنس، محل ساخت، مخاطب، تعداد در بسته، و..."
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                color="orange"
                                variant={"filled"}
                                className="font-IRANSansXRegular h-[108px] placeholder:whitespace-pre-wrap placeholder:text-start-right placeholder:align-top"
                                error={errors.description !== ""}
                            />
                            {errors.description && <p className="w-full text-red-500 text-sm text-wrap">{errors.description}</p>}
                        </div>
                        <Input
                            label="دسته‌بندی"
                            placeholder="شامل برند، جنس، محل ساخت، مخاطب، تعداد در بسته، و..."
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            color="orange"
                            variant={"filled"}
                            className="font-IRANSansXRegular"
                            error={errors.description !== ""}
                        />
                        {errors.description && <p className="w-full text-red-500 text-sm mt-1">{errors.description}</p>}
                        <Input
                            label="قیمت"
                            placeholder="به ازای هر واحد (ریال)"
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            color="orange"
                            variant={"filled"}
                            className="font-IRANSansXRegular"
                            error={errors.price !== ""}
                        />
                        {errors.price && <p className="w-full text-red-500 text-sm mt-1">{errors.price}</p>}
                        <Input
                            label="موجودی"
                            placeholder="موجودی اولیه‌ی محصول"
                            type="text"
                            value={formData.stock}
                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            color="orange"
                            variant={"filled"}
                            className="font-IRANSansXRegular"
                            error={errors.stock !== ""}
                        />
                        {errors.stock && <p className="w-full text-red-500 text-sm mt-1">{errors.stock}</p>}
                    </div>
                </div>
                <Button
                        onClick={handleCreate}
                        className="font-IRANSansXDemiBold rounded-3xl bg-primary text-white"
                    >
                        ایجاد محصول
                </Button>
                <p className={"w-full font-IRANSansXRegular text-wrap text-center text-sm mb-4 text-onBackground opacity-80"} dir={"rtl"}>
                محصول شما ابتدا در حالت غیرفعال ایجاد خواهد شد و پس از تایید به صورت خودکار فعال خواهد شد. برای پیگیری وضعیت تایید محصول می‌توانید به بخش تیکت‌های پنل پشتیبانی مراجعه کنید.
                </p>
            </div>
            <DashboardMenu/>
        </div>
    );
}

export default CreateProduct;
