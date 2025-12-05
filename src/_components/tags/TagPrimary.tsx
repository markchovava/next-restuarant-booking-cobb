"use client"

export default function TagPrimary({text}: {text: string | number}) {
  return (
    <div className="flex"> 
        <p className="mt-1 rounded bg-black text-sm text-red-400 px-0.5 py-0.5">
            {text}
        </p> 
    </div>
  )
}
