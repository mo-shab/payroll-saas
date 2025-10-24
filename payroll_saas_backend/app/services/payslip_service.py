from sqlalchemy.orm import Session
from app.models.employee_model import Employee
from app.utils.calculations import simulate_payrun
from app.utils.pdf_generator import generate_payslip_pdf
from decimal import Decimal
import os

def create_payslip(db: Session, employee_id: int):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if not employee:
        raise ValueError("Employee not found")

    # Simulate payroll
    gross = Decimal(employee.base_salary) + Decimal(employee.allowances)
    result = simulate_payrun(gross)

    # Generate PDF
    output_path = os.path.join("generated_payslips", f"payslip_{employee.name}_{employee.id}.pdf")
    os.makedirs("generated_payslips", exist_ok=True)

    generate_payslip_pdf(employee, result, output_path)
    return output_path
