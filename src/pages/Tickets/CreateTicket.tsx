import React, {useState} from "react";
import {AlertNotif, NotifConfig, useAlertNotif} from "../../components/Alert.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import {Button, Select, Option, Input} from "@material-tailwind/react";


export default function CreateTicket() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        Message: "",
        priority: "Medium"
    });

    const {alertConfig, showNotification} = useAlertNotif();
    const navigate = useNavigate();
    const {accessToken} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config: NotifConfig = {
            text: "ارسال تیکت با موفقیت انجام شد.",
            notifType: "success",
            timeout: 1000,
            show: true
        }
        axiosInstance.post("/tickets/", formData, {headers: {Authorization: `Bearer ${accessToken}`}}).then(() => {
            showNotification(config)
            setTimeout(() => {
                navigate("/tickets")
            }, 1000)
        }).catch((e) => {
            config.notifType = "error";
            config.text = "ثبت تیکت موفقیت آمیز نبود."
            showNotification(config)
        });

    };

    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            <AlertNotif alertConfig={alertConfig}/>
            {/*right part*/}
            <DashboardMenu/>
                {/*left div*/}
                <form
                    onSubmit={handleSubmit}
                    className="flex w-4/5 flex-col gap-8 rounded-2xl py-12 bg-white px-8 items-center"
                >
                    <p className={"font-IRANSansXBold text-onBackground text-3xl w-full text-start"}>تیکت جدید</p>
                    <Input
                        label="عنوان"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        color="blue"
                        variant={"standard"}
                        className="font-IRANSansXRegular"
                        required
                    />

                    <Select
                        label="دسته‌بندی"
                        value={formData.category}
                        onChange={(value) => setFormData({...formData, category: value})}
                        color="blue"
                        variant="standard"
                        className="font-IRANSansXRegular text-right appearance-none"
                    >
                        <Option value="Technical">فنی</Option>
                        <Option value="Payment Issue">مالی</Option>
                        <Option value="General">عمومی</Option>
                    </Select>


                    <div className="relative w-full">
                    <textarea
                        id="description"
                        value={formData.Message}
                        onChange={(e) => setFormData({...formData, Message: e.target.value})}
                        className="peer w-full h-full my-0.5 resize-none border-0 border-b border-gray-200 bg-transparent text-sm text-right font-IRANSansXRegular focus:border-primary focus:outline-none focus:ring-0"
                        rows={4}
                        required
                    />
                        <label
                            htmlFor="description"
                            className="absolute right-1 top-4 text-sm text-onBackground transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary"
                        >
                            توضیحات
                        </label>
                    </div>
                    <div className={"flex gap-8"}>
                        <Button
                            type="button"
                            onClick={() => navigate("/tickets")}
                            className="font-IRANSansXDemiBold px-4 rounded-3xl bg-transparent border-primary border-2 text-primary text-sm"
                        >
                            بازگشت به لیست
                        </Button>
                        <Button
                            type="submit"
                            className="font-IRANSansXDemiBold px-8 rounded-3xl bg-primary text-white text-sm"
                        >
                            ایجاد تیکت
                        </Button>
                    </div>
                </form>
        </div>
    );

}

