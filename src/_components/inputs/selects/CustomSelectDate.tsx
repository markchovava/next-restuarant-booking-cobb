"use client"
import TagPrimary from "@/_components/tags/TagPrimary"
import { formatDisplayDate, getNextDays } from "@/_utils/formatDate"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa6"


interface PropsInterface{
    title: string,
    data?: string[],
    days: number,
    date: string | Date,
    onChange: (value: string) => void,
    value: string,
    zIndex: string
    error?: string | number
}


export default function CustomSelectDate({
    title, 
    days, 
    date,
    onChange, 
    value,
    zIndex,
    error,
}: PropsInterface
) {
    const css = "bg-black text-white"
    const [isToggle, setIsToggle] = useState(false)
    const DaysList = getNextDays(date, days)
    const handleSelect = (i: string ) => {
        onChange(i)
        setIsToggle(false)
    }

    function formatDateValueDisplay(i: string){
        const {today, dayName} = formatDisplayDate(i)
        return dayName + ', ' + today;
    }

    function DisplayDate(data: string) {
        const {today, dayName, date} = formatDisplayDate(data)
        return (
            <DateItem today={today} dayName={dayName} date={String(date)} />
        )
    }
  

  return (
    <>
    <section className={`w-full h-18 ${zIndex} relative lg:border-r border-gray-400`}>
        
        <button 
            type="button"
            className={`group px-2 w-full cursor-pointer flex items-center lg:rounded-none rounded-lg pt-4 pb-2
                justify-between bg-black text-white`}
            onClick={() => setIsToggle(!isToggle)} >
                <div className="flex flex-col items-start gap-1">
                    <p className='font-light text-sm '>{title}</p>
                    <span>{value ? formatDateValueDisplay(value) : "Select Date"}</span>
                </div>
            <span 
                className={`p-1 rounded-full duration-200 ease-in-out transition-all 
                group-hover:bg-gray-800 flex items-center justify-center`}>
                <FaAngleDown 
                    className={`text-md transition-all duration-300 ease-initial 
                    ${ isToggle ? 'rotate-0' : '-rotate-180' } `}
                />
            </span>
        </button>
        <ul className={`${css} font-light border border-gray-600  absolute z-100 w-full h-50 overflow-auto 
            ease-initial transition-all duration-200
             ${isToggle 
                ? 'opacity-100 translate-y-1 visible' // When visible
                : 'opacity-0 -translate-y-0.5 invisible pointer-events-none' // When hidden, add 'invisible' and 'pointer-events-none'
            }`}>
            
            {isToggle && 
                DaysList.map((i, key) => (
                <li 
                    onClick={() => handleSelect(i)}
                    key={key} 
                    className={`px-2 py-2 border-b border-gray-600
                    ${value === i && 'bg-red-800'} 
                    cursor-pointer hover:bg-red-800 `}>
                    {DisplayDate(i)}
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




interface DateItemInterface{
    today: string,
    dayName: string,
    date: string
}

function DateItem({today, dayName, date}: DateItemInterface){
     return (
        <div className="flex items-center justify-start gap-1 text-sm">
            <p className={`w-12 bg-white text-black py-1 px-3 rounded-lg 
                flex flex-col items-center justify-center`}>
                <span className="font-light leading-tight">
                    {dayName}
                </span>
                <span className="font-extrabold leading-tight">
                    {date} 
                </span>
            </p>
            <p>{today}</p>
        </div>
     )
}
