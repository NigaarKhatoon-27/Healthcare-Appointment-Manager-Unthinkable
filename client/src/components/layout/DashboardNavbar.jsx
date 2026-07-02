import { useAuth } from "../../context/AuthContext";

export default function DashboardNavbar() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back, {user?.fullName || "User"} 👋
        </p>

      </div>

      <div className="flex items-center gap-4">

        <img
          src={
            user?.profileImage ||
            "https://ui-avatars.com/api/?name=User&background=2563EB&color=fff"
          }
          alt="Profile"
          className="h-12 w-12 rounded-full border-2 border-blue-500 object-cover"
        />

      </div>

    </header>
  );
}