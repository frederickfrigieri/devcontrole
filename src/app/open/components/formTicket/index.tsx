"use client"

import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomerDataInfo } from "../../page"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco sobre seu problema..."),
})
export type FormData = z.infer<typeof schema>


export interface FormTicketProps {
    customer: CustomerDataInfo
}

export function FormTicket({ customer }: FormTicketProps) {

    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterTicket(data: FormData) {
        const response = await api.post("/api/ticket", {
            name: data.name,
            description: data.description,
            customerId: customer.id
        })
        reset();
    }

    return (
        <form
            className="bg-slate-200 mt-6 px-4 py-6 rounded border-2"
            onSubmit={handleSubmit(handleRegisterTicket)}
        >
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome do chamado..."
                register={register}
                error={errors.name?.message}
            />

            <label className="mb-1 font-medium text-lg">Descreva o chamado</label>
            <textarea
                className="w-full border-2 rounded h-24 resize-none px-2"
                placeholder="Descreva seu problema..."
                id="description"
                {...register("description")}
            ></textarea>
            {errors.description?.message && <p className="text-red-500 my-1 mt-4 mb-1">{errors.description.message}</p>}

            <button
                type="submit"
                className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold"
            >
                Cadastrar
            </button>
        </form>
    )
}