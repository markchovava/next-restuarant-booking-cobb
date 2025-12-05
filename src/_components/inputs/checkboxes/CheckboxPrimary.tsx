"use client"
import React, { ChangeEvent, useState } from "react"
import { IoMdInformationCircleOutline } from "react-icons/io"


interface CheckboxPrimaryInterface{
    title: string,
    name: string,
    desc: string | React.ReactNode,
    value: string | number,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


export default function CheckboxPrimary({
    title, 
    desc, 
    name,
    value=0, 
    checked = false,
    onChange
}: CheckboxPrimaryInterface) {
    const [toggle, setToggle] = useState(false)
    const [isChecked, setIsChecked] = useState<boolean>(true); 

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

  return (
    <div className='flex items-center justify-start gap-4'>
        <label id='receive_news' className='flex items-center justify-start gap-2 font-light'>
            <input 
                type='checkbox' 
                onChange={onChange} 
                checked={checked}
                name={name} 
                value={value} 
                className='' />
            <p>{title}</p>
        </label>
        {desc &&
            <div className="relative">
                <button 
                    type='button' 
                    onClick={() => setToggle(!toggle)}>
                    <IoMdInformationCircleOutline 
                        className='text-slate-700 hover:text-black cursor-pointer' />
                </button>
                <p className={`${toggle 
                    ? 'opacity-100 translate-y-1 visible' // When visible
                    : 'opacity-0 -translate-y-0.5 invisible pointer-events-none'}
                    absolute text-sm font-light bg-white -left-40 px-4 py-3 w-90 rounded-lg drop-shadow-lg`}>
                    {desc}
                </p>
            </div>
        }

    </div>
  )
}