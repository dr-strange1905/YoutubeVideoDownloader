"use client";
import { useState } from "react";
import axios from "axios";

export default function Input() {
    const [isClicked, setIsClicked] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [videoLink, setVideoLink] = useState("");
    const [finalLink, setFinalLink] = useState("");
    const [showDownload, setShowDownload] = useState(false);

    const handleDownload = async () => {
        setIsClicked(true);
        setIsProcessing(true);

        setTimeout(() => setIsClicked(false), 200);
        try {
            const res = await axios.get(`/api/downloader?url=${videoLink}`);
            setFinalLink(res.data.format.url);
            setShowDownload(true);
        } catch (error) {
            console.log(error);
            alert("Failed to process the video. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-8">
            <div className="container mx-auto px-6 text-center">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">Download Your Content</h1>

                {/* Input and Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Enter the URL..."
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        className="w-full sm:w-2/3 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        className={`px-6 py-3 rounded-lg text-white font-bold bg-blue-700 border-2 hover:bg-blue-800 ${isClicked
                            ? "bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            : ""
                            }`}
                        onClick={handleDownload}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : "Convert"}
                    </button>
                </div>


                {isProcessing && (
                    <div className="flex justify-center mt-4">
                        <div className="loader border-t-4 border-blue-500 w-10 h-10 rounded-full animate-spin"></div>
                    </div>
                )}


                {showDownload && !isProcessing && (
                    <div className="bg-black mt-6 rounded-md items-center justify-center">
                        <video src={finalLink} controls type="video/mp4"></video>
                    </div>
                )}
            </div>


            <style jsx>{`
                .loader {
                    border: 4px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}


