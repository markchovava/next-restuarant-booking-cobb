import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import ProfilePage from './_components/ProfilePage'
import ProfileEditModal from './_components/ProfileEditModal'
import { checkAuthAction } from '@/_api/actions/AuthActions'
import { _profileViewAction } from '@/_api/actions/ProfileActions'


const title = "My Profile"
const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "My Profile", href:"/admin/profile"},
]


export default async function page() {
   await checkAuthAction()
  const [ authData ] = await Promise.all([ _profileViewAction() ])
  
  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>
      <SpacerDefault />
      <ProfilePage dbData={authData} />

      <ProfileEditModal />

    </>
  )
}
