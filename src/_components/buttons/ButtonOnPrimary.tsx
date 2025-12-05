"use client"


interface PropsInterface{
    name: string
}

export default function ButtonOnPrimary({name}: PropsInterface) {
  return (
    <>
    <button 
        className={`cursor-pointer px-4 py-2.5 bg-transparent hover:bg-gray-50 uppercase border 
        border-gray-50 hover:text-red-900 ease-initial transition-all 
        duration-200 rounded-lg`}>
        {name}
    </button>
    </>
  )
}
