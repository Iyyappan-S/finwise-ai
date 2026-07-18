function Navbar() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Financial Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Manage your money intelligently
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-slate-500">
            {user?.email || ""}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;