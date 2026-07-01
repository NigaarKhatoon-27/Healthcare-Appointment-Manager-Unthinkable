import DoctorCard from "../common/DoctorCard";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import doctor1 from "../../assets/images/doctors/doctor1.png";
import doctor2 from "../../assets/images/doctors/doctor2.png";
import doctor3 from "../../assets/images/doctors/doctor3.png";

const doctors = [
  {
    image: doctor1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: 12,
    rating: "4.9",
  },
  {
    image: doctor2,
    name: "Dr. Michael Lee",
    specialization: "Neurologist",
    experience: 10,
    rating: "4.8",
  },
  {
    image: doctor3,
    name: "Dr. Emily Brown",
    specialization: "Pediatrician",
    experience: 8,
    rating: "4.9",
  },
];

export default function DoctorsPreview() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <SectionHeading
          badge="Our Doctors"
          title="Meet Our Healthcare Specialists"
          subtitle="Highly experienced doctors dedicated to providing quality healthcare with compassion and expertise."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.name}
              {...doctor}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}