import { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeModal from "../components/AddEmployeeModal";

export default function Employees() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <AddEmployeeModal onAdded={() => setRefreshKey((k) => k + 1)} />
      </div>
      <EmployeeList key={refreshKey} />
    </div>
  );
}
