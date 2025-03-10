import axiosInstance from "../../constants/axiosConfig.ts";
import {Ticket} from "../../types/Ticket.ts";


function parseTicketResponse(data): Ticket {
    return {
        id: data.id,
        title: data.title,
        message: data.Message,
        response: data.Response,
        response_time: data.Response_Time,
        category: data.category,
        created_at: data.created_at,
        priority: data.priority,
        status: data.status,
    }
}

export async function fetchAllTickets(accessToken: string): Promise<Ticket[]> {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axiosInstance.get<{ tickets: Ticket[] }>("/tickets/", {headers});
        const tickets: Ticket[] = response.data.map(parseTicketResponse);
        return tickets;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return [];
    }
}

export async function fetchSingleTicket(accessToken: string, id: string): Promise<Ticket> {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axiosInstance.get(`/tickets/${id}/`, {headers});
        return parseTicketResponse(response.data);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return {} as Ticket;
    }
}
