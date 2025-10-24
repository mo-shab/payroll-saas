import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeTable from "@/components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export default function Employees() {
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAdded = () => {
    setRefresh(!refresh);
    setOpen(false); // close modal after submit
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>

        {/* Add Employee button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Employee</Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>

            <EmployeeForm onAdded={handleAdded} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Employee List */}
      <EmployeeTable key={refresh ? "refresh" : "normal"} />
    </div>
  );
}
