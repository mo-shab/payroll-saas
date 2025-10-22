from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.schemas import EmployeeCreate, EmployeeUpdate
from app.services import employee_service
from app.core.database import SessionLocal

router = APIRouter(prefix="/employees", tags=["Employees"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_employee(payload: EmployeeCreate, db: Session = Depends(get_db)):
    return employee_service.create_employee(db, payload)

@router.get("/")
def get_employees(db: Session = Depends(get_db)):
    return employee_service.list_employees(db)

@router.get("/{employee_id}")
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    return employee_service.get_employee(db, employee_id)

@router.put("/{employee_id}")
def update_employee(employee_id: int, payload: EmployeeUpdate, db: Session = Depends(get_db)):
    return employee_service.update_employee(db, employee_id, payload)

@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee_service.delete_employee(db, employee_id)
    return {"message": "Employee deleted successfully"}