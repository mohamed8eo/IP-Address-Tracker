// store/countery.js
import { create } from 'zustand';
//https://geo.ipify.org/api/v2/country,city?apiKey=at_kkk1j0pIrumYAiDzaUEN4p7Cr0xYy&ipAddress=8.8.8.8
export const uselocationInfo = create((set, get) => ({
  ipAddress: '192.212.174.101', 
  location: null,
  coordinates: [34.505, -0.03],

  setIpAddress: (ip) => set({ ipAddress: ip }),
  fetchLocation: async () => {
    const { ipAddress } = get();

    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_kkk1j0pIrumYAiDzaUEN4p7Cr0xYy&ipAddress=${ipAddress}`
      );
      if (!res.ok) throw new Error('Failed to fetch location data');

      const data = await res.json();
      set({
        location: data,
        coordinates : [data.location.lat, data.location.lng],
      });
    } catch (err) {
      console.error(`Fetch error: ${err.message}`);
    }
  }
}));
