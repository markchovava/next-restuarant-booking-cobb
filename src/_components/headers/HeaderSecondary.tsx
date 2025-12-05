"use client"

import H1 from "../headings/H1"


interface PropsInterface{
    title: string
}

export default function HeaderSecondary({title}: PropsInterface) {
  return (
    <header className='w-full px-8 pt-3 pb-1 border-b border-gray-300'>
        <H1 title={title} />
    </header>
  )
}
