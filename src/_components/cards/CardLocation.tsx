"use client"

import ButtonSecondary from "../buttons/ButtonSecondary";
import { StatusData } from "@/_data/sample/StatusData";
import { useScheduleStore } from "@/_store/useScheduleStore";
import { BookingCookieInterface } from "@/_data/entity/BookingEntity";
import { BookingCookieName, getTheCookie } from "@/_cookie/CookiesClient";
import { useEffect } from "react";
import { ScheduleInterface } from "@/_data/entity/ScheduleEntity";
import { useScheduleBookingStore } from "@/_store/useScheduleBookingStore";

interface PropsInterface{
    data: ScheduleInterface
}


export default function CardLocation({data}: PropsInterface) {
    const {status, locationName, id, locationId, description, } = data;
    const { isLoading, 
        setIsLoading, 
        getScheduleBookingByDateTimeScheduleList 
    } = useScheduleBookingStore()
    const { setToggleModal, 
        setSelectedSchedule,
        selectedSchedule,
        inputCookie,
        setInputCookie
    } = useScheduleStore()
    
    async function fetchBookingCookie() {
        const cookieString = await getTheCookie(BookingCookieName)
        if(cookieString) {
            try {
                const cookieData: BookingCookieInterface = JSON.parse(cookieString)
                setInputCookie(cookieData)
            } catch (error) {
                console.error('Failed to parse booking cookie:', error)
            }
        }
    }
    
    useEffect(() => {
        fetchBookingCookie()
    }, [])
   
    const css = () => {
        switch(status) {
            case 'Available':
                return 'bg-emerald-800 hover:bg-emerald-900';
            case 'Reserved':
                return 'bg-red-900';
            case 'Unavailable':
                return 'bg-gray-800';
            default:
                return 'bg-emerald-800 hover:bg-emerald-900';
        }
    }

    const btnTitle = () => {
        switch(status) {
            case StatusData[0]:
                return 'Book Now';
            case StatusData[1]:
                return 'Reserved'
            case StatusData[2]:
                return 'Unavailable'
            default:
                return 'Book Now'
        }
    }

    const handleClick = async () => {
        if( status === StatusData[0] ) {
            setToggleModal(true)
            setSelectedSchedule(data)
            await getScheduleBookingByDateTimeScheduleList(id, inputCookie.date, inputCookie.time)
        } 
    }

    /* console.log('schedule id::: ', id)
    console.log('date::: ', inputCookie.date)
    console.log('time::: ', inputCookie.time) */

    const btnName = btnTitle()




  return (
    <div className={`bg-black group rounded-lg 
        overflow-hidden w-full text-gray-100 flex lg:flex-row flex-col items-center justify-start`}>
        <div className="flex-5 p-4 border-r border-gray-800">
        <p className="text-lg font-light text-yellow-200">{locationName}</p>
        <p className="text-sm italic font-light">{description}</p>
        </div>
        <div className="flex-2 w-full lg:py-4 pb-4 px-4 flex items-center justify-center">
        <ButtonSecondary 
            status={selectedSchedule.id === id ? isLoading : false}
            onClick={handleClick} 
            name={btnName} 
            css={css()} />
        </div>
    </div>
  )
}
