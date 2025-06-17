"use client"
import { useRouter } from "next/navigation"



export default function NotFound(){
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50"> 
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* <Navbar /> */}

        <div className="flex flex-col justify-center items-center gap-10 h-screen">
            <h2>The Route Your are Looking Doesn&apos;t Exist</h2>
            <button className="px-8 py-2 rounded-md bg-gradient-to-r from-orange-400 to-orange-600 cursor-pointer text-white" onClick={() => router.push('/')}>
                Go Back
            </button>
        </div>
      </div>
      </div>
    )
}