import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import BookFormPage from "./_components/BookFormPage"
import { _locationAllAction } from "@/_api/actions/LocationActions"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"



const title = "Book Now"
const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Book Now", href:"/admin/book-form"},
]


export default async function page() {
  const [ locationData ] = await Promise.all([ _locationAllAction() ])

  return (
     <main className='h-screen'>
        <HeaderSecondary title={title} />
        <div className='px-8'>
            <BreadCrumbs data={BreadCrumbsData} />
        </div>

        <SpacerDefault />
        <BookFormPage locationData={locationData} />
        <SpacerPrimary />


    </main>
  )
}
