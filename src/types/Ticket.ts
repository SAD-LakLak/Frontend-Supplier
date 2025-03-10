export interface Ticket {
    id: number;
    title: string;
    message: string;
    response: string;
    response_time: string;
    category: string;
    created_at: string;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "In Progress" | "Closed";
}

export function getCategory(category: string): string {
    const categoryMap: { [key: string]: string } = {
        "General": "عمومی",
        "Technical": "فنی",
        "Payment Issue": "مالی",
    };
    return categoryMap[category] || "دسته‌بندی ناشناخته";
}

export function getStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
        "Open": "باز",
        "In Progress": "در حال بررسی",
        "Closed": "بسته",
    };
    return statusMap[status] || "وضعیت ناشناخته";
}

