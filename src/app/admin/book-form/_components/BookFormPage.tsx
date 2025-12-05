"use client"

import { _scheduleAdminAction } from "@/_api/actions/ScheduleActions"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary"
import SelectInputPrimary from "@/_components/inputs/SelectInputPrimary"
import { LocationInterface } from "@/_data/entity/LocationEntity"
import { TableInterface } from "@/_data/entity/TableEntity"
import { StatusData } from "@/_data/sample/StatusData"
import { TimeData } from "@/_data/sample/TimeData"
import { useBookingAdminStore } from "@/_store/useBookingAdminStore"
import { useScheduleBookingStore } from "@/_store/useScheduleBookingStore"
import { formatToReadableDate, getNextDays } from "@/_utils/formatDate"
import { toast } from "react-toastify"



const title = 'Add A Booking'

export default function BookFormPage({locationData}: {locationData: any}) {
  const {
    data, 
    errors, 
    tableList, 
    isTableLoading, 
    isSubmitting,
    getTablesByLocationId, 
    setIsTableLoading,
    setValue, 
    setInputValue, 
    setSelectedItem,
    clearErrors,
    resetData,
    validateForm,
    setIsSubmitting,
  } = useBookingAdminStore()

  const currentDate = new Date();
  const DatesData = getNextDays(currentDate, 60)

  const handleSelectLocation = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const location = JSON.parse(e.target.value)
      setValue('locationId', location.id)
      setValue('locationName', location.name)
      setIsTableLoading(true)
      await getTablesByLocationId(location.id)
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      clearErrors();
      const validation = validateForm();
      if (!validation.isValid) {
          // Show the first error as toast
          const firstError = validation.errors.date ||
              validation.errors.time ||
              validation.errors.locationId || 
              validation.errors.locationStatus
          toast.warn(firstError);
          return;
      }
      const formData = {
        date: data.date,
        time: data.time,
        status: data.locationStatus,
        locationName: data.locationName,
        locationId: data.locationId,
        tableName: data.date ? data.date : "",
        tableId: data.tableId ? data.tableId : "",
      }

      console.log('formData', formData)
      setIsSubmitting(true);
      try {
          const res = await _scheduleAdminAction(formData);
          console.log('res', res)
          switch(res.status) {
            case 0:
                toast.success(res.message)
                clearErrors();
                setIsSubmitting(false); 
                return
            case 1:
                toast.success(res.message)
                clearErrors();
                resetData();
                setIsSubmitting(false); 
                return
            case 2:
                toast.success(res.message)
                clearErrors();
                setIsSubmitting(false); 
                return
            case 3:
                toast.success(res.message)
                clearErrors();
                setIsSubmitting(false); 
                return
            default:
                toast.warn('Something went wrong, please try again.');
                setIsSubmitting(false);
                return
          }
      } catch (error) {
          toast.error('Failed to save data. Please try again.');
          console.error('Form submission error:', error);
      } 
  }

  
  return (
    <>
       <section className="mx-auto lg:w-[60%] w-[90%] bg-white drop-shadow-lg px-4 py-6">
            <h2 className='text-[2rem] text-center font-light'>{title}</h2>
            <div className='w-full mb-3 border-b border-gray-400' />

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <SelectInput
                  type="date"
                  title="Date"
                  name="date"
                  value={data.date}
                  onChange={setInputValue}
                  data={DatesData}
                  error={errors.date}
                />
                <SelectInput
                  title="Time"
                  name="time"
                  value={data.time}
                  onChange={setInputValue}
                  data={TimeData}
                  error={errors.time}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <SelectInputLocation
                      title="Floor"
                      name="locationId"
                      value={data.locationId ? data.locationId.toString() : ""}
                      onChange={handleSelectLocation}
                      data={locationData.data}
                      error={errors.locationId.toString()}
                    />
                </div>
                <div className="col-span-1">
                  <SelectInput
                      data={StatusData} 
                      type="text"
                      name="locationStatus"
                      title="Location Status"
                      onChange={setInputValue}
                      value={data.locationStatus}
                      error={errors.locationStatus}
                  />
                </div>
              </div>

                
                { isTableLoading ?
                  <div className="text-center font-light py-3">
                      Loading...
                  </div>
                  :
                  <>
                      {tableList && tableList.length > 0 ?
                      <>
                        <div className="grid grid-cols-3 gap-3">
                          {tableList.map((i, key) => (
                            <div className="space-y-2 bg-white drop-shadow-lg p-3">
                              <TableCard 
                                data={i} 
                                key={key} 
                                onClick={() => setSelectedItem(i)} 
                              />
                            </div>
                          ))}
                        </div>
                      </>
                        :
                        <div className="text-center font-light py-3">
                          Select a Location/Floor to get the Tables to show here.
                        </div>
                      }
                      
                  </>
                }

                <div className='flex items-center justify-center pt-3'>
                    <ButtonPrimary 
                        name='Submit' 
                        type='submit' 
                        status={isSubmitting} />
                </div>

            </form> 

       </section>
    </>
  )
}

function TableCard({
    data, 
    onClick
}: {
    data: TableInterface, 
    onClick: () => void}
  ) {
    const { selectedItem } = useBookingAdminStore()
    const { name, id} = data

   /*  console.log('id', id)
    console.log('selectedItem.id', selectedItem.id) */

    return (
      <div onClick={onClick} className={` ${selectedItem.id === id ? 'bg-red-800' : ''} ease-in-out transition-all duration-200 group cursor-pointer 
          bg-red-700 px-2 py-3 text-white rounded-lg hover:bg-red-800`}>
          <p className={` ${selectedItem.id === id ? 'border border-white' : ''} border p-2 border-transparent group-hover:border group-hover:border-white 
            text-center rounded-lg`}>
            {name}
          </p>
      </div>
    )
}


function SelectInputLocation({
    title, value, name, onChange, data, type="time", error
  }: {
    title: string,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    data: LocationInterface[],
    type?: string,
    error: string
}){
  // Find the selected location to display its name
  const selectedLocation = data.find(loc => loc.id.toString() === value);
  const displayValue = selectedLocation ? JSON.stringify(selectedLocation) : '';

  return (
    <div className="w-full">
      <p className="font-light text-sm">{title}</p>
      <select 
        value={displayValue} 
        name={name} 
        onChange={onChange}
        className='w-full border border-gray-300 rounded-lg focus:border-gray-400 outline-none p-2'>
          <option value=''>Select {title}</option>
          {data.map((i, key) => (
            <option key={key} value={JSON.stringify(i)}>{i.name}</option>
          )) }
      </select>
      {error ? <p className="text-sm text-red-500">{error}</p> : "" }
    </div>
  )
}


function SelectInput({
    title, value, name, onChange, data, type="time", error
  }: {
    title: string,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    data: any[],
    type?: string,
    error: string
}){

  return (
    <div className="w-full">
        <p className="font-light text-sm">{title}</p>
        <select 
          value={value}
          name={name}
          onChange={onChange}
          className='w-full border border-gray-300 rounded-lg focus:border-gray-400 outline-none p-2'>
          <option value=''>Select {title}</option>
          {data.map((i, key) => (
            <option key={key} value={i}>{type === "date" ? formatToReadableDate(i) : i }</option>
          ))}
        </select>
        {error ? <p className="text-sm text-red-500">{error}</p> : "" }
    </div>
  )

}
