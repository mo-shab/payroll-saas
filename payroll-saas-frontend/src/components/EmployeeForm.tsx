import React, { useState } from "react";
import { createEmployee } from "../api/employees";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function EmployeeForm({ onAdded }: { onAdded?: () => void }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createEmployee({
        name,
        position,
        base_salary: Number(baseSalary),
        allowances: Number(allowances),
      });

      // Reset form
      setName("");
      setPosition("");
      setBaseSalary("");
      setAllowances("");

      if (onAdded) onAdded();
    } catch (error) {
      console.error("Failed to add employee:", error);
      // Optional: Add a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div className="space-y-2">
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Job Title</Label>
            <Input
              id="position"
              type="text"
              placeholder="Enter job title"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseSalary">Base Salary (MAD)</Label>
            <Input
              id="baseSalary"
              type="number"
              placeholder="Enter base salary"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowances">Allowances (MAD)</Label>
            <Input
              id="allowances"
              type="number"
              placeholder="Enter allowance value (if any)"
              value={allowances}
              onChange={(e) => setAllowances(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" variant="secondary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Employee Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
