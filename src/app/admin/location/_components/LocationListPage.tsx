"use client"
import { _locationDeleteAction } from "@/_api/actions/LocationActions"
import ButtonAddEdit from "@/_components/buttons/ButtonAddEdit"
import LoaderPrimary from "@/_components/loaders/LoaderPrimary"
import NoDataPrimary from "@/_components/no-datas/NoDataPrimary"
import PaginationPrimary from "@/_components/paginations/PaginationPrimary"
import SpacerDefault from "@/_components/spacers/SpacerDefault"
import { useLocationStore } from "@/_store/useLocationStore"
import Link from "next/link"
import { useEffect } from "react"
import { FaDeleteLeft, FaEye } from "react-icons/fa6"
import { GoDotFill } from "react-icons/go"
import { IoSearch } from "react-icons/io5"
import { toast } from "react-toastify"



export default function LocationListSection({ dbData }: {dbData: any}) {
    const { 
        isLoading, 
        search, 
        isSearching, 
        setSearch, 
        setToggleModal,
        toggleModal,
        setDataList,
        meta,
        links,
        dataList,
        getDataList,
        getSearchDatalist,
        getPaginatedDatalist,
        setIsLoading
    } = useLocationStore()
    
    useEffect(() => {
      setDataList(dbData)
    }, [])
    
    const handleToggleModal = () => {
        setToggleModal(true)
    }
    
    async function handleDelete(id: string | number){
      setIsLoading(true)
      try{
          const res = await _locationDeleteAction(id) 
          const {data, status, message} = res
          if(status === 1) {
            toast.warn(message)
            await getDataList()
          }
      }catch(error){
        console.error('Delete error: ', error);
      } finally{
        setIsLoading(false)
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






  return (
    <> 
    <div className="w-full overflow-auto h-screen pb-30">
      
      <div className="h-8 sm:h-16" />
      <section className="px-8">
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
            <ButtonAddEdit
              name='Add' 
              onClick={handleToggleModal} />
          </section>

          { dataList && dataList.length > 0  ? 
            <>
              {/* Desktop Location View - Hidden on mobile */}
              <section className="hidden md:block w-full overflow-x-auto rounded-lg border border-gray-400">
                <div className='min-w-[700px]'>
                  {/* HEADER */}
                  <section className="bg-gray-300 font-bold text-sm lg:text-base flex items-center">
                    <div className="w-[35%] border-r border-gray-400 px-2 py-2">NAME</div>
                    <div className="w-[30%] border-r border-gray-400 px-2 py-2">STATUS</div>
                    <div className="w-[20%] border-r border-gray-400 px-2 py-2">TABLES TOTAL</div>
                    <div className="w-[15%] px-2 py-2 text-center">ACTION</div>
                  </section>
                  {/* ITEMS */}
                  {dataList.map((i, key) => (
                    <section  className="border-b border-gray-400 flex items-center hover:bg-gray-50 transition-colors">
                      <div className="w-[35%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base wrap-break-word">
                        {i.name ?? "Not Yet Added"}
                      </div>
                      <div className="w-[30%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base wrap-break-word">
                        {i.status ?? "Not Yet Added"}
                      </div>
                      <div className="w-[20%] border-r border-gray-400 px-2 py-2 text-sm lg:text-base">
                        {i.tablesTotal ?? 'Not yet added.'}
                      </div>
                      <div className="w-[15%] px-2 py-2 flex items-center justify-center gap-3">
                        <button className="cursor-pointer group">
                          <Link href={`/admin/location/${i.id}`}>
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
                    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">NAME</p>
                            <p className="text-sm font-semibold text-gray-900 wrap-break-word">
                              {i.name}</p>
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
                          <p className="text-xs text-gray-500 font-medium mb-1">STATUS</p>
                          <p className="text-sm text-gray-900 wrap-break-word">{i.status}</p>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 font-medium mb-1">TABLES TOTAL</p>
                          <p className="text-sm text-gray-900">
                              {i.tablesTotal}
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
            handlePaginate={handlePaginate} 
          />

          <SpacerDefault />

      </section>
    </div>
    </>
  )
}