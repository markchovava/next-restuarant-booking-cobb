import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import TableViewPage from "./_components/TableViewPage"
import TableEditModal from "./_components/TableEditModal"
import { checkAuthAction } from "@/_api/actions/AuthActions"
import { _tableViewAction } from "@/_api/actions/TableActions"
import { _locationAllAction } from "@/_api/actions/LocationActions"

const title = "Table Info"


interface PropsInterface {
    params: Promise<{ 
      id: string
    }>
}


export default async function page({ params }: PropsInterface) {
  const { id } = await params
  await checkAuthAction()
  
  const [ tableData, locationData ] = await Promise.all([ _tableViewAction(id), _locationAllAction() ])
    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Table List", href:"/admin/table"},
        {id: 3, name: "Table Info", href: `/admin/table/${id}`},
    ]
    return (
    <>
      <HeaderSecondary title={title} />
      
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <TableViewPage dbData={tableData} locationData={locationData} />


      <TableEditModal id={id} />


    </>
  )
}

