import { checkAuthAction } from "@/_api/actions/AuthActions"
import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import BookingLocationViewPage from "./_components/BookingLocationViewPage"
import BookingLocationEditModal from "./_components/BookingLocationEditModal"
import { _scheduleViewAction } from "@/_api/actions/ScheduleActions"



const title = "View Booking Location"
interface PropsInterface {
    params: Promise<{ 
      id: string
    }>
}
 

export default async function page({ params }: PropsInterface) {
    const { id } = await params
    await checkAuthAction()
    const [ scheduleData ] = await Promise.all([ _scheduleViewAction(id) ]);
    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Bookings", href:"/admin/booking"},
        {id: 3, name: "Booking Locations", href:"/admin/booking/location"},
        {id: 4, name: "View Booking Location", href: `/admin/booking/location/${id}`},
    ]


  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>
      <SpacerDefault />

      <BookingLocationViewPage id={id} dbData={scheduleData} />


      <BookingLocationEditModal id={id} />
    </>
  )
}
