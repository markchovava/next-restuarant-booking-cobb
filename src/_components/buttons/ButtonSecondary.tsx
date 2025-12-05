"use client"
interface PropsInterface{
  css?: string,
  name?: string,
  status: boolean,
  onClick?: () => void
}

export default function ButtonSecondary({
    css,
    status, 
    name, 
    onClick
  }: PropsInterface
) {

  return (
    <button 
        onClick={onClick} 
        className={`px-5 py-3 cursor-pointer w-full ease-initial transition-all rounded-lg 
        ${css} `}>
        {
          status ? 
          'Processing...' : 
          name
        }
    </button>
  )
}
