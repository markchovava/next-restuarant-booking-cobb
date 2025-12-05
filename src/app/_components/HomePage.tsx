"use client"
import HeaderPrimary from "@/_components/headers/HeaderPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import HomeFormSection from "./HomeFormSection";
import HomeResultSection from "./HomeResultSection";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import HomeFormModal from "./HomeFormModal";


export default function HomePage() {
  return (
    <>
    <main 
          style={{backgroundImage: `url(/assets/img/01_bg.jpg)`}} 
          className="w-full bg-fixed bg-cover min-h-screen overflow-y-auto">
          
          <HeaderPrimary />
    
          <SpacerPrimary />
          <HomeFormSection />
    
          <SpacerSecondary />
    
          <HomeResultSection />
          
          <SpacerTertiary />
    </main>

    <HomeFormModal />
    </>
  )
}
