"use client"
import CardContact from '@/_components/cards/CardContact'
import FormContact from '@/_components/forms/FormContact'
import { ContactData } from '@/_data/sample/ContactData'
import React from 'react'

export default function ContactPage() {
  return (
    <>
    <section className="px-8 grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div className="bg-white drop-shadow py-8 px-5 ">
                <h3 className="text-[2.5rem] font-light mb-3">Contact Details</h3>
                <div className="flex flex-col items-start justify-start gap-4">
                    {ContactData.map((i, key) => (
                        <CardContact key={key} data={i} />
                    ))}
                </div>
            </div>

            <div className="bg-white drop-shadow py-8 px-5 ">
                <FormContact />
            </div>
           
        </section>
    </>
  )
}
