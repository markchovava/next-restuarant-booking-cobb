import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import UserListPage from './_components/UserListPage'
import UserAddModal from './_components/UserAddModal'
import { checkAuthAction } from '@/_api/actions/AuthActions'
import { _userListAction } from '@/_api/actions/UserActions'



const title = "User List"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "User List", href:"/admin/user"},
]


export default async function page() {
  await checkAuthAction()
  const [ userData ] = await Promise.all([ _userListAction() ]);

  return (
    <>
      <HeaderSecondary title={title} />
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      <UserListPage dbData={userData} />


      <UserAddModal />

    </>
  )
}
