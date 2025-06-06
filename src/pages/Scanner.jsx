import React, { useState, useEffect, useRef } from "react";
import { Ticket } from "@/api/entities";
import { QrCode, Camera, CheckCircle, XCircle, RotateCcw } from "lucide-react";

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
      setError(null);
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const validateTicket = async (qrData) => {
    try {
      // Simulate ticket validation
      const isValid = qrData.length > 10; // Simple validation
      
      setScanResult({
        isValid,
        data: qrData,
        timestamp: new Date(),
        ticketInfo: isValid ? {
          serial: qrData,
          event: "Sample Event",
          tier: "General Admission",
          buyer: "John Doe"
        } : null
      });
      
      stopScanning();
    } catch (error) {
      console.error("Error validating ticket:", error);
      setError("Error validating ticket");
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="neu-inset p-4 inline-block mb-4">
          <QrCode className="w-8 h-8 text-gray-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ticket Scanner</h1>
        <p className="text-gray-600">Scan QR codes to validate event tickets</p>
      </div>

      {/* Scanner Interface */}
      <div className="neu-card overflow-hidden">
        {!isScanning && !scanResult && (
          <div className="p-12 text-center">
            <div className="neu-inset p-8 inline-block mb-6">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Ready to Scan</h3>
            <p className="text-gray-500 mb-8">Position the QR code within the camera frame</p>
            <button
              onClick={startScanning}
              className="neu-button px-8 py-4 bg-blue-50"
            >
              <span className="font-semibold text-blue-700">Start Scanner</span>
            </button>
          </div>
        )}

        {isScanning && (
          <div className="relative aspect-square bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-white border-dashed rounded-2xl opacity-75"></div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={stopScanning}
                className="neu-button px-6 py-3 bg-red-50"
              >
                <span className="font-semibold text-red-700">Stop Scanner</span>
              </button>
            </div>
            {/* Simulated scan trigger */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => validateTicket("SAMPLE-QR-" + Date.now())}
                className="neu-button px-4 py-2 bg-green-50 text-xs"
              >
                <span className="font-semibold text-green-700">Simulate Scan</span>
              </button>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="p-8 text-center">
            <div className={`neu-inset p-6 inline-block mb-6 ${
              scanResult.isValid ? 'bg-green-50' : 'bg-red-50'
            }`}>
              {scanResult.isValid ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
            </div>
            
            <h3 className={`text-2xl font-bold mb-4 ${
              scanResult.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {scanResult.isValid ? 'Valid Ticket' : 'Invalid Ticket'}
            </h3>

            {scanResult.isValid && scanResult.ticketInfo && (
              <div className="neu-flat p-6 mb-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serial:</span>
                  <span className="font-semibold">{scanResult.ticketInfo.serial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-semibold">{scanResult.ticketInfo.event}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tier:</span>
                  <span className="font-semibold">{scanResult.ticketInfo.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Buyer:</span>
                  <span className="font-semibold">{scanResult.ticketInfo.buyer}</span>
                </div>
              </div>
            )}

            <button
              onClick={resetScanner}
              className="neu-button px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Scan Another</span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="neu-inset p-6 bg-red-50">
          <div className="flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}