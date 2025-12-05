"use client"

import { PolicyData } from "@/_data/entity/PolicyData"

export default function CancelPolicyPage() {
  return (
    <div>
        <div className="px-8 text-lg font-light mt-3">
            <h3 className="font-light text-4xl mb-3">{PolicyData.cancellation.title}</h3>
            {PolicyData.cancellation.desc}
            </div>
    </div>
  )
}
