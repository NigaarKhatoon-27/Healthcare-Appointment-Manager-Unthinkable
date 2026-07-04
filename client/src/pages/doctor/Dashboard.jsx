import DoctorStats from "../../components/doctor/DoctorStats";
import AppointmentTable from "../../components/doctor/AppointmentTable";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Doctor Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's an overview of your practice.
          </p>

        </div>

      </div>

      {/* Dashboard Statistics */}

      <DoctorStats />

      {/* Recent Appointments */}

      <AppointmentTable />

    </div>
  );
}