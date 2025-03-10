import React, { useEffect, useState } from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import { Button } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface FileItem {
    file: File;
    tag: string;
}

function Dashboard() {
    const {accessToken, logout} = useAuth();
    const [userData, setUserData] = useState({
        username: "",
        phone_number: "",
        email: "",
        national_code: "",
        birth_date: "",
    });

    const [files, setFiles] = useState<FileItem[]>([]);
    const [tag, setTag] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<{ tag: string; filename: string }[]>([]);

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        axiosInstance.get("/user/", {headers})
            .then((result) => {
                setUserData({
                    username: result.data.username,
                    phone_number: result.data.phone_number,
                    email: result.data.email,
                    national_code: result.data.national_code,
                    birth_date: result.data.birth_date,
                });
            })
            .catch(() => {
                setUserData({
                    username: "",
                    phone_number: "",
                    email: "",
                    national_code: "",
                    birth_date: "",
                });
                console.error("Error fetching user data");
            });
    }, [accessToken]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFiles([...files, { file: event.target.files[0], tag }]);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        for (const fileItem of files) {
            const formData = new FormData();
            formData.append("file", fileItem.file);
            formData.append("tag", fileItem.tag);

            try {
            await axiosInstance.post("/file/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadedFiles([...uploadedFiles, { tag: fileItem.tag, filename: fileItem.file.name }]);
            } catch (error) {
            console.error("Upload failed", error);
            }
        }
        setFiles([]);
    };

    const handleDownload = async (tag: string) => {
        try {
            const response = await axiosInstance.get(`/file/download/${tag}`, { responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${tag}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    // const handleSave = () => {
    //     const headers = { Authorization: `Bearer ${accessToken}` };
    //     axiosInstance.put("/user/", formData, { headers })
    //         .then(() => {
    //             setUserData(formData);
    //             setIsEditing(false);
    //         })
    //         .catch(() => {
    //             console.error("Error updating user data");
    //         });
    // };

    function getKey(key: string): string {
        const keyMap: { [key: string]: string } = {
            "username": "نام کاربری",
            "phone_number": "شماره تماس",
            "email": "ایمیل",
            "national_code": "کد ملی",
            "birth_date": "تاریخ تولد",
        };
        return keyMap[key] || "not in key";
    }

    return (
        <div className="bg-primaryLight min-h-screens h-full w-full py-8 px-16 flex gap-8">
            <DashboardMenu />
            <div className="flex w-4/5 flex-col gap-4 rounded-2xl">
                <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                    <p className="font-IRANSansXDemiBold text-2xl" dir="rtl">اطلاعات حساب کاربری</p>
                    <div className="flex w-full flex-col gap-2">
                        {Object.keys(userData).map((key) => (
                            <div key={key} className="flex items-center justify-between border-b py-2">
                            {getKey(key) === "not in key" ? null : (
                                <>
                                    <p className="text-lg font-IRANSansXMedium" dir="rtl">{getKey(key)}</p>
                                    <p className="text-md">{userData[key] || "ثبت نشده"}</p>
                                </>
                            )}
                            </div>
                        ))}
                    </div>
                    {/* <Button 
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
                        className="rounded-full w-full bg-primary font-IRANSansXDemiBold mt-4">
                        {isEditing ? "ذخیره تغییرات" : "ویرایش اطلاعات"}
                    </Button> */}
                    <div className="flex items-center justify-between gap-4 w-full">
                        <Link to="/resetPassword" className="flex-1">
                            <Button 
                                className="rounded-full w-full bg-white border-2 text-primary border-primary font-IRANSansXDemiBold hover:bg-primary hover:text-white mt-2">
                                تغییر رمز عبور
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <Button 
                                onClick={logout} 
                                className="rounded-full w-full bg-white border-2 text-primary border-primary font-IRANSansXDemiBold hover:bg-primary hover:text-white mt-2">
                                خروج از حساب کاربری
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                    <p className="font-IRANSansXDemiBold text-2xl" dir="rtl">بارگذاری مدارک</p>
                    <div className="flex gap-2 w-full">
                        <Input
                        type="text"
                        placeholder="Enter tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="flex-1"
                        />
                        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                    </div>
                    <Button onClick={handleUpload} disabled={files.length === 0}>
                        Upload
                    </Button>

                    <ScrollArea className="w-full max-h-60 mt-4 border rounded-lg p-2">
                        {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex justify-between p-2 border-b">
                            <p className="text-sm">{file.filename}</p>
                            <Button onClick={() => handleDownload(file.tag)} size="sm">
                            Download
                            </Button>
                        </div>
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
