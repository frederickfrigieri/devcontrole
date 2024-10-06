import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import prismaClient from '@/lib/prisma'
import { CustomerProps } from "@/utils/customer.type";

export default async function CustomerPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    });

    return (
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus Clientes</h1>
                    <Link href={"/dashboard/customer/new"} className="bg-blue-500 text-white px-4 py-1 rounded">
                        Novo Cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-9">
                    {
                        customers.map((customer) => (
                            <CardCustomer key={customer.id} customer={customer as CustomerProps} />
                        ))
                    }

                    {
                        customers.length == 0 && (<h1 className="text-gray-600">Nenhum cliente encontrado</h1>)
                    }
                </section>
            </main>
        </Container>
    );
}   