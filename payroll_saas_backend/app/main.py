from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.api import employees, payroll, payslips

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Moroccan Payroll SaaS API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routes
app.include_router(employees.router)
app.include_router(payroll.router)
app.include_router(payslips.router)

@app.get("/")
def root():
    return {"message": "Welcome to Moroccan Payroll SaaS API"}
