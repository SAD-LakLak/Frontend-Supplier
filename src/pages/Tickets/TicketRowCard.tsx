import {Button} from "@material-tailwind/react";
import React from "react";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import {Ticket, getCategory, getStatus} from "../../types/Ticket.ts";


export default function TicketRowCard({ticket}: { ticket: Ticket }) {
    return (
        <div key={ticket.id}
             className={"flex border-gray-200 border-2 w-full h-16 rounded-2xl py-4 px-8 justify-between items-center"}>
            <p className={"font-IRANSansXBold text-onBackground opacity-80 text-lg flex-grow "}>{replaceEnglishDigits(ticket.title)}</p>
            <div className={"flex gap-28"}>
                <p className={"font-IRANSansXRegular flex items-center w-20  text-onBackground opacity-80"}>{replaceEnglishDigits(ticket.created_at.split("T")[0])}</p>
                <p className={"font-IRANSansXRegular flex justify-center w-36  items-center text-onBackground opacity-80"}>{getCategory(ticket.category)}</p>
                <Button disabled={true}
                        className={"bg-primary py-2 w-20 justify-center text-center flex items-center font-IRANSansXRegular rounded-2xl"}>{getStatus(ticket.status)}</Button>
            </div>
        </div>
    )
}