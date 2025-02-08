import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useState, useEffect} from 'react';
import {TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton} from '@mui/material';
import {Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import ProductRowCard from "../../components/ProductRowCard.tsx";
import {Product} from "../../types/Product.ts";
import axiosInstance from "../../constants/axiosConfig.ts";
import {useAuth} from "../../context/AuthContext.tsx";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        min_price: '',
        max_price: '',
        min_stock: '',
        max_stock: '',
        ordering: '-name',
        search: '',
    });

    const [appliedFilters, setAppliedFilters] = useState({});
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const auth = useAuth();

    // تابع دریافت محصولات از API
    const fetchProducts = async (filtersToApply) => {
        try {
            const query = Object.entries(filtersToApply)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            const response = await axiosInstance.get(`/products/?${query}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });

            setProducts(response.data.results);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleDeleteProduct = (productId: number) => {
        setProducts( products.filter((p) => p.id !== productId));
    };

    const applyFilters = () => {
        setAppliedFilters(filters);
        fetchProducts(filters);
        setOpenFilterModal(false); // بستن مودال بعد از اعمال فیلتر
    };

    const clearFilters = () => {
        const resetFilters = {
            name: '',
            min_price: '',
            max_price: '',
            min_stock: '',
            max_stock: '',
            ordering: '-name',
            search: '',
        };
        setFilters(resetFilters);
        setAppliedFilters(resetFilters);
        setOpenFilterModal(false); // بستن مودال بعد از پاک کردن فیلتر
    };

    useEffect(() => {
        fetchProducts(appliedFilters);
    }, [appliedFilters]);

    return (
        <div className="bg-primaryLight min-h-screen h-screen w-full py-8 px-16 flex gap-8">
            {/* قسمت چپ - لیست محصولات */}
            <div className="flex w-3/4 flex-col gap-4 rounded-2xl">
                <div className="flex w-full h-full overflow-y-scroll flex-col gap-4 rounded-2xl bg-white pt-10">

                    {/* هدر صفحه */}
                    <div className="flex w-full justify-between h-12 items-center px-4">
                        <Button onClick={() => navigate("/profile")}
                                className="rounded-full w-fit bg-primary font-IRANSansXDemiBold">
                            افزودن محصول جدید
                        </Button>
                        <p className="text-2xl font-IRANSansXBold">فهرست محصولات</p>
                    </div>

                    {/*سرچ بار*/}
                    <div className={"flex w-full justify-between items-center px-4"}>
                        <p className={"font-IRANSansXMedium text-black"}
                           dir={"rtl"}>{`${replaceEnglishDigits(products.length)} محصول`}</p>
                        <div className={"flex justify-between w-1/3 items-center"}>
                            <IconButton className={"text-primary"} onClick={clearFilters}
                                        size={"medium"}>
                                <FilterAltOffIcon className={"text-primary hover:cursor-pointer"} onClick={clearFilters}
                                                  fontSize={"medium"}/>
                            </IconButton>
                            <IconButton className={"text-primary"} onClick={() => setOpenFilterModal(true)}
                                        size={"medium"}>
                                <FilterAltOutlinedIcon className={"text-primary hover:cursor-pointer"}
                                                       fontSize={"medium"}/>

                            </IconButton>

                            <div className="relative w-full max-w-lg">
                                <SearchIcon
                                    onClick={applyFilters}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary hover:cursor-pointer"/>
                                <input
                                    dir={"rtl"}
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="جستجو کنید..."
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                                />
                            </div>

                        </div>
                    </div>

                    {/* نمایش لیست محصولات */}
                    <div className="flex flex-col gap-2 px-4">
                        {products.map((product: Product) => (
                            <ProductRowCard key={product.id} product={product} onDelete={handleDeleteProduct}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* قسمت راست - منوی داشبورد */}
            <DashboardMenu/>

            {/* مودال فیلترها */}
            <Dialog fullScreen open={openFilterModal} onClose={() => setOpenFilterModal(false)}>
                <DialogTitle>فیلتر محصولات</DialogTitle>
                <DialogContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="حداقل قیمت"
                            name="min_price"
                            type="number"
                            variant="outlined"
                            value={filters.min_price}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                        <TextField
                            label="حداکثر قیمت"
                            name="max_price"
                            type="number"
                            variant="outlined"
                            value={filters.max_price}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                        <TextField
                            label="حداقل موجودی"
                            name="min_stock"
                            type="number"
                            variant="outlined"
                            value={filters.min_stock}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                        <TextField
                            label="حداکثر موجودی"
                            name="max_stock"
                            type="number"
                            variant="outlined"
                            value={filters.max_stock}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                        <TextField
                            label="مرتب‌سازی"
                            name="ordering"
                            select
                            variant="outlined"
                            value={filters.ordering}
                            onChange={handleFilterChange}
                            fullWidth
                        >
                            <MenuItem value="-name">نام (نزولی)</MenuItem>
                            <MenuItem value="name">نام (صعودی)</MenuItem>
                            <MenuItem value="-price">قیمت (نزولی)</MenuItem>
                            <MenuItem value="price">قیمت (صعودی)</MenuItem>
                        </TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={applyFilters} color="primary" variant="contained">اعمال فیلتر</Button>
                    <Button onClick={clearFilters} color="secondary" variant="outlined">پاک کردن فیلتر</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Products;
=======
import React, {useEffect, useState} from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import {Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";


function Products() {
    const {accessToken,logout} = useAuth();
    const [userData, setUserData] = useState({
        first_name: "",
        phone_number: "",
        national_code: "",
        birth_date: "",
    });
    let cnt = 0;

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        axiosInstance.get("/user/", {headers})
            .then((result) => {
                console.log(cnt)
                cnt += 1;
                console.log(result.data)
                setUserData({
                    first_name: result.data.first_name,
                    phone_number: result.data.phone_number,
                    national_code: result.data.national_code,
                    birth_date: result.data.birth_date,
                });
            })
            .catch(() => {
                setUserData({
                    first_name: "",
                    phone_number: "",
                    national_code: "",
                    birth_date: "",
                });
                console.error("Error fetching user data");
            });
    }, [accessToken]);
    const navigate = useNavigate()

    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            {/*left part*/}
            <div className={"flex w-3/4 flex-col gap-4 rounded-2xl"}>
                {/*top part*/}
                <div className={"flex w-full flex-col gap-8 rounded-2xl bg-white p-8 items-end"}>
                    <p className={"w-full font-IRANSansXBold text-3xl "} dir={"rtl"}>اطلاعات حساب کاربری</p>
                    <div className={"flex w-full justify-end gap-8"}>
                        <div className={"flex flex-col py-3 w-[20%] items-center justify-between"}>
                            <Button disabled={true} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">به‌روزرسانی اطلاعات</Button>
                            <Button onClick={()=>{navigate("/resetPassword")}} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">تغییر رمز عبور</Button>
                            <Button disabled={true} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">تایید شماره تماس</Button>
                            <Button onClick={logout} className="rounded-full w-full bg-primary font-IRANSansXDemiBold">خروج از حساب کاربری</Button>
                        </div>
                        <div className={"flex flex-col w-[30%]"}>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between rounded-t-md px-4 py-4 border-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>نام کاربری</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData ? userData.first_name : "در حال بارگذاری..."}
                                </p>
                            </div>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between px-4 py-4 border-x-2 border-b-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>شماره تماس</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData ? userData.phone_number : "در حال بارگذاری..."}
                                </p>
                            </div>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between px-4 py-4 border-x-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>کد ملی</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData ? userData.national_code : "در حال بارگذاری..."}
                                </p>
                            </div>
                            <div
                                className={"font-IRANSansXDemiBold text-primary flex items-center justify-between rounded-b-md px-4 py-4 border-2 w-full"}
                                dir={"rtl"}>
                                <p className={"text-lg font-IRANSansXBold"}>تاریخ تولد</p>
                                <p className={"text-md font-IRANSansXDemiBold text-black"}>
                                    {userData && userData.birth_date ? userData.birth_date : "ثبت نشده"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*down part*/}
                <div className={"flex w-full h-2/5 flex-col gap-4 rounded-2xl bg-white"}></div>
            </div>
            {/*right part*/}
            <DashboardMenu/>
        </div>
    );

}

export default Dashboard;
