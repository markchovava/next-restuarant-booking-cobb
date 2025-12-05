import HeaderPrimary from '@/_components/headers/HeaderPrimary'
import CancelPolicyPage from './_components/CancelPolicyPage'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Cancel Policy", href:"/policy/cancel"},
]

export default function page() {
  return (
    <>
    <HeaderPrimary />
    <div className='px-8'>
      <BreadCrumbs data={BreadCrumbsData} />
    </div>

    <SpacerDefault />
    <CancelPolicyPage />
    <SpacerDefault />
    </>
  )
}
