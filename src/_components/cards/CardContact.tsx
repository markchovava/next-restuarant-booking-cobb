"use client"

import Link from "next/link"
import { IconSecondary } from "../icons/IconSecondary";


interface CardContactInterface{
    id: number | string,
    iconType: string,
    name: string,
    href: string,
}

export default function CardContact({data}: {data: CardContactInterface}) {
    const {iconType, name, href} = data;

    return (
        <div className="flex items-center justify-start gap-3">
            <div className="border border-red-700 p-2 rounded-full">
                <IconSecondary iconType={iconType} css="text-red-700 text-[1.3rem]" />
            </div>
            <Link href={href}>
                <div className="text-xl font-light">{name}</div>
            </Link>
        </div>
    )
}
