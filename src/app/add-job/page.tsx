export default function AddJob() {
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
          ➕ Add New Job
        </h1>
        <div className="p-12 border shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl border-white/50">
          <form className="space-y-6">
            <input placeholder="Job Title" className="w-full p-4 text-lg border rounded-2xl" />
            <input placeholder="Company" className="w-full p-4 text-lg border rounded-2xl" />
            <button className="w-full py-5 text-xl font-bold text-white shadow-xl bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl hover:shadow-2xl">
              Track Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}