import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import LocationViewPage from "./_components/LocationViewPage"
import LocationEditModal from "./_components/LocationEditModal"
import { _locationViewAction } from "@/_api/actions/LocationActions"
import { checkAuthAction } from "@/_api/actions/AuthActions"

const title = "Location Info"


interface PropsInterface {
    params: Promise<{ 
      id: string
    }>
}


export default async function page({ params }: PropsInterface) {
    const { id } = await params
    await checkAuthAction()
    const [ locationData ] = await Promise.all([ _locationViewAction(id) ]);
    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Location List", href:"/admin/location"},
        {id: 3, name: "Location Info", href: `/admin/location/${id}`},
    ]
    return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>
      <SpacerDefault />

      
      <LocationViewPage dbData={locationData} />


      <LocationEditModal id={id} />


    </>
  )
}

