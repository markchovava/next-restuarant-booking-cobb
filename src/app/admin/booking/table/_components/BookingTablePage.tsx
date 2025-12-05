"use client"
import { _scheduleBookingDeleteAction } from "@/_api/actions/ScheduleBookingActions";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import NoDataPrimary from "@/_components/no-datas/NoDataPrimary";
import PaginationPrimary from "@/_components/paginations/PaginationPrimary";
import SpacerDefault from "@/_components/spacers/SpacerDefault";
import { useScheduleBookingStore } from "@/_store/useScheduleBookingStore";
import { formatToReadableDate } from "@/_utils/formatDate";
import Link from "next/link";
import { useEffect } from "react";
import { FaDeleteLeft, FaEye } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";



export default function BookingTablePage({dbData}: {dbData: any}) {
    const { 
        dataList, 
        meta, 
        links, 
        isLoading, 
        isSearching, 
        search, 
        getDataList,
        setDataList,
        setIsLoading,
        setSearch,
        getSearchDatalist,
        getPaginatedDatalist,
    } = useScheduleBookingStore();
    
    useEffect(() => {
      setDataList(dbData)
    }, [])

    async function handleDelete(id: string | number){
        setIsLoading(true)
        setTimeout(() => {
          console.log('Testing')
        }, 4000)
        try{
            const res = await _scheduleBookingDeleteAction(id) 
            console.log('res', res)
            const {status, message} = res
            switch(status) {
              case 1:
                toast.success(message)
                await getDataList()
                setIsLoading(false)
                return
              case 0:
                toast.warn(message)
                setIsLoading(false)
              default:
                toast.warn('Something went wrong, try again.')
                return
            }
        }catch(error){
          console.error('Delete error: ', error);
        }

    }
          
    async function handlePaginate(url: string) {
      await getPaginatedDatalist(url)
    }
      
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await getSearchDatalist(search)
        } catch (error) {
            console.error('Form submission error:', error);
        }
    }

    if(isLoading){
      return (
        <LoaderPrimary />
      )
    }


    //console.log('datalist', dataList)


  return (
    <main className=' px-8'>

      {/* Search Bar */}
      <section className="flex lg:flex-row flex-col items-stretch lg:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <form onSubmit={handleSearch} className="lg:w-[60%] w-full flex items-center justify-start rounded-lg border border-gray-300">
          <input 
            type="text" 
            placeholder="Enter Name" 
            value={search}
            onChange={setSearch}
            className="flex-1 py-2 px-3 sm:px-4 outline-none rounded-l-lg text-sm sm:text-base" 
          />
          <button type="submit" className="group px-4 sm:px-6 py-2 border-l border-gray-300 rounded-r-lg">
            { isSearching ? 
              <GoDotFill className="cursor-pointer text-xl sm:text-2xl animate-pulse text-gray-900" />
            :
              <IoSearch className="cursor-pointer text-lg sm:text-xl text-gray-500 transition-all ease-initial duration-200 group-hover:text-gray-900 group-hover:scale-110" />
            }
          </button>
        </form>
      </section>


      { dataList && dataList.length > 0  ? 
        <>
          {/* Desktop Location View - Hidden on mobile */}
          <section className="hidden md:block w-full overflow-x-auto rounded-lg border border-gray-400">
            <div className='min-w-[700px]'>
              {/* HEADER */}
              <section className="bg-gray-300 font-bold text-sm lg:text-base flex items-center">
                <div className="w-[25%] border-r border-gray-400 px-2 py-2">TABLE</div>
                <div className="w-[30%] border-r border-gray-400 px-2 py-2">DATE & TIME</div>
                <div className="w-[15%] border-r border-gray-400 px-2 py-2">TAKEN</div>
                <div className="w-[20%] border-r border-gray-400 px-2 py-2">STATUS</div>
                <div className="w-[10%] px-2 py-2 text-center">ACTION</div>
              </section>
              {/* ITEMS */}
              {dataList.map((i, key) => (
              <section key={key} className={`${i.userId && 'text-green-800 font-medium'} border-b border-gray-400 flex items-center hover:bg-gray-50 transition-colors`}>
                <div className="w-[25%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base wrap-break-word">
                  {i.tableName ?? "Not Yet Added"}
                </div>
                <div className="w-[30%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base wrap-break-word">
                  <p>{ i.date ? formatToReadableDate(i.date) : "Not Yet Added"}</p>
                  <p>{ i.time ?? "Not Yet Added"}</p>
                </div>
                <div className="w-[15%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base wrap-break-word">
                  {i.taken ?? "Not Yet Added"}
                </div>
                <div className="w-[20%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base">
                  {i.status ?? 'Not yet added.'}
                </div>
                <div className="w-[10%] px-2 py-2 flex items-center justify-center gap-3">
                  <button className="cursor-pointer group">
                    <Link href={`/admin/booking/table/${i.id}`}>
                      <FaEye className="text-lg lg:text-xl text-gray-800 group-hover:text-green-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                    </Link>
                  </button>
                  <button 
                    onClick={() => handleDelete(i.id)}
                    className="cursor-pointer group">
                    <FaDeleteLeft className="text-lg lg:text-xl text-gray-800 group-hover:text-red-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                  </button>
                </div>
              </section>
              ))}
            
            </div>
          </section>

          {/* Mobile Card View - Visible only on mobile */}
          <section className="md:hidden space-y-3"> 
            {dataList.map((i, key) => (
              <div key={key} className={`${i.userId && 'text-green-800 font-medium'} 
                bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">TABLE</p>
                      <p className="text-sm font-semibold text-gray-900 wrap-break-word">
                        {i.tableName ?? "Not Yet Added"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <button className="cursor-pointer group p-1">
                        <Link href={`/admin/user/${i.id}`}>
                          <FaEye className="text-xl text-gray-800 group-hover:text-green-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                        </Link>
                      </button>
                      <button 
                        className="cursor-pointer group p-1">
                        <FaDeleteLeft className="text-xl text-gray-800 group-hover:text-red-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-1">DATE & TIME</p>
                    <p className="text-sm text-gray-900 wrap-break-word">
                      { i.date ? formatToReadableDate(i.date) : `Not yet Added`} <br />
                      { i.time ? i.time : `Not yet Added` }
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-1">TAKEN</p>
                    <p className="text-sm text-gray-900">
                        { i.taken ?? `Not yet Added`}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-1">STATUS</p>
                    <p className="text-sm text-gray-900">
                        { i.status ?? `Not yet Added`}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </section>
        </>
      :
        <NoDataPrimary />
      }

      <SpacerDefault />
      <PaginationPrimary 
        meta={meta} 
        links={links} 
        handlePaginate={handlePaginate} />

      <SpacerDefault />
           
    </main>
  )
}
