from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.schemas import EmployeeCreate
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
