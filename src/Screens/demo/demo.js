import React, { useState, useRef } from 'react';
// import './App.css'; // Add your CSS styles here

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const BASE_URL = 'https://devapi.archcitylms.com/lectures';

const ChunkedFileUpload = () => {
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [cloudinaryResponse, setCloudinaryResponse] = useState(null);
    const [uploadTime, setUploadTime] = useState(null);
    const fileInputRef = useRef(null);
    const connectionId = useRef('');

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            uploadFile(files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            uploadFile(files[0]);
        }
    };

    const uploadFile = async (file) => {
        connectionId.current = crypto.randomUUID();
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        setUploadStatus(`Uploading ${file.name}...`);
        setUploadProgress(0);

        const startTime = Date.now();

        const eventSource = new EventSource(`${BASE_URL}/progress/${connectionId.current}`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.status === 'success') {
                const endTime = Date.now();
                setUploadTime(((endTime - startTime) / 1000).toFixed(2));
                setUploadStatus('Upload Complete!');
                setCloudinaryResponse(data.cloudinaryResponse);
                setUploadProgress(100);
                eventSource.close();
            } else if (data.status === 'error') {
                setUploadStatus(`Error: ${data.error}`);
                eventSource.close();
            }
        };

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('chunkIndex', chunkIndex.toString());
            formData.append('totalChunks', totalChunks.toString());
            formData.append('fileName', file.name);
            formData.append('connectionId', connectionId.current);
            formData.append('file', chunk);

            try {
                const response = await fetch(`${BASE_URL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                setUploadProgress(((chunkIndex + 1) / totalChunks) * 100);
            } catch (error) {
                setUploadStatus(`Upload failed: ${error.message}`);
                eventSource.close();
                break;
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="upload-container">
            <div 
                className="drop-zone" 
                onDrop={handleDrop} 
                onDragOver={handleDragOver}
            >
                <h2>Drag and Drop Large File for Upload</h2>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
                <button onClick={() => fileInputRef.current.click()}>Select File</button>
            </div>

            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${uploadProgress}%` }}
                ></div>
            </div>

            {uploadStatus && <div className="status">{uploadStatus}</div>}
            {uploadTime && <div className="upload-time">Upload Time: {uploadTime} seconds</div>}

            {cloudinaryResponse && (
                <div className="cloudinary-response">
                    <strong>Cloudinary Response:</strong>
                    <pre>{JSON.stringify(cloudinaryResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ChunkedFileUpload;
