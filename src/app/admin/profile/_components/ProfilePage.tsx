"use client"

import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary"
import RecordPrimary from "@/_components/records/RecordPrimary"
import { useProfileStore } from "@/_store/useProfileStore"
import { checkRole, isAdmin } from "@/_utils/userChecks"
import { useEffect } from "react"




export default function ProfilePage({dbData}: {dbData: any}) {
    const { setToggleModal, preData, setData, isLoading } = useProfileStore()
    console.log(dbData)
    useEffect(() => {
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

    

  return (
    <>
    <div className='px-8 flex items-center justify-end'>
        <ButtonAddEdit name="Edit" onClick={handleToggleModal} />
      </div>
      <section className="px-8 bg-white py-8 flex flex-col items-start justify-center gap-3 rounded-xl">
          <RecordPrimary label="Name:" value={preData.name ?? 'Not yet Added'} />
          <RecordPrimary label="Phone:" value={preData.phone ?? "Not yet Added"} />
          <RecordPrimary label="Email:" value={preData.email ?? "Not yet Added"} />
          <RecordPrimary label="Admin:" value={preData.isAdmin ? isAdmin(preData.isAdmin) :  'Not yet Added'} />
          <RecordPrimary label="Role:" value={preData.roleLevel ? checkRole(preData.roleLevel) : 'Not yet Added'} />
      </section>
    </>
  )
}
