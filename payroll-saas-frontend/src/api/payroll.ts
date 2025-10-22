import axios from "axios";

const API_URL = "http://localhost:8000/payroll";

interface PayrollInput {
  base_salary: number;
  allowances: number;
}

export const simulatePayroll = async (input: PayrollInput) => {
  try {
    const res = await axios.post(`${API_URL}/simulate/`, input);
    return res.data;
  } catch (err) {
    console.error("Error simulating payroll:", err);
    throw err;
  }
};