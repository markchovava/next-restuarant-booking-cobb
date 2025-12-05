"use client"
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/_store/useBookingStore';
import ButtonClose from '@/_components/buttons/ButtonClose';
import CardSeater from '@/_components/cards/CardSeater';
import { SeaterData } from '@/_data/sample/SeaterData';
import TextInput from '@/_components/inputs/TextInput';
import TextAreaInput from '@/_components/inputs/TextAreaInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { useScheduleStore } from '@/_store/useScheduleStore';
import { BookingCookieName, getTheCookie } from '@/_cookie/CookiesClient';
import { BookingCookieInterface } from '@/_data/entity/BookingEntity';
import { formatToReadableDate } from '@/_utils/formatDate';
import { useScheduleBookingStore } from '@/_store/useScheduleBookingStore';
import CheckboxPrimary from '@/_components/inputs/checkboxes/CheckboxPrimary';
import { PolicyData } from '@/_data/entity/PolicyData';
import { bookingStoreAction } from '@/_api/actions/BookingActions';


const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }
    },
}





export default function HomeFormModal() {
    const { setToggleModal, 
        toggleModal, 
        inputCookie,
        selectedSchedule,
        setScheduleList,
    } = useScheduleStore()
    const { isLoading,  
        tableList,
        setSelectedTable,
        selectedTable,
    } = useScheduleBookingStore()
    const { data, 
        setData, 
        setInputValue, 
        errors, 
        isSubmitting, 
        setIsSubmitting,
        validateForm,
        clearErrors,
        resetData,
        resetChecked,
        setValue,
        isChecked,
        setError,
        setIsChecked,
    } = useBookingStore()
    const handleToggleModal = () => {
        setToggleModal(false)
    }


    const handleCancelPolicy = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked('cancellation', !isChecked.cancellation)
        if(e.target.checked){
            setData({...data, cancelPolicy: e.target.checked ? e.target.checked.toString() : ""})
            setError('cancelPolicy', "")
        } else {
            setData({...data, cancelPolicy: ""})
        }
    }

    const handleReservePolicy = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked('reservation', !isChecked.reservation)
        if(e.target.checked){
            setData({ ...data, reservationPolicy: e.target.checked.toString() })
            setError('reservationPolicy', "")
        } else{
            setData({ ...data, reservationPolicy: "" })
        }
  
    }
   
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.tableId || validation.errors.fullName || validation.errors.phone || 
                    validation.errors.email || validation.errors.cancelPolicy || validation.errors.reservationPolicy
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        //resetChecked()
        //console.log("THE DATA", data)
        const formData = {
            scheduleId: selectedSchedule.id,
            locationId: selectedSchedule.locationId,
            tableId: selectedTable.tableId,
            scheduleBookingId: selectedTable.id,
            fullName: data.fullName,
            tableName: selectedTable.tableName,
            locationName: selectedSchedule.locationName,
            phone: data.phone,
            email: data.email,
            notes: data.notes,
            guests: inputCookie.guests,
            date: inputCookie.date,
            time: inputCookie.time
        }
        //console.log("THE formData", formData)
        //setIsSubmitting(false);
        try {
            const res = await bookingStoreAction(formData);
            console.log('bookingStoreAction', res)
            switch(res.status) {
                case 1:
                    toast.success(res.message);
                    clearErrors();
                    setToggleModal(false);
                    resetData();
                    resetChecked()
                    setScheduleList([]);
                    setIsSubmitting(false);
                    return
                case 0:
                    toast.success(res.message);
                    clearErrors();
                    setIsSubmitting(false);
                    return
                default:
                    toast.warn('Something went wrong, please try again')
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
        } 
    }

    /* console.log('Tables::: ', dataList)
    console.log('selectedTable::: ', selectedTable) */
    

  return (
    <>
    <AnimatePresence>
        {toggleModal &&
        <motion.section
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='w-screen h-screen fixed top-0 left-0 z-200 overflow-y-auto' >
            <div className='absolute z-0 top-0 left-0 w-full h-full bg-black opacity-40'></div>
            <div className='w-full h-full absolute z-10 overflow-auto scroll__width py-24'>
            <section className='mx-auto lg:w-[50%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                <div className='flex items-center justify-end'>
                    <ButtonClose onClick={handleToggleModal} />
                </div>
                <h2 className='text-[2rem] text-center font-light'>Booking Form</h2>
                <div className='w-full mb-2 border-b border-gray-400' />
                <ul className='mb-5 font-light text-sm flex items-center justify-center gap-3'>
                    <li>{inputCookie.guests} Guests</li> |
                    <li>{formatToReadableDate(inputCookie.date)}</li>|
                    <li>{inputCookie.time}</li>
                </ul>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {isLoading ?
                        <div className='font-light text-xl pt-4 pb-4 text-center flex items-center justify-center'>
                            Loading...
                        </div>
                        :
                        <div>
                            <div className='grid grid-cols-3 gap-4'>
                            {/* CardSeater */}
                            {tableList.map((i, key) => (
                                <CardSeater 
                                    key={key} 
                                    data={i} 
                                    onClick={() => {
                                        setSelectedTable(i)
                                        setValue('tableId', i.id.toString())
                                        setValue('tableName', i.tableName)
                                    }} />
                            ))}
                            </div>
                            { errors.tableId &&
                                <p className='text-red-500 text-sm'>
                                    {errors.tableId}
                                </p>
                            }
                        </div>
                    }

                    <TextInput 
                        type="text"
                        name="fullName"
                        label='Full Name'
                        onChange={setInputValue}
                        value={data.fullName}
                        placeholder="Enter Full Name here..."
                        error={errors.fullName}
                    />       
                    <TextInput 
                        type="text"
                        name='phone'
                        label='Phone'
                        onChange={setInputValue}
                        value={data.phone}
                        placeholder="Enter Phone Number here..."
                        error={errors.phone}
                    />
                    <TextInput 
                        type="text"
                        name="email"
                        label='Email'
                        onChange={setInputValue}
                        value={data.email}
                        placeholder="Enter Email here..."
                        error={errors.email}
                    />
                    <TextAreaInput 
                        type="text"
                        name="notes"
                        label='Notes'
                        onChange={setInputValue}
                        value={data.notes}
                        placeholder="Kindly advise us of any allergens, dietary restrictions or any other special requirements..."
                        error=""
                    />

                    <section className='flex flex-col items-start justify-start gap-0.5'>
                        <CheckboxPrimary
                            title="Cancellation Policy" 
                            name='cancelPolicy'
                            value={data.cancelPolicy.toString()}
                            checked={isChecked.cancellation}
                            desc={PolicyData.cancellation.desc}
                            onChange={handleCancelPolicy}
                        />
                        {errors.cancelPolicy &&
                            <p className='font-light text-red-600 text-sm'>
                                {errors.cancelPolicy}
                            </p>
                        }

                        <CheckboxPrimary 
                            title="Reservation Policy" 
                            name='reservationPolicy'
                            value={data.reservationPolicy.toString()}
                            checked={isChecked.reservation}
                            desc={PolicyData.reservation.desc}
                            onChange={handleReservePolicy}
                        />
                        {errors.reservationPolicy &&
                            <p className='font-light text-red-600 text-sm'>
                                {errors.reservationPolicy}
                            </p>
                        }
                        
                        
                    </section>

                    <div className='flex items-center justify-center'>
                        <ButtonPrimary name='Submit' status={isSubmitting} />
                    </div>
                  
                </form>

            </section>
            </div>
        </motion.section>
        }
    </AnimatePresence>
    </>
  )
}
