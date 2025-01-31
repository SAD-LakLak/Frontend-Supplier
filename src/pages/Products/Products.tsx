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
                            <ProductRowCard key={product.id} product={product}/>
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
