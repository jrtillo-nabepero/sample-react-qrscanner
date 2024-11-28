import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const QrScannerPage = () => {
    const [data, setData] = useState('No result');

    const group_token = sessionStorage.getItem("group_token");

    const handleResult = async (result) => {
        if (result) {
            try{
                const response = await fetch(`http://localhost/api/v1/tablet/timestamp?uuid=${result[0]['rawValue']}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${group_token}`
                    },
                });
        
                const responseData = await response.json();
    
                if (!response.ok) {
                    toast.error(responseData.message ?? responseData.error);
                    return;
                }
        
                const studentName = responseData.data[0].name;
                setData(studentName);
                toast.success("Success!");
            } catch (error){
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 className='text-7xl mb-10'>QR Code Scanner</h1>
            <div style={{ width: '500px', margin: 'auto' }}>
                <Scanner
                    onScan={handleResult}
                    scanDelay={2000}
                    paused={false}
                    allowMultiple={true}
                    style={{ width: '100%' }}
                />
            </div>
            <h2 className='mt-10 text-5xl'>Student Name: {data}</h2>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default QrScannerPage