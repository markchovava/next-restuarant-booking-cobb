"use client"

import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary"
import { useBookingStore } from "@/_store/useBookingStore";
import { formatToReadableDate } from "@/_utils/formatDate";
import { useEffect } from "react";


interface PropsInterface {
  id: number | string,
  dbData: any,
}

export default function BookingUserViewPage({id, dbData}: PropsInterface) {
    const { setToggleModal, 
        setData, 
        preData, 
        isLoading, 
        toggleModal
    } = useBookingStore();

    console.log('DBDATA:', dbData)

    useEffect(() => {
      setData(dbData.data)
    }, []);
  
    const handleToggleModal = () => {
        setToggleModal(true)
    }

    if(isLoading){
      return ( 
        <LoaderPrimary />
      )
    }


  return (
    <main className="px-8">
        <div className=' flex items-center justify-end'>
          <ButtonAddEdit
            name="Edit"
            onClick={handleToggleModal} 
          />
        </div>
        <section className=" bg-white py-8 flex flex-col items-start justify-center gap-3 rounded-xl">
            
            <div className="w-full border-b border-gray-300" />
            <h3 className="font-light text-3xl">User Information</h3>
              <RecordPrimary label="Booking Ref:" value={preData.bookingRef ?? 'Not yet Added'} />
              <RecordPrimary label="Full Name:" value={preData.fullName ?? 'Not yet Added'} />
              <RecordPrimary label="Phone:" value={preData.phone ?? 'Not yet Added'} />
              <RecordPrimary label="Email:" value={preData.email ?? 'Not yet Added'} />
              <RecordPrimary label="Guests:" value={preData.guests ?? 'Not yet Added'} />
              <RecordPrimary label="Notes:" value={preData.notes ?? 'Not yet Added'} />
            
            <div className="w-full border-b border-gray-300" />
            <h3 className="font-light text-3xl">Booking Information</h3>
              <RecordPrimary label="Table Name:" value={preData.tableName ?? 'Not yet Added'} />
              <RecordPrimary label="Location Name:" value={preData.location.name ?? 'Not yet Added'} />
              <RecordPrimary label="Date:" value={preData.date ? formatToReadableDate(preData.date) : "Not yet Added"} />
              <RecordPrimary label="Time:" value={preData.time ?? "Not yet Added"} />
            
            <div className="w-full border-b border-gray-300" />
        </section>
    </main>
  )
}
