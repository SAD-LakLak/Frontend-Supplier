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
import {Checkbox} from "@material-tailwind/react";
import Slider from '@mui/material/Slider';
import {formatPrice} from "../../utils/formatePrice.ts";

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
        const [stock, setStock] = useState({
            delta: '',
        });

        const sliderValue = [
            filters.min_price ? Number(filters.min_price) : 0,
            filters.max_price ? Number(filters.max_price) : 5000000,
        ];
        const sliderValueStock = [
            filters.min_stock ? Number(filters.min_stock) : 0,
            filters.max_stock ? Number(filters.max_stock) : 5000000,
        ];
        const handleSliderChange = (event: Event, newValue: number | number[]) => {
            setFilters((prevFilters) => {
                const newFilters = {
                    ...prevFilters,
                    min_price: newValue[0].toString(),
                    max_price: newValue[1].toString()
                };
                return newFilters;
            });
        };
        const handleSliderStockChange = (event: Event, newValue: number | number[]) => {
            setFilters((prevFilters) => {
                const newFilters = {
                    ...prevFilters,
                    min_stock: newValue[0].toString(),
                    max_stock: newValue[1].toString()
                };
                return newFilters;
            });
        };


        const [appliedFilters, setAppliedFilters] = useState({});
        const [openFilterModal, setOpenFilterModal] = useState(false);
        const auth = useAuth();
        const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(products.length).fill(false));
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

        const handleStockChange = (e) => {
            setStock({
                ...stock,
                [e.target.name]: e.target.value,
            })
        }

        const handleDeleteProduct = (productId: number) => {
            setProducts(products.filter((p) => p.id !== productId));
        };

        const applyFilters = () => {
            setAppliedFilters(filters);
            fetchProducts(filters);
            setOpenFilterModal(false);
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
        const {accessToken} = useAuth();
        const bulkEdit = () => {
            const ids = []
            checkedItems.forEach((value, index) => {
                ids.push(products[index].id)
            })
            axiosInstance.post("/products/update/bulk/granular/",
                {
                    "delta": `${stock.delta}`,
                    "ids": ids.join("-")
                }, {
                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`
                    }
                });
        }

        useEffect(() => {
            fetchProducts(appliedFilters);
        }, [appliedFilters]);

        const handleCheck = (index: number) => {
            const newCheckedItems = [...checkedItems];
            newCheckedItems[index] = !newCheckedItems[index];
            setCheckedItems(newCheckedItems);
        };

        return (
            <div className="flex w-4/5 bg-primaryLight min-h-screen h-screen w-full py-8 px-16 flex gap-8">
                {/* قسمت راست - منوی داشبورد */}
                <DashboardMenu/>
                {/* قسمت چپ - لیست محصولات */}
                <div className="flex w-4/5 flex-col gap-4 rounded-2xl bg-white px-8 items-center">
                    <div className="flex w-full h-full overflow-y-scroll flex-col gap-4 rounded-2xl bg-white pt-10">

                        {/* هدر صفحه */}
                        <div className="flex w-full justify-between h-12 items-center px-4">
                            <p className="text-2xl font-IRANSansXBold">فهرست محصولات</p>
                            <Button onClick={() => navigate("/products/createProduct")}
                                    className="rounded-full w-fit bg-primary font-IRANSansXDemiBold">
                                افزودن محصول جدید
                            </Button>
                        </div>

                        {/*سرچ بار*/}
                        <div className={"flex w-full justify-between items-center px-4"}>
                            <div className={"flex justify-between w-1/3 items-center"}>
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
                            </div>
                            <p className={"font-IRANSansXMedium text-black"}
                               dir={"rtl"}>{`${replaceEnglishDigits(products.length)} محصول`}</p>
                        </div>

                        {/* نمایش لیست محصولات */}
                        <div className="flex flex-col gap-2 px-4">
                            {products.map((product: Product, index) => (
                                <div className={"flex"}>
                                    <ProductRowCard key={product.id} product={product} state={checkedItems[index]}
                                                    onDelete={handleDeleteProduct}/>
                                    <Checkbox
                                        color={"accent"}
                                        checked={checkedItems[index]}
                                        onClick={() => handleCheck(index)}
                                    /></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* مودال فیلترها */}
                <Dialog className={"my-[2%] mx-[30%]"} fullScreen open={openFilterModal}
                        onClose={() => setOpenFilterModal(false)}>
                    <div
                        className={"w-full h-full bg-[#FAB862] flex justify-center flex-col items-center py-6 pt-12 px-20"}>
                        <p className={"font-IRANSansXBold text-3xl text-white"}>فیلترها</p>
                        <div className={"w-full mt-10 flex flex-col justify-start"}>
                            <p className={"font-IRANSansXRegular text-md text-white"}>محدوده‌ی قیمت</p>
                            <Slider
                                value={sliderValue}
                                onChange={handleSliderChange}
                                dir={"ltr"}
                                valueLabelDisplay="auto"
                                min={0}
                                max={5000000}
                                step={100000}
                                valueLabelFormat={(value) => `${formatPrice(value)} تومان`}
                            />
                        </div>
                        <div className={"w-full mt-10 flex flex-col justify-start"}>
                            <p className={"font-IRANSansXRegular text-md text-white"}>محدوده‌ی موجودی</p>
                            <Slider
                                value={sliderValueStock}
                                onChange={handleSliderStockChange}
                                dir={"ltr"}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                step={10}
                                valueLabelFormat={(value) => `${formatPrice(value)} تومان`}
                            />
                        </div>
                        <div className={"w-full mt-10 flex flex-col gap-3 justify-center items-center"}>
                            <p className={"font-IRANSansXDemiBold text-lg text-white"}>مرتب‌سازی</p>
                            <TextField
                                name="ordering"
                                select
                                color="warning"
                                className={"font-IRANSansXRegular"}
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
                        <div className={"w-full my-8 flex flex-col gap-3 justify-center items-center"}>
                            <p className={"font-IRANSansXDemiBold text-lg text-white"}>ادیت تجمیعی</p>
                            <TextField
                                label="تعداد کالاها"
                                name="delta"
                                type="number"
                                variant="outlined"
                                value={stock.delta}
                                onChange={handleStockChange}
                                fullWidth
                            />
                        </div>

                        <DialogActions>
                            <Button onClick={applyFilters}
                                    className={"text-white bg-primary border-primary border-2 font-IRANSansXBold rounded-2xl mx-2"}
                                    variant="contained">اعمال فیلتر</Button>
                            <Button onClick={clearFilters}
                                    className={"text-onBackground bg-transparent border-primary border-2 font-IRANSansXBold rounded-2xl mx-2"}
                                    variant="outlined">پاک کردن فیلتر</Button>
                            <Button onClick={bulkEdit}
                                    className={"text-white bg-primary border-primary border-2 font-IRANSansXBold rounded-2xl mx-2"}
                                    variant="outlined">ادیت دسته جمعی</Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
;

export default Products;