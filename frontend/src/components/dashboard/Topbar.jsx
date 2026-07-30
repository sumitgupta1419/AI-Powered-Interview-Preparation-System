import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (

    <header className="flex justify-between items-center p-6 border-b border-slate-800">

      <div className="relative">

        <FaSearch className="absolute top-4 left-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-slate-900 rounded-xl pl-12 pr-4 py-3 w-96 outline-none"
        />

      </div>

      <div className="flex items-center gap-6">

        <FaBell
          className="text-2xl cursor-pointer hover:text-cyan-400"
        />

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-cyan-400" />

          <div>

            <h3 className="font-semibold">
              Sumit
            </h3>

            <p className="text-gray-400 text-sm">
              AI Developer
            </p>

          </div>

        </div>

      </div>

    </header>

  );
}

export default Topbar;