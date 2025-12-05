"use client"

import { ChangeEvent } from "react"

interface PropsInterface{
    label: string,
    value: string | number,  // Changed to accept string or number
    name: string,
    error?: string,  // Changed to optional
    onChange: (e: ChangeEvent<HTMLInputElement> | 
          ChangeEvent<HTMLSelectElement> | 
          ChangeEvent<HTMLSelectElement>
    ) => void
    data: any[],
}

export default function SelectInputInitial({
    label, 
    value, 
    name, 
    error,
    data,
    onChange,
}: PropsInterface) {
  
    return (
    <div className="w-full">
    <p className="mb-2 leading-none text-sm font-light">{label}</p>
    <select 
        name={name} 
        value={value}
        onChange={onChange} 
        className="w-full border border-gray-300 outline-none rounded-lg p-2">
        <option value="">Select an option</option>
        {data.map((i, key) => (
            <option 
                key={key} 
                value={i.id}>
                {i.name}
            </option>
        ))}
    </select>
    { error && 
    <p className="text-sm text-red-500 font-light">
        {error}
    </p> }
    </div>
  )
}