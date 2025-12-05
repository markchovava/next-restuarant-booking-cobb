"use client"
import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import CardAdmin from '@/_components/cards/CardAdmin'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import { AdminNavData } from '@/_data/sample/NavData'



const title = "Dashboard"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
]


export default function AdminPage() {
  return (
    <>
    <main className='h-screen'>
      <HeaderSecondary title={title} />
      <div className='px-8'>
          <BreadCrumbs data={BreadCrumbsData} />
      </div>


      <SpacerDefault />
      <section className='px-8 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6'>
        {AdminNavData.map((i, key) => (
            <CardAdmin key={key} data={i} />
        ))}
      </section>


    </main>
    </>
  )
}
