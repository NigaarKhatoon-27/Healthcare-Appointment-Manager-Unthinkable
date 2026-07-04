const prescriptionTemplate = ({
  patientName,
  doctorName,
}) => {
  return `
    <div style="font-family:Arial;padding:30px">

      <h2 style="color:#16a34a">
        Prescription Ready 💊
      </h2>

      <p>
        Hello <strong>${patientName}</strong>,
      </p>

      <p>
        Dr. <strong>${doctorName}</strong>
        has uploaded your prescription.
      </p>

      <p>
        Please log in to your Healthcare Portal to view or download it.
      </p>

      <hr>

      <p style="font-size:13px;color:#666">
        Healthcare Appointment & Follow-up Manager
      </p>

    </div>
  `;
};

export default prescriptionTemplate;