import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { User, FileText, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { getEmployees } from "../api/employees";
import { simulatePayroll } from "../api/payroll";
import { useNavigate } from "react-router-dom"; // If using react-router

interface Employee {
  base_salary: number;
  allowances: number;
  [key: string]: any; // Allow other properties
}

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [latestPayroll, setLatestPayroll] = useState<any>(null);
  const [averageGross, setAverageGross] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation buttons

  // Fetch employees and compute stats
  useEffect(() => {
    async function fetchData() {
      try {
        const emps = await getEmployees();
        setEmployees(emps);

        // Calculate average gross salary
        const avg =
          emps.length > 0
            ? emps.reduce((acc: number, e: Employee) => acc + e.base_salary + e.allowances, 0) / emps.length
            : 0;
        setAverageGross(avg);

        // Simulate latest payroll for the first employee as a placeholder
        if (emps.length > 0) {
          const payroll = await simulatePayroll({
            base_salary: emps[0].base_salary,
            allowances: emps[0].allowances,
          });
          setLatestPayroll(payroll.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Employees",
      value: loading ? "Loading..." : employees.length,
      description: "Since last month",
      icon: User,
      trend: "+2 new",
    },
    {
      title: "Latest Payroll Net Pay",
      value: loading ? "Loading..." : latestPayroll?.net_pay + " MAD",
      description: "For the current month",
      icon: DollarSign,
      trend: "Simulated",
    },
    {
      title: "Average Gross Salary",
      value: loading ? "Loading..." : Math.round(averageGross) + " MAD",
      description: "Across all employees",
      icon: TrendingUp,
      trend: "Stable",
    },
    {
      title: "Pending Documents",
      value: 3, // Replace with real API if available
      description: "To be reviewed",
      icon: FileText,
      trend: "Needs attention",
    },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">HR Dashboard Overview 👋</h1>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description} ({stat.trend})
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payroll Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Payroll Spend</CardTitle>
            <CardDescription>Visualization of monthly costs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
              {/* Replace this with a real chart library like Recharts or Chart.js */}
              (Chart Component Placeholder)
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common tasks instantly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => navigate("/payroll")}
            >
              Run New Payroll Simulation
            </Button>
            <Button className="w-full" variant="secondary" onClick={() => navigate("/employees")}>
              View Employee List
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
