from fastapi import APIRouter
from app.models.schemas import PayrollInput
from app.services.payroll_service import run_simulation

router = APIRouter(prefix="/payroll", tags=["Payroll Simulator"])

@router.post("/simulate")
def simulate_payroll(payload: PayrollInput):
    result = run_simulation(payload.base_salary, payload.allowances)
    return {"status": "success", "data": result}
