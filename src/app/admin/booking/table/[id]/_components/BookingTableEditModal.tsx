"use client"
import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ButtonClose from '@/_components/buttons/ButtonClose';
import { useScheduleBookingStore } from '@/_store/useScheduleBookingStore';
import { _scheduleBookingUpdateStatusAction } from '@/_api/actions/ScheduleBookingActions';
import { toast } from 'react-toastify';
import SelectInputPrimary from '@/_components/inputs/SelectInputPrimary';
import { StatusData } from '@/_data/sample/StatusData';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';



const title = "Update Form"
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

interface PropsInterface{
    id: string | number
}
 

export default function BookingTableEditModal({id}: PropsInterface) {
    const { setToggleModal, 
        toggleModal, 
        setInputValue, 
        isSubmitting,
        data,
        errors,
        setIsSubmitting,
        getData,
        setError,
        clearErrors
    } = useScheduleBookingStore()
        
    const handleToggleModal = () => {
        setToggleModal(false)
    }
           
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        if (!data.status){
            const message = 'Status is required.'
            setError('status', message)
            return;
        }
        setIsSubmitting(true);
        const formData = {
            status: data.status,
        }
        try {
            const res = await  _scheduleBookingUpdateStatusAction(id, formData);
            if (res.status === 1) {
                toast.success(res.message);
                await getData(id);
                clearErrors();
                setToggleModal(false);
            } else {
                toast.error(res.message || 'Failed to update. Please try again.');
                console.error('Server response:', res);
            }
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }
    


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
                <h2 className='text-[2rem] text-center font-light'>{title}</h2>
                <div className='w-full mb-3 border-b border-gray-400' />
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <SelectInputPrimary
                        data={StatusData} 
                        type="text"
                        name="status"
                        label="Status"
                        onChange={setInputValue}
                        value={data.status}
                        placeholder="Enter Status here..."
                        error={errors.status}
                    />

                    <div className='flex items-center justify-center'>
                        <ButtonPrimary
                            name='Submit' 
                            type='submit' 
                            status={isSubmitting} />
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