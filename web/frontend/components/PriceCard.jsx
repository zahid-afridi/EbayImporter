import React from 'react'

export default function PriceCard({item,handleBuy}) {

  return (
   <>
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">{item.packageName}</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{item.packageDesc}</p>
                <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">${item.packagePrice}</span>
                    {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
                </div>
               
                <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                       
                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Ebay Import Produts: <span className="font-semibold">{item.packageEbayImportNumber}</span></span>

                    </li>
                    
                  {
                    item.packageCsvImportNumber ? (  <li className="flex items-center space-x-3">
                     
                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Csv Produts: <span className="font-semibold">{item.packageCsvImportNumber}</span></span>
                    </li>):""
                  }
                  
                </ul>
                <a href="#" className="text-white bg-purple-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900" onClick={handleBuy}>Get started</a>
            </div>
   </>
  )
}
