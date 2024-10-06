import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id,
            userId: session.user.id
        }
    });

    if (!findTicket) {
        return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    await prisma.ticket.update({
        where: {
            id: findTicket.id
        },
        data: {
            status: "FECHADO"
        }
    });

    return NextResponse.json({ message: "Ticket updated" });
}

export async function POST(req: Request) {
    const { customerId, name, description } = await req.json();

    if (!customerId || !name || !description) {
        return NextResponse.json({ message: 'Informe todos os dados para cadastrar um chamado' }, { status: 400 })
    }

    try {
        await prisma.ticket.create({
            data: {
                description: description,
                name: name,
                customerId: customerId,
                status: "ABERTO"
            }
        })
        return NextResponse.json({ message: 'Chamado registrado com sucesso' })

    } catch (err) {
        return NextResponse.json({ message: 'Falha criando chamado' }, { status: 400 })
    }

}