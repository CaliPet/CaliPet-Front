import { SpeedInsights } from "@vercel/speed-insights/react"
import { Header } from "@/components/header"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from 'react';

export default function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    
      <SpeedInsights/>
    </>
  )
}