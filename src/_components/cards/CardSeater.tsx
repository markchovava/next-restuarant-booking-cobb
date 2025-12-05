"use client"

import { ScheduleBookingInterface } from "@/_data/entity/ScheduleBookingEntity";
import { StatusData } from "@/_data/sample/StatusData";
import { useScheduleBookingStore } from "@/_store/useScheduleBookingStore";
import { useScheduleStore } from "@/_store/useScheduleStore";

interface CardSeaterInterface{
    data: ScheduleBookingInterface
    onClick: () => void,
}

export default function CardSeater({data, onClick}: CardSeaterInterface) {
    const {status, tableName, id} = data
    const { selectedTable } = useScheduleBookingStore()

     const css = () => {
        switch(status) {
            case StatusData[0]:
                return 'bg-emerald-800 hover:bg-emerald-900';
            case StatusData[1]:
                return 'bg-red-900';
            case StatusData[2]:
                return 'bg-gray-800';
            default:
                return 'bg-emerald-800 hover:bg-emerald-900';
        }
    }

    const cssBorder = () => {
        switch(status) {
            case StatusData[0]:
                return 'hover:border-white';
            case StatusData[1]:
                return '';
            case StatusData[2]:
                return '';
            default:
                return 'hover:border-white';
        }
    }

    const handleClick = () => {
        status === StatusData[0] ? onClick() : null
    }
  return (
    <>
    {/* CardSeater */}
    <div className={`cursor-pointer flex items-center justify-center flex-col gap-2 h-20 text-white 
            ${css()}
            ${selectedTable.id === id && status === StatusData[0] ? 'bg-emerald-900' : ''} 
             rounded-lg p-2`}>
        <button 
            type="button"
            onClick={handleClick} 
            className={`${status === StatusData[0] ? 'hover:border-white' : ''} 
            ${selectedTable.id === id && status === StatusData[0] ? 'border-white' : ''} 
            border border-transparent ease-initial transition-all duration-200 cursor-pointer h-full w-full rounded-lg`}>
            <h3 className='font-light text-center text-xl'>
                {status}
            </h3>
            <p className='font-light'>{tableName}</p>
        </button>
    </div>
    </>
  )
}
