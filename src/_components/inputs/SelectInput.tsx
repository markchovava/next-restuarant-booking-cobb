"use client"
import { ChangeEvent } from "react"

interface SelectInputInterface{
    label: string,
    type?: string,
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement> | 
      ChangeEvent<HTMLSelectElement> | 
      ChangeEvent<HTMLSelectElement>
    ) => void
    value: string | number,
    placeholder?: string,
    error?: string  // Changed to optional
    data: any[]
}

export default function SelectInput({
    label,
    name,
    onChange,
    value,
    data,
    error,
}: SelectInputInterface
) {
  return (
    <div className='w-full mb-6'>
        <p className='mb-2 leading-none text-sm font-light'>{label}:</p>
        <select 
            name={name}
            onChange={onChange}
            value={value}
            className='w-full border border-gray-300 outline-none p-2'>
                <option value="">Select An Option.</option>
                {data.map((i, key) => (
                    <option key={key} value={i.value}>{i.name}</option>
                ))}
            </select>
        {error &&
        <p className='text-red-600 text-sm'>{error}</p>}
    </div>
  )
}