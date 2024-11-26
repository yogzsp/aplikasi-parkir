import { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username && vehicle && duration){
        onSubmit({ username, vehicle, duration });
        setUsername("")
        setVehicle("")
        setDuration("")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Nama"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full rounded-md text-black"
      />
      <input
        type="text"
        placeholder="Nomor Kendaraan"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
        className="border p-2 w-full rounded-md text-black"
      />
      <input
        type="number"
        placeholder="Durasi (jam)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 w-full rounded-md text-black"
      />
      <button type="submit" className="bg-blue-900 text-white p-2 w-full rounded-md" data-modal-target="default-modal" data-modal-toggle="default-modal">
        Parkir
      </button>
    </form>
  );
};

export default BookingForm;
