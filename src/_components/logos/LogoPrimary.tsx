"use client"
import Image from 'next/image'
import Link from 'next/link'


export default function LogoPrimary() {
  return (
    <div className="cursor-pointer">
      <Link href="/">
        <Image
          src="/assets/img/logo.png" 
          alt="Image" 
          width={250} 
          height={70} 
          className="" />
      </Link>
    </div>
  )
}
