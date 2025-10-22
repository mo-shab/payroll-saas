import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🏠 لوحة التحكم</h1>
      <div className="flex flex-col gap-3">
        <Link to="/employees" className="text-blue-600 underline">
          إدارة الموظفين
        </Link>
        <Link to="/payroll" className="text-blue-600 underline">
          محاكي الأجرة
        </Link>
      </div>
    </div>
  );
}
