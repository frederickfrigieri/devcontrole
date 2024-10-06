"use client"

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { z } from "zod";


export function NewCustomerForm({ userId }: { userId: string }) {

    const schema = z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido").min(1),
        phone: z.string().min(1).refine(value => {
            return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
        }, {
            message: "O phone deve ter estar  (DD) 999999999"
        }),
        address: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterCustomer(data: FormData) {
        const response = await api.post('/api/customer', {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            userId
        });

        router.refresh();
        router.replace("/dashboard/customer")
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo.."
                error={errors.name?.message}
                register={register}
            />

            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label htmlFor="" className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type="number"
                        name="phone"
                        placeholder="Digite o telefone (dd) 999999999"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="" className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Digite o email"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
            </section>

            <label className="mb-1 text-lg font-medium">Endereço completo</label>
            <Input
                type="text"
                name="address"
                placeholder="Digite o endereço completo.."
                error={errors.address?.message}
                register={register}
            />

            <button type="submit" className="bg-blue-500 my-4 px-2 h-11 roun text-white font-bold">
                Cadastrar
            </button>
        </form>
    )
}