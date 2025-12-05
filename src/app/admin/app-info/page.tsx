import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import AppInfoEditModal from './_components/AppInfoModal'
import AppInfoPage from './_components/AppInfoPage'
import { checkAuthAction } from '@/_api/actions/AuthActions'
import { _appInfoViewAction } from '@/_api/actions/AppInfoActions'



const title = "App Information"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "App Information", href:"/admin/app-info"},
]


export default async function page() {
  await checkAuthAction()
  const [ appData] = await Promise.all([_appInfoViewAction()])

  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <AppInfoPage dbData={appData} />


      <AppInfoEditModal />

    </>
  )
}
