import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { uselocationInfo } from './store/countery'; // import your Zustand store
import LeafletMap from './components/LeafletMap';



const App = () => {
  const isMobile = useMediaQuery({
    query: '(max-width : 600px )',
  });

  // Get needed data and actions from your Zustand store
  const { location, ipAddress, setIpAddress, fetchLocation , coordinates} = uselocationInfo();

  // Local state to handle input and errors
  const [ipvalue, setipvalue] = useState('');
  const [error, setError] = useState('');

  // Validate IP format
  const validateIp = (ip) => {
    if (!ip.trim()) return false;
    const regex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    return regex.test(ip);
  };

  // Allow only digits and dots in input
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[0-9.]*$/.test(value)) {
      setipvalue(value);
    }
  };

  // When form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateIp(ipvalue)) {
      setError('Please enter a valid IP address');
      return;
    }
    setError('');
    // Update the IP in Zustand store
    setIpAddress(ipvalue);
    // Fetch new location data for the updated IP
    fetchLocation();
  };

  // Optionally, fetch location for default IP on mount
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // Prepare location info for rendering, safely accessing nested props
  const location_info = {
    "IP Address": location?.ip || 'Loading...',
    Location: location?.location
      ? `${location.location.region}, ${location.location.country}`
      : 'Loading...',
Timezone: location?.location?.timezone ? `UTC ${location.location.timezone}` : 'Loading...',
    ISP: location?.isp || "Google LLC",
  };

  return (
    <>
    <div
      className={`${
        isMobile ? 'bg-mobile' : 'bg-desktop'
      } h-64 w-full bg-no-repeat bg-cover flex items-center justify-center flex-col gap-10`}
    >
      <h1 className="font-bold text-white text-3xl">IP Address Tracker</h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col mb-21"
      >
        <div className="flex flex-row justify-center items-center">
          <input
            type="text"
            name="Ip"
            onChange={handleInputChange}
            value={ipvalue}
            required
            placeholder="Search for any IP Address"
            className="bg-white w-[445px] h-[50px] rounded-bl-2xl rounded-tl-2xl py-2.5 px-4 outline-0 placeholder:text-[#969696] placeholder:font-medium font-bold  text-lg"
          />

          <button
            type="submit"
            className="cursor-pointer bg-black hover:bg-[#2b2b2b] h-[52px] w-[45px] rounded-tr-2xl rounded-br-2xl flex justify-center items-center"
          >
            <img src="./images/icon-arrow.svg" alt="arrow icons" />
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <ul className="flex gap-6 bg-white w-[935px] justify-around items-center h-[130px] z-1000 absolute top-[39%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 px-7 rounded-2xl"
      style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
      >
        {Object.entries(location_info).map(([key, value]) => (
          <li key={key} className=' basis-[25%] rightborder flex justify-center flex-col gap-1.5'>
            <span className='block text-[10px] uppercase text-[#969696] font-bold'>{key}</span>
            <span className='block font-bold text-2xl mb-2.5'>{value}</span>
          </li>
        ))}
      </ul>
    </div>
      <div>
        <LeafletMap center={coordinates}/>
      </div>
    </>
  );
};

export default App;
