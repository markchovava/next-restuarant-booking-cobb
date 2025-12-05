import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import TableListPage from './_components/TableListPage'
import TableAddModal from './_components/TableAddModal'
import { _tableListAction } from '@/_api/actions/TableActions'
import { checkAuthAction } from '@/_api/actions/AuthActions'
import { _locationAllAction } from '@/_api/actions/LocationActions'



const title = "Table List"
const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Table List", href:"/admin/table"},
]

export default async function page() {
    await checkAuthAction()
    const [ tableData, locationData ] = await Promise.all([ 
      _tableListAction(), 
      _locationAllAction() ]);


  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <TableListPage dbData={tableData} locationData={locationData} />


      <TableAddModal />

    </>
  )
}
