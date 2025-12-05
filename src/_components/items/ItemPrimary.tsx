"use client"
import Link from "next/link"
import { IconPrimary } from "../icons/IconsPrimary"


interface PropsInterface{
    href: string, 
    iconType: string, 
    name: string
}

export default function ItemPrimary({
    href, 
    iconType, 
    name
}: PropsInterface) {
  
    return (
        <>
        <Link href={href}>
            <li className={` w-full py-2.5 flex flex-col items-center justify-center 
                gap-1.5 transition-colors ease-in-out duration-200 hover:bg-red-950 `}>
                <IconPrimary iconType={iconType} />
                <p className="text-sm font-light text-center">{name}</p>
            </li>
        </Link>
        </>
    )
    
}
