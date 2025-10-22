from decimal import Decimal
from app.utils.calculations import simulate_payrun

def run_simulation(base_salary: float, allowances: float):
    gross = Decimal(base_salary) + Decimal(allowances)
    return simulate_payrun(gross)