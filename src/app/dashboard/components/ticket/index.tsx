"use client"

import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiFile, FiCheckSquare } from "react-icons/fi";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
    const { handleModalVisible, setDetailsTicket } = useContext(ModalContext)
    const router = useRouter();

    const handleChangeStatus = async () => {
        try {
            const response = await api.patch("/api/ticket", {
                id: ticket.id
            });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenModal = () => {
        setDetailsTicket({ ticket, customer });
        handleModalVisible();
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-150 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-left hidden sm:table-cell">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left"><span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span></td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#121212" />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6" onClick={handleOpenModal} />
                    </button>
                </td>
            </tr>
        </>
    );
}