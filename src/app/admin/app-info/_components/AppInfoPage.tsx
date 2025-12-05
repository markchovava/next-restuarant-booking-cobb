"use client"

import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary"
import RecordPrimary from "@/_components/records/RecordPrimary"
import { useAppInfoStore } from "@/_store/useAppInfoStore"
import { formatDate } from "@/_utils/formatDate"
import { useEffect } from "react"




export default function AppInfoPage({dbData}: {dbData: any}) {
    const { setToggleModal, 
      setData, 
      preData, 
      isLoading 
    } = useAppInfoStore()
    useEffect(() => {
      setData(dbData.data)
    }, [])

    const handleToggleModal = () => {
        setToggleModal(true)
    } 


    if(isLoading) {
      return(
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
          <RecordPrimary label="Phone:" value={preData.phone ?? "Not yet Added"} />
          <RecordPrimary label="Email:" value={preData.email ?? "Not yet Added"} />
          <RecordPrimary label="Website:" value={preData.website ?? 'Not yet Added'} />
          <RecordPrimary label="Description:" value={preData.description ?? 'Not yet Added'} />
          <RecordPrimary label="Address:" value={preData.address ?? 'Not yet Added'} />
          <RecordPrimary label="WhatsApp:" value={preData.whatsapp ?? 'Not yet Added'} />
          <RecordPrimary label="Facebook:" value={preData.facebook ?? 'Not yet Added'} />
          <RecordPrimary label="Instagram:" value={preData.instagram ?? 'Not yet Added'} />
          <RecordPrimary label="Added By:" value={preData.user?.name ? preData.user?.name : 'Not yet Added'} />
          <RecordPrimary 
            label="Last Updated:" 
            value={preData.updatedAt ? formatDate(preData.updatedAt) : 'Not yet Added'} />
      </section>
    </>
  )
}
