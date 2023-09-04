'use client'
import { useEffect, useState } from "react"
import Loading from "./loading";

export default function Template({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoading(false);
        }
    }, [])
    if (loading) return <Loading />
    return <>{children}</>
}