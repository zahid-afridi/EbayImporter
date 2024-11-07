import React, { useEffect, useState } from 'react';
import PriceCard from '../components/PriceCard';
import Spinner from '../components/Spinner';

export default function Pricing() {
  const [packages,setPackages]=useState([])
  const [loading,setLoading]=useState(false)
  console.log('packages form state',packages)

  useEffect(()=>{
GetPackages()
  },[])
   
  const GetPackages=async()=>{
    try {
      setLoading(true)
      const response=await fetch('/api/packages/EbayPackage')
      const data= await response.json()
      console.log('packages',data)
      setPackages(data.Pakages)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      
    }
  }
  const handleBuy=async(id)=>{
    alert(id)
  }
  if (loading) {
    return <Spinner/>
  }
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Choose Your Pricing Plan</h2>
            {/* <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        
           
           
          {packages && packages.map((item)=>{
            return(
           <PriceCard item={item} handleBuy={()=>handleBuy(item._id)} />

            )
          })}           
        
          
          
        </div>
    </div>
  </section>
  );
}
