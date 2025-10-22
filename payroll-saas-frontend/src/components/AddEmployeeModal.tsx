import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmployeeForm from "./EmployeeForm";

export default function AddEmployeeModal({ onAdded }: { onAdded: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Employee</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <EmployeeForm onAdded={onAdded} />
      </DialogContent>
    </Dialog>
  );
}
