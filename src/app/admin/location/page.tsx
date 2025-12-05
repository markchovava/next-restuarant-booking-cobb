import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import LocationListPage from './_components/LocationListPage'
import LocationAddModal from './_components/LocationAddModal'
import { checkAuthAction } from '@/_api/actions/AuthActions'
import { _locationListAction } from '@/_api/actions/LocationActions'



const title = "Location List"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Location List", href:"/admin/table"},
]


export default async function page() {
  await checkAuthAction()
  const [ locationData ] = await Promise.all([ _locationListAction() ]);
 

  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <LocationListPage dbData={locationData} />


      <LocationAddModal />

    </>
  )
}
