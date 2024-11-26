import React, { useState } from 'react';
import ParkingMap from './components/ParkingMap';
import BookingForm from './components/BookingForm';
import {BookingDetails,ConfirmationModal } from './components/BookingDetails';
import SearchForm from './components/SearchForm';
import dataParkir from './data/denah.json';

const App = () => {
  const [slots, setSlots] = useState(dataParkir);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState(slots); // Menyimpan hasil pencarian
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleSearch = (searchText, vehicleSize) => {
    let filtered = slots;

    console.log(searchText)
    // Filter berdasarkan nama tempat parkir
    if (searchText) {
      // console.log(searchText,slots.name.toLowerCase().includes(searchText.toLowerCase()))
      filtered = filtered.filter(slot =>
        slot.name.toLowerCase().replace("parkir").includes(searchText.toLowerCase())
      );
      console.log(filtered)
    }

    // Filter berdasarkan ukuran kendaraan
    if (vehicleSize) {
      filtered = filtered.filter(slot => slot.vehicleSize === vehicleSize);
    }

    setFilteredSlots(filtered); // Update slots yang ditampilkan
  };

  const handleBooking = (details) => {
    let slotToBook = selectedSlot; // Gunakan slot yang dipilih
    if (!slotToBook) {
      // Jika tidak ada slot yang dipilih, cari slot yang tersedia secara otomatis
      console.log("hasil data", slots)
      slotToBook = slots.find((slot) => !slot.occupied);
    }
  
    if (slotToBook) {
      // Ambil waktu saat ini
      const currentDateTime = new Date().toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:mm
      console.log("waktunya ni",currentDateTime)
      // Perbarui data slot
      const updatedSlots = slots.map((slot) =>
        slot.id === slotToBook.id
          ? Object.assign({}, slot, { startTime: currentDateTime, occupied: true, ...details })
          : slot
      );
      
      setSlots(updatedSlots);
  
      // Tambahkan ke daftar pemesanan
      const newBooking = { id: Date.now(), ...details, slot: slotToBook.name, startTime: currentDateTime }; // Generate ID unik untuk pemesanan baru
      setBookings((prevBookings) => [...prevBookings, newBooking]);
  
      // Reset pilihan slot
      setSelectedSlot(null);
      setShowModal(true);
    } else {
      alert('Maaf, semua tempat parkir sudah penuh!');
    }
};

  

const handleCancelBooking = (bookingId) => {
  // Cari pemesanan yang dibatalkan berdasarkan ID
  const cancelledBooking = bookings.find((booking) => booking.id === bookingId);

  if (cancelledBooking) {
    // Update status slot yang terkait dengan pemesanan terakhir menjadi tidak terisi
    const updatedSlots = slots.map((slot) =>
      slot.name === cancelledBooking.slot ? { ...slot, occupied: false } : slot
    );
    setSlots(updatedSlots);

    // Hapus pemesanan yang dibatalkan dari daftar bookings
    const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(updatedBookings);
    setShowModal(false);
  }
};

  

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  

  return (
    <div className="container mx-auto p-4">
      {/* Form Pencarian */}
      <SearchForm onSearch={handleSearch} />
      
      <div className='text-center flex flex-col items-center mt-5'>
        <h1 className='text-white font-extrabold text-2xl mb-2'>Lokasi Tempat Parkir</h1>
        <div className=' w-full md:w-fit p-3 relative overflow-auto flex justify-start md:justify-center items-center border'>
          <h1 className=' absolute left-2' style={{ writingMode: 'vertical-rl' }}>UTARA</h1>
          <h1 className=' absolute left-80 bottom-2 ps-7'>BARAT</h1>
          <h1 className=' absolute left-80 top-2 ps-8'>TIMUR</h1>
          <h1 className=' absolute -right-96 md:right-2' style={{ writingMode: 'vertical-rl' }}>SELATAN</h1>
          {/* Denah Tempat Parkir */}
          <ParkingMap slots={slots} filteredSlots={filteredSlots} selectedSlot={selectedSlot} onSlotSelect={handleSlotSelect}/>
        </div>
        {/* Form Pemesanan */}
        <div className=' w-full xl:w-7/12 my-3'>
          <h1 className=' text-2xl font-extrabold'>Formulir Parkir</h1>
          <BookingForm onSubmit={handleBooking} />
        </div>
      </div>

      {/* Modal Konfirmasi Pembatalan */}
      {bookings.length > 0 && showModal && (
        <ConfirmationModal
          onConfirm={(e)=>{
            setShowDetailModal(true)
            setShowModal(false)
          }}
          onCancel={() => handleCancelBooking(bookings[bookings.length - 1].id)}  // Pembatalan pemesanan
        />
      )}

      {/* tampilan booking detail */}
      {bookings.length > 0 && showDetailModal && (
        <BookingDetails
          details={bookings[bookings.length - 1]}
          onClose={(e)=>setShowDetailModal(false)}
        />
      )}


    </div>
  );
};

export default App;
