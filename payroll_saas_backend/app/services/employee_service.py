from sqlalchemy.orm import Session
from app.models.employee_model import Employee  # your SQLAlchemy model
from app.models.schemas import EmployeeCreate, EmployeeUpdate

def create_employee(db: Session, payload: EmployeeCreate):
    new_emp = Employee(
        name=payload.name,
        position=payload.position,
        base_salary=payload.base_salary,
        allowances=payload.allowances,
    )
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp

def list_employees(db: Session):
    return db.query(Employee).all()

def get_employee(db: Session, employee_id: int):
    return db.query(Employee).filter(Employee.id == employee_id).first()

def update_employee(db: Session, employee_id: int, payload: EmployeeUpdate):
    emp = db.query(Employee).filter(Employee.id == employee_id).first()
    if not emp:
        return None

    for key, value in payload.dict(exclude_unset=True).items():
        setattr(emp, key, value)

    db.commit()
    db.refresh(emp)
    return emp

def delete_employee(db: Session, employee_id: int):
    emp = db.query(Employee).filter(Employee.id == employee_id).first()
    if not emp:
        return None
    db.delete(emp)
    db.commit()
    return emp
