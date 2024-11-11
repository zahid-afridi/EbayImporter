import React, { useEffect, useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import csvtojson from 'csvtojson';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components';

export default function UploadCsv() {
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track all async loading states
  const [uploadMessage, setUploadMessage] = useState(''); // Track upload status message
  const { StoreDetail } = useSelector((state) => state.StoreSlice);
  const [storeBilling, setStoreBilling] = useState({});
  const [spinner, setSpinner] = useState(false);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  useEffect(() => {
    const getBilling = async () => {
      try {
        setSpinner(true); // Set loading to true when fetching billing data
        const response = await fetch(`/api/billing/getBilling?StoreId=${StoreDetail.Store_Id}`);
        const data = await response.json();
        setStoreBilling(data.StorePayment);
        setSpinner(false);
      } catch (error) {
        console.error('Error fetching billing data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after the fetch completes
      }
    };

    if (StoreDetail?.Store_Id) getBilling();
  }, [StoreDetail]);

  const handleUpload = () => {
    if (!file) return;

    setLoading(true);
    setUploadMessage('Processing CSV file... you can leave this page'); // Show processing message
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvData = event.target.result;
        const jsonArray = await csvtojson({ noheader: true, output: 'json' }).fromString(csvData);
        const dataToInsert = jsonArray.map((row) => ({ asin: row.field1 }));
        
        // Fetch ASIN data in the background using async calls
        await fetchAsinDataInBackground(dataToInsert);
        
        setFile(null);
        setLoading(false);
        setUploadMessage(''); // Hide message after processing CSV
        toast.success('CSV processed successfully!');
        refreshBillingState(); // Refresh the billing state
        // navigate('/some-other-page'); // Navigate to another page (e.g., pricing page) after processing
      } catch (error) {
        toast.error('Error processing CSV: ' + error.message);
        setLoading(false);
        setUploadMessage('Error processing CSV'); // Show error message
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setLoading(false);
      setUploadMessage('Error reading file'); // Show file read error
    };

    reader.readAsText(file);
  };

  const fetchAsinDataInBackground = async (dataToInsert) => {
    setIsLoading(true); // Set loading to true before starting the API calls

    const asinPromises = dataToInsert.map((item) =>
      fetch(`/api/upload/file/?Shop_id=${StoreDetail.Store_Id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asin: item.asin }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success(`Product ${item.asin} fetched successfully!`);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error('Error fetching ASIN data: ' + error.message);
        })
    );

    // Wait for all API calls to finish (in parallel)
    await Promise.all(asinPromises);

    setIsLoading(false); // Set loading to false once all API calls are complete
  };

  const refreshBillingState = async () => {
    // Refresh the billing state after CSV processing
    try {
      setSpinner(true);
      const response = await fetch(`/api/billing/getBilling?StoreId=${StoreDetail.Store_Id}`);
      const data = await response.json();
      setStoreBilling(data.StorePayment);
      setSpinner(false);
    } catch (error) {
      console.error('Error refreshing billing data:', error);
      setSpinner(false);
    }
  };

  const handleNavigate = () => {
    navigate('/Pricing');
  };

  if (spinner) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl p-4 mb-4 text-center bg-green-100 text-green-700 rounded-lg shadow-lg">
        You have {storeBilling && storeBilling.csvProductNumber} Products Remaining
      </div>

      {/* Upload Status Message */}
      {uploadMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 text-white text-lg">
          {uploadMessage}
        </div>
      )}

      {/* Main UI for Uploading CSV */}
      {storeBilling && storeBilling.csvProductNumber > 0 ? (
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
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-4">You have reached your product limit!</h1>
          <button
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-gradient-to-l transition-all duration-300"
            onClick={handleNavigate}
          >
            Upgrade Plan
          </button>
        </div>
      )}
    </div>
  );
}
