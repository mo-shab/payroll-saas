from pydantic import BaseModel
from typing import Optional

class EmployeeBase(BaseModel):
    name: str
    position: str
    base_salary: float
    allowances: float

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    base_salary: Optional[float] = None
    allowances: Optional[float] = None

class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        orm_mode = True

class PayrollInput(BaseModel):
    base_salary: float
    allowances: float

