import React from "react"
// import Header from "@/components/Header/Header";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <main className='main_wrapper'>
            {/* <Header /> */}
            {children}
        </main>
    )
}
