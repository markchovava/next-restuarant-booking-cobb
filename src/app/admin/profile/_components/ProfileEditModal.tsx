"use client"
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ButtonClose from '@/_components/buttons/ButtonClose';
import TextInput from '@/_components/inputs/TextInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { useProfileStore } from '@/_store/useProfileStore';
import { toast } from 'react-toastify';
import { _profileStoreAction } from '@/_api/actions/ProfileActions';



const title = "Edit Profile Info"

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





export default function ProfileEditModal() {
    const { setToggleModal, 
        toggleModal, 
        setInputValue, 
        data, 
        errors,
        isSubmitting,
        clearErrors,
        validateForm,
        setIsSubmitting,
        getData
    } = useProfileStore()

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
            const firstError = validation.errors.name || validation.errors.phone ||
                validation.errors.email
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
        }
        try {
            const res = await _profileStoreAction(formData);
            if (res.status === 1) {
                toast.success(res.message);
                await getData();
                clearErrors();
                setToggleModal(false);
            } else if(res.status === 0) {
                toast.error(res.message);
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
                    
                    <TextInput 
                        type="text"
                        name="name"
                        label='Full Name'
                        onChange={setInputValue}
                        value={data.name}
                        placeholder="Enter Full Name here..."
                        error={errors.name}
                    />
                  
                    <TextInput 
                        type="text"
                        name="phone"
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
