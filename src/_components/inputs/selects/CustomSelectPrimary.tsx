"use client"

import TagPrimary from "@/_components/tags/TagPrimary"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa6"


interface PropsInterface{
    title: string,
    data: string[] | number[],
    onChange: (value: string | number) => void,
    value: string | number
    side?: 'left' | 'right' | ''
    placeholder: string | number,
    zIndex: string,
    error?: string | number,
}


export default function CustomSelectPrimary({
    title, 
    side="left", 
    data, 
    onChange, 
    value,
    error,
    placeholder,
    zIndex,

}: PropsInterface) {
    const [isToggle, setIsToggle] = useState(false)
    const handleSelect = (i: string | number) => {
        onChange(i)
      
        setIsToggle(false)
    }

  return (
    <>
    <section className={`w-full h-18 relative lg:border-r border-gray-400 ${zIndex}`}>
        {/* */}
        <button 
            type="button"
            className={`
                ${side === 'left' && 'lg:rounded-l-lg lg:rounded-r-none rounded-lg'} 
                ${side === 'right' && 'lg:rounded-r-lg lg:rounded-l-none rounded-lg'} 
                ${side === '' && 'lg:rounded-none rounded-lg'} 
                  group over-hidden bg-black text-white px-2 pt-4 pb-2 w-full cursor-pointer flex items-center justify-between`} 
                onClick={() => setIsToggle(!isToggle)} >
                <div className="flex flex-col items-start gap-1">
                    <p className='font-light text-sm'>{title}</p>
                    <span>{value ? value : placeholder}</span>
                </div>
            <span 
                className={`p-1 rounded-full duration-200 ease-in-out transition-all 
                group-hover:bg-gray-800 flex items-center justify-center`}>
                <FaAngleDown 
                    className={` transition-all duration-300 ease-initial 
                    ${ isToggle ? 'rotate-0' : '-rotate-180' } `}
                />
            </span>
        </button>
        {/* */}
        <ul className={`bg-black text-white border border-gray-600  font-light absolute z-100 w-full h-50 overflow-auto
            ease-initial transition-all duration-200
            ${isToggle 
                ? 'opacity-100 translate-y-1 visible' // When visible
                : 'opacity-0 -translate-y-0.5 invisible pointer-events-none' // When hidden, add 'invisible' and 'pointer-events-none'
            }`}>
            
            {/* The list items should only render when toggled to prevent unnecessary DOM elements */}
            {isToggle &&
                data.map((i, key) => (
                <li 
                    onClick={() => handleSelect(i)}
                    key={key} 
                    className={`px-2 py-1 border-b border-gray-600
                    ${value === i && 'bg-red-800'} 
                    cursor-pointer hover:bg-red-800`}>
                    {i}
                </li>
            ))}

        </ul>
    </section>
    {error &&
        <TagPrimary text={error} />
    }
    </>
  )
}