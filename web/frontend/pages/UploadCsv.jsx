import React, { useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';

export default function UploadCsv() {
  const [file, setFile] = useState(null);
  const [remainingProducts, setRemainingProducts] = useState(25);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading CSV file:', file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Products Remaining Bar */}
      <div className=" max-w-4xl p-4 mb-4 text-center bg-green-100 text-green-700 rounded-lg shadow-lg">
        You have {remainingProducts} Products Remaining
      </div>

      {/* Upload Box */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
          <p className="text-sm text-blue-700">
            Make sure your CSV file contains only valid eBay product IDs in the first column. No headers required.
          </p>
        </div>

        {/* CSV File Upload Box */}
        <div 
          className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 flex flex-col items-center cursor-pointer"
          onClick={() => document.getElementById('csv-upload-input').click()}
        >
          <FaFileCsv className="text-green-500 text-6xl mb-4" />
          <label className="block text-center text-gray-500 mb-2">Click to Choose CSV File</label>
          <input
            id="csv-upload-input"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${file ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!file}
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
}
