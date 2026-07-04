const appointmentCancelledTemplate = ({
  patientName,
  doctorName,
  appointmentDate,
}) => {
  return `
    <div style="font-family:Arial;padding:30px">

      <h2 style="color:#dc2626">
        Appointment Cancelled
      </h2>

      <p>
        Dear <strong>${patientName}</strong>,
      </p>

      <p>
        Your appointment with
        <strong>${doctorName}</strong>
        scheduled on
        <strong>${appointmentDate}</strong>
        has been cancelled.
      </p>

      <p>
        Please book another appointment if needed.
      </p>

      <hr>

      <p style="font-size:13px;color:#666">
        Healthcare Appointment & Follow-up Manager
      </p>

    </div>
  `;
};

export default appointmentCancelledTemplate;