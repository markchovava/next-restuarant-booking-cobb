"use client"
import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary"
import RecordPrimary from "@/_components/records/RecordPrimary"
import { useScheduleStore } from "@/_store/useScheduleStore"
import { formatToReadableDate } from "@/_utils/formatDate"
import { useEffect } from "react"



interface PropsInterface {
  id: number | string,
  dbData: any
}

export default function BookingLocationViewPage({id, dbData}: PropsInterface) {
  const { setToggleModal, 
      setData, 
      preData, 
      isLoading2, 
      toggleModal
  } = useScheduleStore();

  useEffect(() => {
    setData(dbData.data)
  }, [])

  const handleToggleModal = () => {
      setToggleModal(true)
  } 

    if(isLoading2) {
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
            <RecordPrimary label="Location Name:" value={preData.locationName ?? 'Not yet Added'} />
            <RecordPrimary label="Status:" value={preData.status ?? "Not yet Added"} />
            <RecordPrimary label="Date:" value={preData.date ? formatToReadableDate(preData.date) : "Not yet Added"} />
            <RecordPrimary label="Time:" value={preData.time ??  "Not yet Added"} />
            <RecordPrimary label="Tables Total:" value={preData.tablesTotal ??  'Not yet Added'} />
            <RecordPrimary label="Description:" value={preData.description ?? 'Not yet Added'} />
            <RecordPrimary label="Created:" value={preData.createdAt ? formatToReadableDate(preData.createdAt) : 'Not yet Added'} />
        </section>
    </main>
  )
}
