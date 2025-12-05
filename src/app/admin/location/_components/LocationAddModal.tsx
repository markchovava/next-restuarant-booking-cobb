"use client"
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ButtonClose from '@/_components/buttons/ButtonClose';
import TextInput from '@/_components/inputs/TextInput';
import TextAreaInput from '@/_components/inputs/TextAreaInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { useLocationStore } from '@/_store/useLocationStore';
import { StatusData } from '@/_data/sample/StatusData';
import SelectInputPrimary from '@/_components/inputs/SelectInputPrimary';
import { _locationStoreAction } from '@/_api/actions/LocationActions';
import { datalist } from 'framer-motion/client';
import { useEffect } from 'react';


const title = 'Add Location / Floor'

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



export default function LocationAddModal() {
    const { setToggleModal, 
        toggleModal, 
        setInputValue, 
        isSubmitting,
        data,
        errors,
        setIsSubmitting,
        getDataList,
        validateForm,
        resetData,
        clearErrors
    } = useLocationStore()
    
    useEffect(() => {
        resetData()
    }, [])

    const handleToggleModal = () => {
        setToggleModal(false)
    }
   
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name || validation.errors.slug || 
                validation.errors.status || validation.errors.tablesTotal
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            slug: data.slug,
            status: data.status,
            description: data.description,
            tablesTotal: data.tablesTotal
        }
        try {
            const res = await _locationStoreAction(formData);
            //console.log('res', res)
            switch(res.status){
                case 1:
                    await getDataList();
                    setToggleModal(false);
                    toast.success(res.message)
                    clearErrors();
                    resetData()
                    setIsSubmitting(false); 
                    return
                default:
                    toast.warn(res.message);
                    setIsSubmitting(false);
            }
            toast.warn('Something went wrong, please try again.')
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
                    
                    <TextInput 
                        type="text"
                        name="name"
                        label='Name'
                        onChange={setInputValue}
                        value={data.name}
                        placeholder="Enter Name here..."
                        error={errors.name}
                    />

                    <TextInput 
                        type="number"
                        name="tablesTotal"
                        label='Tables Total'
                        onChange={setInputValue}
                        value={data.tablesTotal}
                        placeholder=""
                        error={''}
                    />
                  
                    <TextInput 
                        type="text"
                        name="slug"
                        label='Slug'
                        onChange={setInputValue}
                        value={data.slug}
                        placeholder="Enter Slug here..."
                        error={errors.slug}
                    />

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

                    <TextAreaInput 
                        type="text"
                        name="description"
                        label='Description'
                        onChange={setInputValue}
                        value={data.description}
                        placeholder="Enter Description here..."
                        error={errors.description}
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
