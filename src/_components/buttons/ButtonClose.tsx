"use client"
import { IoClose } from "react-icons/io5"


interface ButtonCloseInterface{
    onClick: () => void
}


export default function ButtonClose({ onClick }: ButtonCloseInterface) {
  return (
    <button 
        onClick={onClick} 
        className='cursor-pointer hover:text-red-600 transition-all ease-in-out duration-200'>
        <IoClose className='text-2xl' />
    </button>
  )
}