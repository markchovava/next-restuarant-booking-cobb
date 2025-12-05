"use client"
import { KeyData } from "@/_data/sample/KeyData";
import LabelPrimary from "@/_components/labels/LabelPrimary";
import CardLocation from "@/_components/cards/CardLocation";
import { useScheduleStore } from "@/_store/useScheduleStore";
import LoaderSecondary from "@/_components/loaders/LoaderSecondary";



export default function HomeResultSection() {
  const { scheduleList, isLoading } = useScheduleStore();

  if(isLoading) {
    return (
      <LoaderSecondary />
    )
  }

  return (
    scheduleList && scheduleList.length > 0 ?
    <>
        <section className={`mx-auto lg:w-[70%] w-[90%] mb-3 pb-3 gap-3 flex lg:flex-row flex-col items-center justify-between 
            border-b border-gray-200`}>
            <div>
                <h2 className="lg:text-[2rem] text-[3rem] font-light text-gray-50">Availability Results</h2>
            </div>
            <div className="w-auto px-4 py-1 rounded-lg overflow-hidden bg-gray-200 text-black">
                <h3 className="mb-1">Key Status </h3>
                <div className="flex items-center justify-start gap-3 text-sm font-light">
                {KeyData.map((i, key) => (
                <LabelPrimary key={key} css={i.bgColor} name={i.name} />
                ))}
            </div>
            </div>
        </section>

        <section className="mx-auto lg:w-[70%] w-[92%] space-y-3">
        {scheduleList.map((i, key) => (
            <CardLocation 
                key={key} 
                data={i} />
        ))}
        </section>
    </>
    :
      ""
  )
}
