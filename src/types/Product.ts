export interface Product {
    id: number;
    type: string,
        // "clothing" | "service" | "sanitary" | "entertainment" | "food" | "other"
    name: string,
    info: string,
    price: string,
    stock: string,
    product_images: string[];
    is_active: boolean;
}
