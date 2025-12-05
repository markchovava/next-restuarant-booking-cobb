
import BookingUserPage from './_components/BookingUserPage'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import { _bookingListAction } from '@/_api/actions/BookingActions'


const title = "Booking Users"
const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Bookings Dashboard", href:"/admin/booking"},
    {id: 4, name: "Booking Users", href:"/admin/booking/user"},
]


export default async function page() {
  const [ dbData ] = await Promise.all([_bookingListAction(), ])

  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>
      
      <SpacerDefault />
      <BookingUserPage dbData={dbData} />

      <SpacerDefault />
    </>
  )
}
