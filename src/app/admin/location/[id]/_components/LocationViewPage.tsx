"use client"

import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary"
import RecordPrimary from "@/_components/records/RecordPrimary"
import { useLocationStore } from "@/_store/useLocationStore"
import { useEffect } from "react"





export default function LocationViewPage({ dbData }: {dbData: any}) {
    const { setToggleModal, setData, preData, isLoading } = useLocationStore()

    const handleToggleModal = () => {
        setToggleModal(true)
    } 

    useEffect(() => {
        setData(dbData.data)
    }, [])

    if(isLoading) {
      return (
        <LoaderPrimary />
      )
    }

  return (
    <>
      <div className='px-8 flex items-center justify-end'>
        <ButtonAddEdit name="Edit" onClick={handleToggleModal} />
      </div>
      <section className="px-8 bg-white py-8 flex flex-col items-start justify-center gap-3 rounded-xl">
          <RecordPrimary label="Name:" value={preData.name ?? 'Not yet Added'} />
          <RecordPrimary label="Slug:" value={preData.slug ?? "Not yet Added"} />
          <RecordPrimary label="Status:" value={preData.status ?? "Not yet Added"} />
          <RecordPrimary label="Tables Total:" value={preData.tablesTotal ?? 'Not yet Added'} />
          <RecordPrimary label="Description:" value={preData.description ?? 'Not yet Added'} />
      </section>
    </>
  )
}
