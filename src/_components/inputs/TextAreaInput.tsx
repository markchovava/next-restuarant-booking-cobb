"use client"
import { ChangeEvent } from "react"



interface TextAreaInputInterface{
    label: string,
    type?: string,
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement> | 
      ChangeEvent<HTMLTextAreaElement> | 
      ChangeEvent<HTMLSelectElement>
    ) => void
    value: string,
    placeholder: string,
    error: string
}


export default function TextAreaInput({
    label,
    type,
    name,
    onChange,
    value,
    placeholder,
    error,
}: TextAreaInputInterface
) {
  return (
    <div className='w-full'>
        <p className='mb-2 leading-none text-sm font-light'>{label}:</p>
        <textarea
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className='rounded-lg focus:border-gray-400 w-full h-40 border border-gray-300 outline-none p-2' />
        {error &&
        <p className='text-red-600 text-sm'>{error}</p>}
    </div>
  )
}
