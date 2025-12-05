import HeaderPrimary from '@/_components/headers/HeaderPrimary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import ReservationPolicyPage from './_components/ReservationPolicyPage'


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Reservation Policy", href:"/policy/reservation"},
]

export default function page() {
  return (
    <>
    <HeaderPrimary />
    <div className='px-8'>
      <BreadCrumbs data={BreadCrumbsData} />
    </div>

    <SpacerDefault />
    <ReservationPolicyPage />
    <SpacerDefault />
    </>
  )
}
