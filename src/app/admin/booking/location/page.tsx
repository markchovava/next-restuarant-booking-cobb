import HeaderSecondary from "@/_components/headers/HeaderSecondary";
import BookingLocationPage from "./_components/BookingLocationPage";
import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs";
import SpacerDefault from "@/_components/spacers/SpacerDefault";
import { checkAuthAction } from "@/_api/actions/AuthActions";
import { _scheduleListAction } from "@/_api/actions/ScheduleActions";



const title = "Bookings Floor / Location"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Bookings Dashboard", href:"/admin/booking"},
    {id: 4, name: "Bookings Floor / Location", href:"/admin/booking/location"},
]


export default async function page() {
    await checkAuthAction()
    const [ scheduleData ] = await Promise.all([ _scheduleListAction() ]);

  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
      <BreadCrumbs data={BreadCrumbsData} />
      </div>
        
      <SpacerDefault />

      <BookingLocationPage dbData={scheduleData } />
    </>
  )
}
