"use client"

import { scheduleByDateTimeAction } from "@/_api/actions/ScheduleActions"
import { ButtonChecking } from "@/_components/buttons/ButtonChecking"
import CustomSelectDate from "@/_components/inputs/selects/CustomSelectDate"
import CustomSelectPrimary from "@/_components/inputs/selects/CustomSelectPrimary"
import { BookingCookieName, setTheCookie } from "@/_cookie/CookiesClient"
import { TimeData } from "@/_data/sample/TimeData"
import { useScheduleStore } from "@/_store/useScheduleStore"
import { toast } from "react-toastify"


const QuantityData = Array.from({ length: 8 - 1 + 1 }, (_, i) => 1 + i)

export default function HomeFormSection() {
    const { 
        data, 
        setValue, 
        errors, 
        isSubmitting,
        setIsSubmitting,
        setIsLoading,
        validateForm,
        resetData,
        clearErrors,
        setScheduleList,
    } = useScheduleStore()
    const currentDate = new Date();
    


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        const isValid = validateForm();
        if (!isValid) {
            // Show the first error as toast
            const firstError = errors.guests || 
                              errors.time ||
                              errors.date
            if (firstError) {
                toast.warn(firstError);
            }
            return;
        }
        setIsSubmitting(true)
        const formData = {
            guests: data.guests,
            time: data.time,
            date: data.date,
        }
        const errMsg = [
            'Something went wrong, please try again.', 
            'Failed to save data. Please try again.'
        ]
        try {
            const {date, time} = formData;
            const res = await scheduleByDateTimeAction(date, time);
            setIsLoading(true)
            const {status, data, message} = res;
            switch(status) {
                case 1:
                    clearErrors();
                    setScheduleList(data)
                    setTheCookie(BookingCookieName, JSON.stringify(formData))
                    toast.success(message);
                    resetData()
                    return
                case 0:
                    toast.success(message);
                    setTheCookie(BookingCookieName, JSON.stringify(formData))
                    return
                default:
                    toast.warn(errMsg[0])
                    return
            }
        } catch (error) {
            toast.error(errMsg[1]);
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }



  return (
    <>
    <section className="mx-auto lg:w-[70%] w-[90%] text-gray-50">
        <form 
            onSubmit={handleSubmit} 
            className="w-full grid lg:grid-cols-7 grid-cols-1 lg:gap-0 gap-2">
            {/*  */}
            <div className="col-span-1 lg:col-span-2">
                <CustomSelectPrimary
                    side="left"
                    zIndex="z-150"
                    title="Guests"
                    placeholder="0"
                    data={QuantityData}
                    value={data.guests}
                    onChange={(value) => setValue('guests', value)}
                    error={errors.guests}
                />
                <p className="text-sm font-light text-yellow-300">
                    For reservations above 8 please contact us.
                </p>
                
            </div>
            {/*  */}
            <div className="col-span-1 lg:col-span-2"> 
                <CustomSelectPrimary
                    title="Time"
                    side=""
                    zIndex="z-120"
                    placeholder="Select"
                    data={TimeData}
                    value={data.time}
                    onChange={(value) => setValue('time', value)}
                    error={errors.time}
                />
            </div>
            {/*  */}
            <div className="col-span-1 lg:col-span-2"> 
                <CustomSelectDate
                    title="Date:"
                    zIndex="z-100"
                    date={currentDate}
                    value={data.date}
                    days={60}
                    onChange={(value) => setValue('date', value)}
                    error={errors.date}
                />
            </div>
            {/*  */}
            <div className="relative col-span-1 "> 
                <div className="h-18 overflow-hidden">
                    <ButtonChecking status={isSubmitting} />
                    <p className="text-sm text-red-400"></p>
                </div>
            </div>
        </form>
    </section>
    </>
  )
}