import React, { useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import csvtojson from 'csvtojson';
import toast from 'react-hot-toast';

export default function UploadCsv() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remainingProducts, setRemainingProducts] = useState(25);
  const { StoreDetail } = useSelector((state) => state.StoreSlice);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleUpload = () => {
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvData = event.target.result;
        const jsonArray = await csvtojson({ noheader: true, output: 'json' }).fromString(csvData);
        const dataToInsert = jsonArray.map((row) => ({ asin: row.field1 }));
        await fetchAsinDataInBackground(dataToInsert);
        setFile(null);
        setLoading(false);
        toast.success('CSV processed successfully!');
      } catch (error) {
        toast.error('Error processing CSV: ' + error.message);
        setLoading(false);
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setLoading(false);
    };

    reader.readAsText(file);
  };

  const fetchAsinDataInBackground = async (dataToInsert) => {
    for (const item of dataToInsert) {
      try {
        const response = await fetch(`/api/upload/file/?Shop_id=${StoreDetail.Store_Id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ asin: item.asin }),
        });
        const data = await response.json();
        console.log('data csv',data)
        if (data.success) {
          toast.success(`Product ${item.asin} fetched successfully!`);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error fetching ASIN data: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl p-4 mb-4 text-center bg-green-100 text-green-700 rounded-lg shadow-lg">
        You have {remainingProducts} Products Remaining
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
          <p className="text-sm text-blue-700">
            Make sure your CSV file contains only valid eBay product IDs in the first column. No headers required.
          </p>
        </div>

        <div 
          className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 flex flex-col items-center cursor-pointer"
          onClick={() => document.getElementById('csv-upload-input').click()}
        >
          <FaFileCsv className="text-green-500 text-6xl mb-4" />
          <label className="block text-center text-gray-500 mb-2">Click to Choose CSV File!</label>
          <input
            id="csv-upload-input"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          onClick={handleUpload}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${file && !loading ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!file || loading}
        >
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>
    </div>
  );
}
