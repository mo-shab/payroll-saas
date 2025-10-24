from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services import payslip_service
import os

router = APIRouter(prefix="/payslips", tags=["Payslips"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/generate/{employee_id}")
def generate_payslip(employee_id: int, db: Session = Depends(get_db)):
    """
    Generate a PDF payslip for the given employee.
    """
    pdf_path = payslip_service.create_payslip(db, employee_id)

    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=500, detail="Failed to generate payslip")

    return FileResponse(
        path=pdf_path,
        filename=os.path.basename(pdf_path),
        media_type="application/pdf"
    )
