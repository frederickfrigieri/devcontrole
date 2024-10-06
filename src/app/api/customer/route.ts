import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prismaClient from '@/lib/prisma';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
        return NextResponse.json({ message: 'ID do cliente não fornecido' }, { status: 400 });
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId as string
        }
    });

    if (findTickets) {
        return NextResponse.json({ message: 'Cliente não pode ser deletado pois possui um ticket' }, { status: 400 });
    }

    try {
        await prismaClient.customer.delete({
            where: { id: userId as string }
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
    }

    const { email, name, phone, address, userId } = await req.json();

    try {
        await prismaClient.customer.create(
            {
                data: {
                    email,
                    name,
                    phone,
                    address: address ? address : "",
                    userId
                }
            });

        return NextResponse.json({ message: 'Cliente cadastrado com sucesso' });

    } catch (error) {
        return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const customeremail = searchParams.get("email")

    if (!customeremail || customeremail === "")
        return Response.json({ error: "Customer not found" }, { status: 400 })

    try {
        const customer = await prisma.customer.findFirst({
            where: {
                email: customeremail
            }
        })
        return Response.json(customer)
    }
    catch (err) {
        return Response.json({ error: "Customer not found" }, { status: 400 })
    }
}