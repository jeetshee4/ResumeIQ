import Sidebar from "../components/layout/Sidebar";
import DashboardContent from "../components/dashboard/DashboardContent";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <DashboardContent />
      </main>
    </div>
  );
}

export default Dashboard;