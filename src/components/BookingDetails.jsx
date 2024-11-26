import React from "react";

const BookingDetails = ({ details, onClose }) => {
  console.log(details);
  const formattedStartTime = new Date(details.startTime).toLocaleString();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg w-2/3 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Rincian Pemesanan</h2>
        <p><strong>Nama Pengendara:</strong> {details.username}</p>
        <p><strong>Plat Nomor:</strong> {details.vehicle}</p>
        <p><strong>Tempat Parkir:</strong> {details.slot}</p>
        <p><strong>Waktu Mulai:</strong> {formattedStartTime}</p>
        <p><strong>Durasi:</strong> {details.duration} jam</p>

        <div className="mt-4">
          <button
            onClick={onClose} // Fungsi ini hanya menutup modal
            className="bg-gray-500 text-white p-2 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-5 rounded-md w-2/3 md:w-1/3">
        <h3 className="text-xl font-semibold">Konfirmasi Parkir</h3>
        <p className="mt-2">Apakah Anda yakin ingin parkir di tempat tersebut?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};



export {
  BookingDetails,
  ConfirmationModal
};
