import React, { useState, useRef } from 'react';
import axios from 'axios';

function App() {
    const videoRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);

    const captureImage = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        const imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
        const capturedBlob = await imageCapture.takePhoto();
        setCapturedImage(capturedBlob);
    };

    const sendImageToServer = async () => {
        if (capturedImage) {
            const formData = new FormData();
            formData.append('image', capturedImage);

            try {
                const response = await axios.post('http://43.202.84.110:5000//predict', formData);
                console.log(response.data); // 서버 응답 데이터 콘솔 출력
                setPredictionResult(response.data);
            } catch (error) {
                console.error('Error sending image to server:', error);
            }
        }
    };

    return (
        <div>
            <div className='col-span-2 row-span-2 col-start-2 row-start-4'>
                <video ref={videoRef} autoPlay />
                <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-500 rounded' onClick={captureImage}>Capture Image</button>
                <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-500 rounded' onClick={sendImageToServer}>Send to Server</button>


                {capturedImage && (
                    <div className=''>
                        <h2 className='text-xl text-white'>Captured Image:</h2>
                        <img src={URL.createObjectURL(capturedImage)} alt="Captured" />
                    </div>
                )}
            </div>
            <div className='col-span-2 row-span-2 col-start-4 row-start-1'>
                {predictionResult && (
                    <div className='text-xl text-white'>
                        <h2>Prediction Result:</h2>
                        <p>Class: {predictionResult.class}</p>
                    </div>
                )}
            </div>


        </div>
    );
}

export default App;