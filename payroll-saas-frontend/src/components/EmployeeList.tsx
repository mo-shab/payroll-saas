// src/components/EmployeeList.tsx
import { useEffect, useState } from "react";
import { getEmployees } from "../api/employees";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);

  const fetchEmployees = () =>
    getEmployees().then(setEmployees).catch(console.error);

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Gross Salary</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.base_salary + emp.allowances} MAD</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
