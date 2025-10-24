import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "../api/employees";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Employee {
  id: number;
  name: string;
  position: string;
  base_salary: number;
  allowances: number;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
      toast.success("Employee deleted successfully", {
        description: "The employee has been removed from the system.",
      });
    } catch (error) {
      toast.error("Failed to delete employee", {
        description: "An error occurred while deleting the employee.",
      });
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelected(employee);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    try {
      await updateEmployee(selected.id, selected);
      setOpen(false);
      fetchEmployees();
      toast.success("Employee updated successfully", {
        description: "The employee information has been updated.",
      });
    } catch (error) {
      toast.error("Failed to update employee", {
        description: "An error occurred while updating the employee.",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Employees</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Base Salary</TableHead>
            <TableHead>Allowances</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="font-medium">{emp.name}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.base_salary.toLocaleString()} MAD</TableCell>
              <TableCell>{emp.allowances.toLocaleString()} MAD</TableCell>
              <TableCell className="font-semibold">
                {(emp.base_salary + emp.allowances).toLocaleString()} MAD
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(emp)}
                  className="mr-2"
                >
                  Edit
                </Button>

                {/* Delete confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{emp.name}</span>? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(emp.id)}
                        className="!bg-red-600 !text-white hover:!bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={selected.name}
                  onChange={(e) =>
                    setSelected({ ...selected, name: e.target.value })
                  }
                  placeholder="Employee name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={selected.position}
                  onChange={(e) =>
                    setSelected({ ...selected, position: e.target.value })
                  }
                  placeholder="Job position"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base_salary">Base Salary (MAD)</Label>
                <Input
                  id="base_salary"
                  type="number"
                  value={selected.base_salary}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      base_salary: Number(e.target.value),
                    })
                  }
                  placeholder="Base salary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowances">Allowances (MAD)</Label>
                <Input
                  id="allowances"
                  type="number"
                  value={selected.allowances}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      allowances: Number(e.target.value),
                    })
                  }
                  placeholder="Additional allowances"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
