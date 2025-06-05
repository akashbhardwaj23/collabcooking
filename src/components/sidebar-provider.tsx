'use client'
import { usePathname } from "next/navigation"
import Sidebar from "./sidebar";


export default function SidebarProvider({
    children
} : {
    children : React.ReactNode
}){ 
    const pathname = usePathname();
    
    // console.log("pathname ", pathname)
    if(pathname.includes('/home') || pathname.includes("/generator") || pathname.includes('/favourites') || pathname.includes('/my-recipes')){
        return (
            <>
        <Sidebar pathname={pathname} />
        {children}
        </>
        )
    }
    
    return children
       
}