import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {TextField, MenuItem} from '@mui/material';
import {useNavigate} from "react-router-dom";

import {Button} from "@material-tailwind/react";
import ProductRowCard from "./ProductCard.tsx";
import {Product} from "../../types/Product.ts";
import axiosInstance from "../../constants/axiosConfig.ts";

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
    });

    const [appliedFilters, setAppliedFilters] = useState({});

    const fetchProducts = async (filtersToApply) => {
        try {
            const query = Object.entries(filtersToApply)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            const response = await axiosInstance.get(`/products/?${query}`);
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
    };

    const clearFilters = () => {
        const resetFilters = {
            name: '',
            min_price: '',
            max_price: '',
            min_stock: '',
            max_stock: '',
            ordering: '-name',
        };
        setFilters(resetFilters);
        setAppliedFilters(resetFilters);
    };

    useEffect(() => {
        fetchProducts(appliedFilters);
    }, [appliedFilters]);

    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            {/*left part*/}
            <div className={"flex w-3/4 flex-col gap-4 rounded-2xl"}>
                <div className={"flex w-full h-full overflow-y-scroll flex-col gap-4 rounded-2xl bg-white pt-10"}>
                    <div className={"flex w-full justify-between h-12 items-center px-4"}>
                        <Button onClick={() => {
                            navigate("/profile")
                        }} className="rounded-full w-fit bg-primary font-IRANSansXDemiBold">افزودن محصول جدید</Button>
                        <p className={"text-2xl font-IRANSansXBold"}>فهرست محصولات</p>
                    </div>
                    {/*filters*/}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 px-4">
                        <TextField
                            label="Name"
                            name="name"
                            variant="outlined"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            label="Min Price"
                            name="min_price"
                            type="number"
                            variant="outlined"
                            value={filters.min_price}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            label="Max Price"
                            name="max_price"
                            type="number"
                            variant="outlined"
                            value={filters.max_price}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            label="Min Stock"
                            name="min_stock"
                            type="number"
                            variant="outlined"
                            value={filters.min_stock}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            label="Max Stock"
                            name="max_stock"
                            type="number"
                            variant="outlined"
                            value={filters.max_stock}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            label="Ordering"
                            name="ordering"
                            select
                            variant="outlined"
                            value={filters.ordering}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="-name">Name Descending</MenuItem>
                            <MenuItem value="name">Name Ascending</MenuItem>
                            <MenuItem value="-price">Price Descending</MenuItem>
                            <MenuItem value="price">Price Ascending</MenuItem>
                        </TextField>
                    </div>
                    {/*buttons*/}
                    <div className="mb-4">
                        <Button variant="contained" color="primary" onClick={applyFilters} className="mr-2">
                            Apply Filters
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    </div>
                    {/*products*/}
                    <div className="flex flex-col gap-2 px-4">
                        {products.map((product: Product) => (
                            <ProductRowCard key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
            </div>
            {/*right part*/}
            <DashboardMenu/>
        </div>
    );
};

export default Products;
