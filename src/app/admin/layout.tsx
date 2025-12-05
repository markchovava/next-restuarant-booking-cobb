import AsidePrimary from "@/_components/asides/AsidePrimary";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
   
  <div
        className={`antialiased flex justify-start overflow-hidden h-screen w-full`}>
        <AsidePrimary />
        <main className="flex-1 h-full overflow-auto">
          {children}
        </main>
  </div>
      
  );
}
