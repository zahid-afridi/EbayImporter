import React from 'react'

export default function RemainingDays() {
  return (<>
    

    <div className="max-w-3xl mx-auto p-4 mb-4 border-l-4 border-green-600 bg-green-100 rounded-lg shadow-lg">
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 11-10 10A10 10 0 0112 2zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v5h-2zm0 6h2v2h-2z" />
      </svg>
    </div>
    <div className="ml-3">
      <h3 className="text-lg font-bold text-green-800">Reminder!</h3>
      <div className="mt-2 text-green-700">
       
        <p className="mt-3">You have only 10 imports Remaining. Then You will have to subscribe our offer!!!</p>
      </div>
      <div className="mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          Learn More
        </button>
      </div>
    </div>
  </div>
</div>


    </>
  )
}
