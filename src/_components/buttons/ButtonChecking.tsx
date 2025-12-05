
interface PropsInterface{
    status: boolean
}

export function ButtonChecking({status}: PropsInterface ){
    return (
        <button 
            type="submit"
            className="w-full lg:h-18 h-16 lg:rounded-r-lg lg:rounded-l-none rounded-lg absolute cursor-pointer text-sm flex items-center 
                justify-center font-medium hover:bg-red-800 bg-black text-white hover:text-white 
                transition-all ease-initial duration-200 z-50">
            { status ?
            "Checking" :
            "Check Availability" }
        </button>
    )
}