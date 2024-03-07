import React, { useState } from 'react';

export const Qrcode = () => {
    let [img, setImg] = useState('');
    let [loading, setLoading] = useState(false);
    let [qrgen, setQrgen] = useState('https://github.com/');
    let [qrSize, setQrSize] = useState('150');

    async function generateQR() {
        setLoading(true);
        try {
            let url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrgen}`;
            setImg(url);
        } catch (error) {
            alert("Error Generating QR Code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        fetch(img)
            .then((qrcoderes) => qrcoderes.blob())
            .then((blob) => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = 'qr.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error('Error downloading QR code:', error);
            });
    }


    return (
        <div className='app-container'>
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please Wait.....</p>}
            {img && <img src={img} className='qr-code-image' alt="QR Code" />}
            <div>
                <label htmlFor='dataInput' className='input-label'>
                    Data for QR Code
                </label>
                <input type='text' id='dataInput' value={qrgen} placeholder='Enter data for QR Code' onChange={(e) => { setQrgen(e.target.value) }} />
                <label htmlFor='sizeInput' className='input-label'>
                    Image Size (e.x ..., 150):
                </label>
                <input type='text' id='sizeInput' placeholder='Enter image Size' value={qrSize} onChange={(e) => { setQrSize(e.target.value) }} />
                <button className='generate-button' onClick={generateQR} disabled={loading}>Generate QR Code</button>
                <button className='download-button' onClick={downloadQR} disabled={!img}>Download QR Code</button>
            </div>
        </div>
    )
}
