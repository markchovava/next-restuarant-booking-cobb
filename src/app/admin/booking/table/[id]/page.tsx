import { checkAuthAction } from '@/_api/actions/AuthActions'
import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import React from 'react'
import BookingTableViewPage from './_components/BookingTableViewPage'
import BookingTableEditModal from './_components/BookingTableEditModal'
import { _scheduleBookingViewAction } from '@/_api/actions/ScheduleBookingActions'


const title = "View Booking Table"
interface PropsInterface {
    params: Promise<{ 
      id: string
    }>
}


export default async function page({ params }: PropsInterface) {
    const { id } = await params
    await checkAuthAction() 
    const [ dbData ] = await Promise.all([ _scheduleBookingViewAction(id) ]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Bookings", href:"/admin/booking"},
        {id: 4, name: "Booking Tables", href: `/admin/booking/table/${id}`},
    ]

  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <BookingTableViewPage 
          id={id} 
          dbData={dbData} 
      />

      <BookingTableEditModal id={id} />

    </>
  )
}
