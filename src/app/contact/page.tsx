import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderPrimary from '@/_components/headers/HeaderPrimary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import ContactPage from './_components/ContactPage'


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Contact Us", href:"/contact"},
]


export default function page() {
  return (
    <>
    <HeaderPrimary />
    <div className='px-8'>
      <BreadCrumbs data={BreadCrumbsData} />
    </div>

    <SpacerDefault />
    <ContactPage />
    <SpacerDefault />
    </>
  )
}
