"use client"

interface PropsInterface{
    name?:string,
    onClick?: () => void
}

export default function ButtonAddEdit({
  name, 
  onClick
}: PropsInterface) {

  return (
    <button 
        onClick={onClick} 
        className={`cursor-pointer text-white px-6 py-2.5 rounded-lg ease-in-out duration-200 transition-all
        bg-linear-to-br from-slate-800 to-slate-950
        hover:bg-linear-to-bl hover:from-red-900 hover:to-red-800`}>
        {name}
    </button>
  )
}
