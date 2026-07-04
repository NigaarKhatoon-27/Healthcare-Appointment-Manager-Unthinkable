const appointmentBookedTemplate = ({
  patientName,
  doctorName,
  appointmentDate,
  startTime,
  endTime,
  meetingMode,
}) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f7fb">

      <div style="max-width:650px;margin:auto;background:white;border-radius:12px;padding:30px">

        <h2 style="color:#2563eb">
          Appointment Confirmed ✅
        </h2>

        <p>
          Hello <strong>${patientName}</strong>,
        </p>

        <p>
          Your appointment has been booked successfully.
        </p>

        <table style="width:100%;margin-top:20px">

          <tr>
            <td><strong>Doctor</strong></td>
            <td>${doctorName}</td>
          </tr>

          <tr>
            <td><strong>Date</strong></td>
            <td>${appointmentDate}</td>
          </tr>

          <tr>
            <td><strong>Time</strong></td>
            <td>${startTime} - ${endTime}</td>
          </tr>

          <tr>
            <td><strong>Mode</strong></td>
            <td>${meetingMode}</td>
          </tr>

        </table>

        <p style="margin-top:30px">
          Please arrive 10 minutes before your scheduled time.
        </p>

        <hr>

        <p style="font-size:13px;color:#666">
          Healthcare Appointment & Follow-up Manager
        </p>

      </div>

    </div>
  `;
};

export default appointmentBookedTemplate;