from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from decimal import Decimal

def generate_payslip_pdf(employee, payroll_result, output_path):
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    # ---- Title ----
    title = Paragraph(f"<b>Pay Slip - {employee.name}</b>", styles["Title"])
    elements.append(title)
    elements.append(Spacer(1, 12))

    # ---- Employee Info ----
    info_data = [
        ["Employee Name", employee.name],
        ["Position", employee.position],
        ["Base Salary", f"{employee.base_salary:,.2f} MAD"],
        ["Allowances", f"{employee.allowances or 0:,.2f} MAD"],
    ]
    info_table = Table(info_data, colWidths=[100*mm, 80*mm])
    info_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (1, 0), colors.lightgrey),
        ("BOX", (0, 0), (-1, -1), 1, colors.black),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 12))

    # ---- Payroll Breakdown ----
    c = payroll_result["contributions"]
    i = payroll_result["income_tax"]

    payroll_data = [
        ["Gross Salary", f"{payroll_result['gross']:,.2f} MAD"],
        ["CNSS (Employee)", f"-{c['cnss_employee']:,.2f} MAD"],
        ["AMO (Employee)", f"-{c['amo_employee']:,.2f} MAD"],
        ["Income Tax (IR)", f"-{i['monthly_ir']:,.2f} MAD"],
        ["Total Deductions", f"-{payroll_result['total_employee_deductions']:,.2f} MAD"],
        ["Net Salary", f"{payroll_result['net_pay']:,.2f} MAD"],
    ]
    payroll_table = Table(payroll_data, colWidths=[100*mm, 80*mm])
    payroll_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (1, 0), colors.lightgrey),
        ("BOX", (0, 0), (-1, -1), 1, colors.black),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
    ]))
    elements.append(payroll_table)
    elements.append(Spacer(1, 12))

    # ---- Summary ----
    net_text = Paragraph(
        f"<b>Net to Pay: {payroll_result['net_pay']:,.2f} MAD</b>", 
        styles["Heading2"]
    )
    elements.append(net_text)

    doc.build(elements)
