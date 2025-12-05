import React from 'react'
import RegisterPage from './_components/RegisterPage'
import HeaderPrimary from '@/_components/headers/HeaderPrimary'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import SpacerDefault from '@/_components/spacers/SpacerDefault'

export default function page() {
  return (
    <>
    <HeaderPrimary />
    <RegisterPage />
    <SpacerDefault />
    </>
  )
}
