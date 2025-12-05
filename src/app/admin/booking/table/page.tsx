import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import BookingTablePage from './_components/BookingTablePage'
import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import SpacerDefault from '@/_components/spacers/SpacerDefault';
import { checkAuthAction } from '@/_api/actions/AuthActions';
import { _scheduleBookingListAction } from '@/_api/actions/ScheduleBookingActions';


const title = "Booking Tables";
const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Bookings Dashboard", href:"/admin/booking"},
    {id: 4, name: "Booking Tables", href:"/admin/booking/table"},
];


export default async function page() {
    await checkAuthAction()
    const [ scheduleData ] = await Promise.all([ _scheduleBookingListAction() ]);
  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <BookingTablePage dbData={scheduleData} />
      
      <SpacerDefault />
    </>
  )
}

