"use client"
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ButtonClose from '@/_components/buttons/ButtonClose';
import TextInput from '@/_components/inputs/TextInput';
import TextAreaInput from '@/_components/inputs/TextAreaInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { useUserStore } from '@/_store/useUserStore';
import SelectInputPrimary from '@/_components/inputs/SelectInputPrimary';
import SelectInput from '@/_components/inputs/SelectInput';
import { RoleData } from '@/_data/sample/RoleData';
import { isAdminData } from '@/_data/sample/isAdminData';
import { _userStoreAction } from '@/_api/actions/UserActions';


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



export default function UserAddModal() {
    const { setToggleModal, 
        toggleModal, 
        data, 
        errors, 
        isSubmitting,
        resetData,
        setInputValue, 
        clearErrors,
        validateForm,
        setIsSubmitting,
        getDataList
    } = useUserStore()

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
            roleLevel: data.roleLevel,
            isAdmin: data.isAdmin
        }
        try {
            const res = await _userStoreAction(formData);
            if (res.status === 1) {
                toast.success(res.message);
                await getDataList();
                clearErrors();
                resetData()
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
                <h2 className='text-[2rem] text-center font-light'>Booking Form</h2>
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

                    <SelectInput
                        data={RoleData}
                        type="text"
                        name="roleLevel"
                        label='Role'
                        onChange={setInputValue}
                        value={data.roleLevel}
                        error=""
                        />

                    <SelectInput
                        data={isAdminData}
                        type="text"
                        name="isAdmin"
                        label='Admin'
                        onChange={setInputValue}
                        value={data.isAdmin}
                        error=""
                        />
                    

                    <div className='flex items-center justify-center'>
                        <ButtonPrimary 
                            name='Submit' 
                            status={isSubmitting} 
                            type='submit' />
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
