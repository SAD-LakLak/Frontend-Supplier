import {replaceEnglishDigits} from "./replacePersianNumbers.ts";

export const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numericPrice)) return 'Invalid Price';

    return replaceEnglishDigits(numericPrice.toLocaleString('en-US'));
};

