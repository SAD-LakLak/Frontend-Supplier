import React, {useEffect, useState} from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {Button} from "@material-tailwind/react";
import TicketRowCard from "./TicketRowCard.tsx";
import {Ticket} from "../../types/Ticket.ts";
import {fetchAllTickets} from "./tickets.ts";
import {Link} from "react-router-dom";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";


export default function Tickets() {
    const {accessToken} = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const getTickets = async () => {
            fetchAllTickets(accessToken as string).then((data) => {
                setTickets(data)
            });
        };
        getTickets();
    }, [accessToken]);

    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            {/*right part*/}
            <DashboardMenu/>
                {/*left part*/}
                <div className={"flex w-4/5 flex-col gap-4 rounded-2xl bg-white py-8 px-8"}>
                    <div className={"flex justify-between items-center mb-4"}>
                        <p className={"font-IRANSansXDemiBold text-2xl text-onBackground"}>تاریخچه‌ی تیکت‌ها</p>
                        <Link to={"/tickets/create"}>
                        <Button className={"bg-primary font-IRANSansXMedium px-12 rounded-full shadow-xl"}>
                            ثبت تیکت جدید
                        </Button></Link>
                    </div>

                    <div className={"flex flex-col w-full h-fit gap-4 overflow-y-scroll no-scrollbar items-center"}>
                        {tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <Link to={`/tickets/${ticket.id}`} className={"w-full "}>
                                    <TicketRowCard ticket={ticket}/>
                                </Link>
                            ))
                        ) : (
                            <p className="mt-12 font-IRANSansXMedium">هنوز تیکتی ثبت نکرده‌اید.</p>
                        )}
                    </div>
                </div>
        </div>
    );

}

