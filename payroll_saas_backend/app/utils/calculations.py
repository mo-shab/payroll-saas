from decimal import Decimal, ROUND_HALF_UP 
# config / rates (V0). Keep as Decimal for financial accuracy. 
CNSS_CEILING = Decimal('6000') # monthly base cap 
CNSS_SOC_EMP = Decimal('0.0448') # employee social (short & long term) 
CNSS_SOC_EMPLOYER = Decimal('0.0898') # employer social 
CNSS_FAMILY_ALLOW = Decimal('0.064') # employer family allowance 
AMO_EMPLOYEE = Decimal('0.0226') # employee AMO
AMO_EMPLOYER = Decimal('0.0411') # employer AMO
TRAINING_EMPLOYER = Decimal('0.016') # employer professional training

# 2025 IR annual brackets (MAD)
IR_BRACKETS = [
    (Decimal('0'), Decimal('40000'), Decimal('0.0')),
    (Decimal('40001'), Decimal('60000'), Decimal('0.10')),
    (Decimal('60001'), Decimal('80000'), Decimal('0.20')),
    (Decimal('80001'), Decimal('100000'), Decimal('0.30')),
    (Decimal('100001'), Decimal('180000'), Decimal('0.34')),
    (Decimal('180001'), None, Decimal('0.37'))
]

def qround(d):
    return d.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

def apply_ceiling(base):
    """Return base used for capped contributions (min(base, CNSS_CEILING))."""
    return min(base, CNSS_CEILING)

def compute_cnss_and_amo(gross):
    """ Returns dict with employee_deductions and employer_contributions.
    gross: Decimal monthly gross salary
    """
    base = apply_ceiling(gross)

    # employee social
    cnss_employee = qround(base * CNSS_SOC_EMP)

    # employee AMO
    amo_employee = qround(gross * AMO_EMPLOYEE)

    # employer parts
    cnss_employer = qround(base * CNSS_SOC_EMPLOYER)
    family_allow = qround(gross * CNSS_FAMILY_ALLOW)
    amo_employer = qround(gross * AMO_EMPLOYER)
    training = qround(gross * TRAINING_EMPLOYER)

    employee_total = qround(cnss_employee + amo_employee)
    employer_total = qround(cnss_employer + family_allow + amo_employer + training)

    return {
        'base_for_capped': qround(base),
        'cnss_employee': cnss_employee,
        'amo_employee': amo_employee,
        'employee_total': employee_total,
        'cnss_employer': cnss_employer,
        'family_allowance_employer': family_allow,
        'amo_employer': amo_employer,
        'training_employer': training,
        'employer_total': employer_total
    }

def compute_monthly_ir(gross, employee_deductions):
    """ Compute monthly income tax withholding based on annualized taxable income.
    We'll use simple method:
    taxable_monthly = gross - employee_deductions
    taxable_annual = taxable_monthly * 12
    apply IR brackets to taxable_annual -> annual_ir
    monthly_ir_withholding = annual_ir / 12

    Note: this is a simplification. Real rules might have specific allowances/exemptions.
    """
    taxable_monthly = qround(gross - employee_deductions)
    taxable_annual = qround(taxable_monthly * Decimal(12))

    remaining = taxable_annual
    annual_ir = Decimal('0.0')
    for low, high, rate in IR_BRACKETS:
        if high is None:
            if remaining > low:
                taxed = remaining - low
                annual_ir += taxed * rate
        else:
            # compute overlap between remaining and bracket segment
            seg_low = low
            seg_high = high
            if taxable_annual > seg_low:
                upper = min(taxable_annual, seg_high)
                taxed = max(Decimal('0.0'), upper - seg_low + Decimal('0'))
                # note inclusive bounds handled by brackets
                annual_ir += taxed * rate

    monthly_ir = qround(annual_ir / Decimal(12))
    return {
        'taxable_monthly': taxable_monthly,
        'taxable_annual': taxable_annual,
        'annual_ir': qround(annual_ir),
        'monthly_ir': monthly_ir
    }

def simulate_payrun(gross_decimal):
    """ Input: gross_decimal: Decimal
    Returns: dict breakdown including net pay and employer cost
    """
    gross = qround(gross_decimal)
    contribs = compute_cnss_and_amo(gross)

    # employee deductions (social + AMO)
    employee_deductions = contribs['employee_total']
    ir = compute_monthly_ir(gross, employee_deductions)

    total_employee_deductions = qround(employee_deductions + ir['monthly_ir'])
    net_pay = qround(gross - total_employee_deductions)
    total_employer_cost = qround(gross + contribs['employer_total'])

    return {
        'gross': gross,
        'contributions': contribs,
        'income_tax': ir,
        'total_employee_deductions': total_employee_deductions,
        'net_pay': net_pay,
        'total_employer_cost': total_employer_cost
    }