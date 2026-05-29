export default function DatabaseErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-red-100 px-10 py-6 rounded-2xl shadow text-center flex items-center gap-6">

        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
          ✖
        </div>

        <h2 className="text-2xl font-bold text-red-900">
          Database Tidak Tersedia
        </h2>

      </div>
    </div>
  );
}