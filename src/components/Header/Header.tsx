import React from 'react'
import Link from "next/link";

interface link {
    label: String,
    href: String,
}

const links: link[] = [
    {label: "SARA Tech", href: "/"},
    {label: "Irrigação", href: "/irrigation"},
    {label: "Ambiente", href: "/environment"},
];

const Header = () => {

    return (
        <>
            <div className="relative bg-black text-white h-24">
                <div className="container mx-auto max-w-content overflow-hidden flex items-center justify-between px-4 smd:px-6 xl:px-6 xl2xl:px-4 py-4 md:space-x-10">
                    {links.map((link, index) => (
                        <Link key={index} href={""+link.href} className="text-18px font-medium">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Header;
