import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import UserViewPage from "./_components/UserViewPage"
import UserEditModal from "./_components/UserEditModal"
import { _userViewAction } from "@/_api/actions/UserActions"
import { checkAuthAction } from "@/_api/actions/AuthActions"


const title = "User Info"

interface PropsInterface {
    params: Promise<{ 
      id: string
    }>
}


export default async function page({ params }: PropsInterface) {
    const { id } = await params
    await checkAuthAction()
    const [ userData ] = await Promise.all([ _userViewAction(id) ])

    
    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "User List", href:"/admin/user"},
        {id: 3, name: "User Info", href:`/admin/user/${id}`},
    ]
    return (
    <>
      <HeaderSecondary title={title} />
      
      <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
      </div>

      <SpacerDefault />
      
      <UserViewPage dbData={userData} />


      <UserEditModal id={id} />


    </>
  )
}

