import {useState, useEffect} from "react";
import {Alert} from "@material-tailwind/react";

// آیکون هشدار
function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
        </svg>
    );
}

export interface NotifConfig {
    notifType: "primary" | "error" | "success" | "accent" | "primaryMiddle" | "primaryLight" | "secondary";
    timeout: number;
    show: boolean;
    text: string;
}

export function useAlertNotif() {
    const [alertConfig, setAlertConfig] = useState<NotifConfig | null>(null);

    const showNotification = (config: NotifConfig) => {
        setAlertConfig(config);
    };

    return {alertConfig, showNotification};
}

export function AlertNotif({alertConfig}: { alertConfig: NotifConfig | null }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (alertConfig && alertConfig.show) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), alertConfig.timeout);
            return () => clearTimeout(timer);
        }
    }, [alertConfig]);

    if (!isVisible || !alertConfig) return null;

    const colorClasses = {
        primary: "bg-[#3792D5] text-white",
        primaryMiddle: "bg-[#CCEBFF] text-[#011936]",
        primaryLight: "bg-[#ECF7FF] text-[#011936]",
        secondary: "bg-[#CCEBFF] text-[#011936]",
        accent: "bg-[#E89325] text-white",
        error: "bg-[#FB8C00] text-white",
        success: "bg-[#4BB543] text-white",
    };

    const alertColorClass = colorClasses[alertConfig.notifType];

    return (
        <>
            <Alert
                className={`absolute top-0 z-30 left-[50%] translate-x-[-50%] font-IRANSansXDemiBold w-fit ${alertColorClass}`}
                dir={"rtl"}
                icon={<Icon/>}
            >{alertConfig.text}
            </Alert>
        </>
    );
}
