"use client"

import { loginAction } from "@/_api/actions/AuthActions"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary"
import H1 from "@/_components/headings/H1"
import TextInput from "@/_components/inputs/TextInput"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import { AuthTokenCookieName, setTheCookie, UserCookieName } from "@/_cookie/CookiesClient"
import { useAuthStore } from "@/_store/useAuthStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"



export default function LoginPage() {
    const router = useRouter()
    const {data, 
        errors, 
        setError,
        isSubmitting,
        clearErrors,
        setInputValue, 
        setIsSubmitting, 
        validateLoginForm,
        resetData
    } = useAuthStore()


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        e.preventDefault();
        // Clear previous errors
        clearErrors();
        // Validate form using store
        const validation = validateLoginForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.email || validation.errors.password
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            email: data.email,
            password: data.password,
        }

        try {
            const res = await loginAction(formData);
            //console.log('res', res)
            switch(res.status){
                case 0:
                    toast.warn(res.message);
                    setError('email', res.message)
                    return
                case 1:
                    await setTheCookie(AuthTokenCookieName, res.authToken)
                    await setTheCookie(UserCookieName, res.data)
                    router.push('/admin')
                    toast.success(res.message);
                    clearErrors();
                    resetData();
                    return
                case 2:
                    toast.warn(res.message);
                    setError('password', res.message)
                    return
                default:
                    toast.success('Something went wrong, try again.');
                    return
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
    <SpacerDefault />
    <div className="w-full flex items-center justify-center">
        <section className="bg-white lg:w-[50%] w-[90%] rounded-xl drop-shadow-lg py-4 px-6">
            <H1 title="Cobblestone Reservation App" alignCss="text-center" />
            <h2 className="text-[2rem] font-light text-center"> Login </h2>
            <div className="border-b border-gray-300 mt-3 mb-8" />
            <form onSubmit={handleSubmit} className="space-y-5">
                <TextInput
                    type="email"
                    name="email"
                    label='Email'
                    onChange={setInputValue}
                    value={data.email}
                    placeholder="Enter Email here..."
                    error={errors.email}
                />

                <TextInput 
                    type="password"
                    name="password"
                    label='Password'
                    onChange={setInputValue}
                    value={data.password}
                    placeholder="Enter Password here..."
                    error={errors.password}
                />

                <div className="text-center flex items-center justify-center">
                    <ButtonPrimary type="submit" status={isSubmitting} />
                </div>

                <div>
                    <p className="font-light">Don't have an account? 
                        <Link href="/auth/register" className="ml-1 text-red-800 underline hover:no-underline">
                        Register here
                        </Link>.
                    </p>
                </div>
            </form>
        </section>
    </div>
    </>
  )
}
