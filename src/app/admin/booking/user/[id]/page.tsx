import { checkAuthAction } from "@/_api/actions/AuthActions"
import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import BookingUserViewPage from "./_components/BookingUserViewPage"
import { _bookingViewAction } from "@/_api/actions/BookingActions"
import BookingUserEditModal from "./_components/BookingUserEditModal"




const title = "View Booking Location"
interface PropsInterface {
    params: Promise<{ 
      id: string
    }>
}

export default async function page({ params }: PropsInterface) {
    const { id } = await params
    await checkAuthAction();
    const [ dbData ] = await Promise.all([ _bookingViewAction(id) ]);
    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Bookings", href:"/admin/booking"},
        {id: 4, name: "Booking Users", href: `/admin/booking/user/`},
        {id: 5, name: "View Booking User", href: `/admin/booking/user/${id}`},
    ]


  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>
      <SpacerDefault />

      <BookingUserViewPage id={id} dbData={dbData} />

      <SpacerDefault />

      <BookingUserEditModal id={id} />
    </>
  )
}
