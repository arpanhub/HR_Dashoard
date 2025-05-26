"use client";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast";

interface ProvidersProps{
  children:React.ReactNode;
  session?:any
}
function SessionWrapper({children,session}:ProvidersProps){
  return (
    <SessionProvider session={session}>
        {children}
      <Toaster/>
    </SessionProvider>
  )
}

export default SessionWrapper