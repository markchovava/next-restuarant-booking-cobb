"use client"


interface SelectInputSecondaryInterface{
    data: any[]
}


export default function SelectInputSecondary({data}: SelectInputSecondaryInterface) {
  return (
    <>
    <select className="border border-slate-300 px-4 py-3 text-lg outline-none">
        <option disabled>Select an option</option>
        {data.map((i, key) => (
            <option value={i}>{i}</option>

        ))}
    </select>
    </>
  )
}
