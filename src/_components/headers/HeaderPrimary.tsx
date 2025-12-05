"use client"
import ButtonOnPrimary from "@/_components/buttons/ButtonOnPrimary";
import { ButtonOpenClose } from "@/_components/buttons/ButtonOpenClose";
import LogoPrimary from "@/_components/logos/LogoPrimary";
import { MainNavData } from "@/_data/sample/NavData";
import Link from "next/link";
import { useState } from "react";


export default function HeaderPrimary() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
    {/* DESKTOP */}
    <header className="w-full lg:block hidden bg-red-900 h-28 text-white relative">
      {/* LEFT */}
      <div className="absolute z-100 top-1/2 -translate-y-1/2 left-0">
        <div className="relative">
            <div className="pl-8">
                <ButtonOpenClose 
                  size={50} 
                  onToggle={setIsOpen} 
                  isOpen={isOpen} />
            </div>
            <ul className={`absolute z-200 left-0 top-[135%] mt-2 w-60 pb-4 bg-red-900 origin-top transition-all duration-300 ease-out ${
                  isOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
              }`}>
                  {MainNavData.map((i, key) => (
                      <Link key={key} href={i.href}>
                          <li 
                              onClick={() => setIsOpen(false)} 
                              className='cursor-pointer py-1 px-3 hover:bg-red-950 transition-colors duration-150'>
                              {i.name}
                          </li>
                      </Link>
                  ))}
                  <li className='pt-1 pb-2 px-3 text-sm text-yellow-100'>
                      For further inquiries contact us on <br />
                      <Link className='text-yellow-200 italic' href="mailto:info@cobblestonezw.com?subject=Inquiry&body=Hello">
                          info@cobblestonezw.com
                      </Link>
                  </li>
            </ul>

        </div>
      </div>

      {/* CENTER */}
      <div className="absolute z-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LogoPrimary />
      </div>

        {/* RIGHT */}
      <div className='absolute z-200 top-1/2 -translate-y-1/2 right-[3%]'>
        <Link href="">
          <ButtonOnPrimary name="Back to website" />
        </Link>
      </div>
      
    </header>

    <header className='w-full block lg:hidden'>
        <div className='bg-red-900 h-28 text-white relative'>
            <div className='absolute top-1/2 -translate-y-1/2 w-full left-0'>
                <div className='pl-[3%]'>
                    <ButtonOpenClose 
                        size={50} 
                        onToggle={setIsOpen} 
                        isOpen={isOpen} />
                </div>
            </div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <LogoPrimary />
            </div>
        </div>
         {/*  */}
        <ul className={`absolute z-200 w-full left-0 pb-4 bg-red-900 text-white drop-shadow-lg origin-top transition-all duration-300 ease-out ${
                isOpen 
                    ? 'opacity-100 scale-y-100 translate-y-0' 
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
            }`}>
                <Link href="#">
                    <li 
                        className='cursor-pointer hover:bg-red-950 py-2 px-3 text-center transition-colors duration-150'>
                        Back To Website
                    </li>
                </Link>
                {MainNavData.map((i, key) => (
                    <Link key={key} href={i.href}>
                        <li 
                            onClick={() => setIsOpen(false)} 
                            className='cursor-pointer hover:bg-red-950 py-2 px-3 text-center transition-colors duration-150'>
                            {i.name}
                        </li>
                    </Link>
                ))}
                <li className='pt-1 pb-2 px-3 text-sm text-yellow-100 text-center'>
                    For further inquiries contact us on <br />
                    <Link className='text-yellow-200 italic' href="mailto:info@cobblestonezw.com?subject=Inquiry&body=Hello">
                        info@cobblestonezw.com
                    </Link>
                </li>
        </ul>  
    </header>
    </>
  )
}
