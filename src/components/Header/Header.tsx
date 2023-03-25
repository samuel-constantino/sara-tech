import React from 'react'
import Image from 'next/image'

// import logo from "@/assets/images/logo.jpg";
import Link from "next/link";

const Header = () => {
    return (
        <>
            <div className={"relative bg-black text-white h-24"}>
                <div className="container mx-auto max-w-max-width overflow-hidden flex items-center justify-between px-4 smd:px-6 xl:px-6 xl2xl:px-4 py-4 md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/">
                            <span className="sr-only">Your Company</span>
                            {/* <Image src={logo} alt={"Brand logo"} width={120} height={90}/> */}
                            <h1 className="text-18px font-medium">SARA Tech</h1>
                        </Link>
                    </div>
                    <div className="space-x-10 flex">
                        <Link href="/auto-plant" className="text-18px font-medium">
                            Auto Plant
                        </Link>
                        <button type={"button"} className="text-18px font-medium" onClick={() => console.log('contato')}>
                            Contato
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
