import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [vehicleSize, setVehicleSize] = useState('');

  // State untuk menyimpan debounce timer
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Handle perubahan teks dengan debounce
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);

    // Hapus timer sebelumnya
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set timer baru untuk debounce
    const newTimer = setTimeout(() => {
      onSearch(newValue, vehicleSize); // Panggil fungsi filter di App.js
    }, 300); 
    setDebounceTimer(newTimer);
  };

  // Handle perubahan radio button 
  const handleVehicleSizeChange = (e) => {
    const newSize = e.target.value;
    setVehicleSize(newSize);
    onSearch(searchText, newSize); 
  };


  return (
    <nav className='w-full border-b-[1px] pb-4 border-gray-400 px-5 md:px-20'>
      <div className='grid grid-cols-5 my-3' id='header'>
        <div className=' col-span-2 md:col-span-1 w-full flex items-center' id="icons-page">
          <h1 className=' font-bold text-xl'>ParkingApps</h1>
        </div>
        <div className='w-full col-span-3 flex justify-center items-center'>
            <input
              type="text"
              value={searchText}
              onChange={handleTextChange}
              className="border p-2 w-full rounded-md h-10 text-black"
              placeholder="Cari tempat parkir..."
            />
        </div>
      </div>

      <div className="flex gap-2 text-xs">
        <label
          className={`flex items-center p-2 rounded ${
            vehicleSize === "" ? "bg-blue-900" : ""
          }`}
        >
          <input
            type="radio"
            name="vehicleSize"
            value=""
            checked={vehicleSize === ""}
            onChange={handleVehicleSizeChange}
            className="mx-1 appearance-none"
          />
          Semua Jenis Kendaraan
        </label>
        <label
          className={`flex items-center p-2 rounded ${
            vehicleSize === "small" ? "bg-blue-900" : ""
          }`}
        >
          <input
            type="radio"
            name="vehicleSize"
            value="small"
            checked={vehicleSize === "small"}
            onChange={handleVehicleSizeChange}
            className="mx-1 appearance-none"
          />
          Kendaraan Kecil
        </label>
        <label
          className={`flex items-center p-2 rounded ${
            vehicleSize === "large" ? "bg-blue-900" : ""
          }`}
        >
          <input
            type="radio"
            name="vehicleSize"
            value="large"
            checked={vehicleSize === "large"}
            onChange={handleVehicleSizeChange}
            className="mx-1 appearance-none"
          />
          Kendaraan BesarBesar
        </label>
      </div>

    </nav>
  );
};

export default SearchForm;
