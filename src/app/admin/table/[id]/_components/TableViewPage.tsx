"use client"

import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary"
import RecordPrimary from "@/_components/records/RecordPrimary"
import { useTableStore } from "@/_store/useTableStore"
import { useEffect } from "react"





export default function TableViewPage({ dbData, locationData }: {dbData: any, locationData: any}) {
    const { setToggleModal, 
      setData, 
      preData, 
      setLocations, isLoading } = useTableStore()
    useEffect(() => {
      setLocations(locationData.data)
      setData(dbData.data)
    }, [])

    const handleToggleModal = () => {
        setToggleModal(true)
    } 

    if(isLoading) {
      return (
        <LoaderPrimary />
      )
    }

    // console.log('preData', preData)
     
  return (
    <>
      <div className='px-8 flex items-center justify-end'>
        <ButtonAddEdit name="Edit" onClick={handleToggleModal} />
      </div>
      <section className="px-8 bg-white py-8 flex flex-col items-start justify-center gap-3 rounded-xl">
          <RecordPrimary label="Name:" value={preData.name ?? 'Not yet Added'} />
          <RecordPrimary label="Seats:" value={preData.seats ?? 'Not yet Added'} />
          <RecordPrimary label="Number Of Tables:" value={preData.quantity ?? 'Not yet Added'} />
          <RecordPrimary label="Location / Floor:" value={preData.location?.name ?? 'Not yet Added'} />
          <RecordPrimary label="Status:" value={preData.status ?? 'Not yet Added'} />
          <RecordPrimary label="Author:" value={preData.user?.name ?? 'Not yet Added'} />
      </section>
    </>
  )
}
