"use client"

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
    const { status, data } = useSession()

    console.log(data?.user?.image);

    return <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
            <Link href="/">
                <h1 className="font-bold text-2xl hover:tracking-widest duration-300">
                    <span className="text-blue-500 pl-1">DEV</span> CONTROLE
                </h1>
            </Link>

            {
                status === 'loading' && (
                    <button className="animate-spin">
                        <FiLoader size={26} color="#4b5563" />
                    </button>
                )
            }

            {
                status === 'unauthenticated' && (
                    <button>
                        <FiLock size={26} color="#4b5563" onClick={() => signIn()} />
                    </button>
                )
            }

            {
                status === 'authenticated' && (
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Image src={data?.user?.image as string} alt={""} width={50} height={50} className="rounded-full" />
                        </Link>

                        <button>
                            <FiLogOut size={26} color="#ff2313" onClick={() => signOut()} />
                        </button>
                    </div>
                )
            }

        </div>
    </header>
}