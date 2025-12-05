"use client"
import { ChangeEvent } from "react"


interface SelectInputPrimaryInterface{
    label: string,
    type?: string,
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement> | 
      ChangeEvent<HTMLSelectElement> | 
      ChangeEvent<HTMLSelectElement>
    ) => void
    value: number | string,
    placeholder: string,
    error?: string
    data: any[]
}

export default function SelectInputPrimary({
    label,
    name,
    onChange,
    value,
    data,
    error,
}: SelectInputPrimaryInterface
) {
  return (
    <div className='w-full mb-6'>
        <p className='mb-2 leading-none text-sm font-light'>{label}:</p>
        <select 
            name={name}
            onChange={onChange}
            value={value}
            className='w-full border border-gray-300 outline-none p-2'>
                <option value="" disabled>Select An Option.</option>
                {data.map((i, key) => (
                    <option key={key} value={i}>{i}</option>
                ))}
            </select>
        {error &&
        <p className='text-red-600 text-sm'>{error}</p>}
    </div>
  )
}
