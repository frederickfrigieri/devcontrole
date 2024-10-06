"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions
}

export function Input({ placeholder, type, name, register, error, rules }: InputProps) {
    return (
        <>
            <input className="w-full border-2 rounded-md h-11 px-2"
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
    );
}