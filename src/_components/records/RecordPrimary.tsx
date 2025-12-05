"use client"
import { JSX } from "react"


interface RecordPrimaryProps{
    label: string,
    value: string | JSX.Element | number
}

export default function RecordPrimary({label, value}: RecordPrimaryProps) { 
    return (
        <div className=' w-full flex lg:flex-row flex-col text-lg lg:gap-2'>
            <div className='md:w-[18%] w-full font-light'>{label}:</div>
            <div className='flex-1'>{value}</div>
        </div>
    )

}
