"use client"

import { ModalTicket } from "@/components/modal";
import { createContext, useState, ReactNode } from "react";
import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";


interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfo | undefined;
    setDetailsTicket: (detail: TicketInfo) => void;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerProps
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<TicketInfo>()

    const handleModalVisible = () => {
        setVisible(!visible);
    }

    function setDetailsTicket(detail: TicketInfo) {
        setTicket(detail);
    }

    return (
        <ModalContext.Provider value={{ visible, handleModalVisible, ticket, setDetailsTicket }}>
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    );
}