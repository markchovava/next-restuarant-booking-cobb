"use client"

interface PropsInterface{
  type?: "button" | "submit" | "reset" | undefined,
  name?: string,
  onClick?: () => void,
  status?: boolean
}

export default function ButtonPrimary({type, status, name="Submit", onClick}: PropsInterface) {
  return (
    <button
    type={type}
    className={`cursor-pointer rounded-lg bg-linear-to-br from-slate-800 to-black 
    hover:bg-linear-to-bl hover:from-slate-800 hover:to-black text-white px-16 py-3`}>
      { status ?
      "Processing" :
      name }
    </button>
  )
}
