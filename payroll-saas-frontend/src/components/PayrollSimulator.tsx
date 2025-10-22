import React, { useState } from "react";
import { simulatePayroll } from "../api/payroll"; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Calculator, Zap, DollarSign, Briefcase } from "lucide-react";

// Safe currency formatting
const formatCurrency = (amount?: number | null) =>
  amount != null
    ? `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MAD`
    : "-";

export default function PayrollSimulator() {
  const [baseSalary, setBaseSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const data = await simulatePayroll({
        base_salary: Number(baseSalary),
        allowances: Number(allowances),
      });
      setResult(data.data); // Unwrap API response
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getContributionLabel = (key: string) => {
    switch (key) {
      case "cnss_employee":
        return "CNSS (Employee Share)";
      case "amo_employee":
        return "AMO (Employee Share)";
      case "cnss_employer":
        return "CNSS (Employer Share)";
      case "amo_employer":
        return "AMO (Employer Share)";
      case "family_allowance_employer":
        return "Family Allowance (Employer)";
      case "training_employer":
        return "Training Fund (Employer)";
      default:
        return key.replace(/_/g, " ").toUpperCase();
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
        <Calculator className="h-7 w-7 text-primary" /> Payroll Simulation Tool
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Calculate Net Salary & Employer Cost</CardTitle>
          <CardDescription>
            Enter base salary and allowances to view a full payroll breakdown, including taxes and contributions.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Form */}
          <form
            onSubmit={handleSimulate}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 rounded-lg bg-muted/20"
          >
            <div className="space-y-2">
              <Label htmlFor="base-salary">Base Salary (MAD)</Label>
              <Input
                id="base-salary"
                type="number"
                placeholder="e.g., 6000"
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
                placeholder="e.g., 500"
                value={allowances}
                onChange={(e) => setAllowances(e.target.value)}
                required
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" variant="secondary" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Zap className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Calculator className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Calculating..." : "Simulate Payroll"}
              </Button>
            </div>
          </form>

          {/* Simulation Results */}
          {result && (
            <div className="space-y-6 pt-4">
              <Separator />

              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-600" /> Breakdown Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Gross Salary */}
                <Card className="shadow-lg">
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Gross Salary</CardTitle>
                    <DollarSign className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(result.gross)}</div>
                    <p className="text-xs text-muted-foreground">Base + Allowances</p>
                  </CardContent>
                </Card>

                {/* Total Deductions */}
                <Card className="shadow-lg">
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
                    <Zap className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      - {formatCurrency(result.total_employee_deductions)}
                    </div>
                    <p className="text-xs text-muted-foreground">CNSS, AMO, IR</p>
                  </CardContent>
                </Card>

                {/* Employer Cost */}
                <Card className="shadow-lg">
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Employer Cost</CardTitle>
                    <Briefcase className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(result.total_employer_cost)}
                    </div>
                    <p className="text-xs text-muted-foreground">Includes all employer contributions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contributions & Allowances */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contributions & Allowances</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {Object.entries(result.contributions || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm py-1 border-b last:border-b-0">
                        <span>{getContributionLabel(key)}</span>
                        <span
                          className={`font-mono ${
                            key.includes("employee") ? "text-red-500" : "text-blue-500"
                          }`}
                        >
                          {formatCurrency(Number(value))}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Income Tax */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Income Tax (IR) Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="flex justify-between text-sm py-1 border-b">
                      <span>Taxable Annual Income</span>
                      <span className="font-mono">{formatCurrency(result.income_tax?.taxable_annual)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b">
                      <span>Taxable Monthly Income</span>
                      <span className="font-mono">{formatCurrency(result.income_tax?.taxable_monthly)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b">
                      <span>Annual Income Tax</span>
                      <span className="font-mono text-red-500">{formatCurrency(result.income_tax?.annual_ir)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b last:border-b-0">
                      <span>Monthly Income Tax</span>
                      <span className="font-mono font-bold text-red-600">{formatCurrency(result.income_tax?.monthly_ir)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer with Net Pay */}
        {result && (
          <CardFooter className="bg-primary/10 flex justify-between p-4 mt-6 rounded-b-xl">
            <h3 className="text-xl font-semibold text-primary">NET PAY (To Employee)</h3>
            <span className="text-3xl font-extrabold text-primary">{formatCurrency(result.net_pay)}</span>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
