import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const shortenUrl = async () => {
    try {
      const response = await axios.post(
        'https://url-shortener-service.p.rapidapi.com/shorten',
        { url: longUrl },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '8a84021c59msh37b14f4a9c97d5cp118a92jsn6ecdd425e772',
            'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
          }
        }
      );
      setShortenedUrl(response.data.result_url);
      setErrorMessage(''); // Reset error message if request succeeds
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid URL'); // Set error message for invalid URL
      } else {
        setErrorMessage('An error occurred'); // Set generic error message
      }
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-cover h-screen font-poppins" style={{ backgroundImage: "url('https://www.desktopbackground.org/download/2520x1080/2012/12/23/503554_disney-x-ghibli-wallpapers-i-made-imgur_3300x2550_h.jpg')", backgroundPosition: "right" }}>
    <div className="container mx-auto h-full flex flex-col justify-top">
      <h1 className="text-3xl font-bold  text-center text-white p-8 font-bungee ">CUTUrl.com</h1>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter Long URL"
        className="w-full py-2 px-4 mb-6 border  border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-400 bg-white"
      />
      <button onClick={shortenUrl} className="w-full py-3 px-6  bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300">
        Shorten
      </button>
      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
      {shortenedUrl && !errorMessage && (
        <div className="mt-4">
          <p className="font-semibold text-black ">Shortened URL:</p>
          <div className="flex items-center justify-between bg-gray-100 border mb-24 border-gray-300 rounded-lg p-3">
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{shortenedUrl}</a>
            <button onClick={() => copyToClipboard(shortenedUrl)} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Copy</button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default UrlShortener;
