"use client"

import { PolicyData } from "@/_data/entity/PolicyData"

export default function ReservationPolicyPage() {
  return (
    <div>
        <div className="px-8 text-lg font-light mt-3">
            <h3 className="font-light text-4xl mb-6">
              {PolicyData.reservation.title}
            </h3>
            {PolicyData.reservation.desc}
        </div>
    </div>
  )
}
