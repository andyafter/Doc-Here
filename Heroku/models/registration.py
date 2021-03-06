__author__ = 'andypan'

from origindb import *

def register(name, ic_num, queue_num, phone_num=None):
    # this part is dirty cause there is 2 and more database
    # operations
    q = session.query(Queue).filter_by(queue_number=queue_num).first()
    doc = session.query(Doctor).filter_by(id=q.doctor_id).first()
    clinic = session.query(Clinic).filter_by(id=doc.clinic_id).first()
    '''
    if not q:
        result = {}
        result['error']="Queue Number Does Not Exist!"
        return result
    '''
    pat = session.query(PatientDetail).filter_by(ic_num=ic_num).first()
    if pat:
        p = session.query(Patient).filter_by(patient_id=pat.patient_id).first()
        result  = {}
        result['name'] = p.name
        result['ic_num'] = ic_num
        if p.phone:
            result['phone_num'] = p.phone

        ## this here is obviously wrong, but time is not enough in
        ## this sprint, and there is only one doctor and you know
        result['doctor'] = doc.name
        return result

    count = session.query(Patient).count()
    patient = Patient(patient_id=count+1, name = name)
    patient.queue.append(q)

    ## about patient detail
    dcount = session.query(PatientDetail).count()
    patient_detail = PatientDetail(id=dcount+1, ic_num=ic_num)
    if phone_num:
        patient_detail.phone_num = phone_num

    ## adding the foreign key reference
    clinic.patient_detail.append(patient_detail)
    patient.detail.append(patient_detail)
    ## end of adding foreign key reference
    session.add(patient_detail)
    session.add(patient)
    session.commit()
    result = {}
    result["name"] = patient.name
    result['ic_num'] = patient_detail.ic_num
    if patient.phone:
        result['phone_num'] = patient.phone
    result['doctor'] = doc.name

    return result

def query_patient(queue_num):
    q = session.query(Queue).filter_by(queue_num=queue_num).first()
    result = {}
    if not q:
        result['error'] = "no such queue number!"
        return result
    if q.patient_id == None:
        result['error'] = "Queue number not registered!"
        return result
    if q.doctor_id:
        result["error"] = "what the hell! This queue number is not binded to a doctor!"
        return result

    doc = session.query(Doctor).filter_by(id=q.doctor_id).first()
    if not doc:
        result["error"] = "Eh, I think this doctor is dead, because he is not in database."
        return result

    patient = session.query(Patient).filter_by(patient_id=q.patient_id).first()
    patient_detail = session.query(PatientDetail).filter_by(id=patient.detail).first()
    result["doctor"] = doc.name
    result["patient_name"] = patient.name
    result["ic_num"] = patient_detail.ic_num
    return result