from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    base_salary = Column(Float, nullable=False)
    allowances = Column(Float, nullable=False)