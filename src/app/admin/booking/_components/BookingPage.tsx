"use client"

import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import CardAdmin from "@/_components/cards/CardAdmin"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import { BookingNavData } from "@/_data/sample/NavData"

const title = "Bookings Dashboard"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Bookings Dashboard", href:"/admin/booking"},
]


export default function BookingPage() {
  return (
     <main className='h-screen overflow-y-auto'>
        <HeaderSecondary title={title} />
        <div className='px-8'>
        <BreadCrumbs data={BreadCrumbsData} />
        </div>

        <SpacerDefault />

        <section className='px-8 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6'>
            { BookingNavData.map((i, key) => (
                <CardAdmin key={key} data={i} />
            )) }
        </section>


    </main>
  )
}
