const specializations = ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist", "Gynecologist", "Oncologist", "Ophthalmologist", "ENT Specialist", "General Physician", "Urologist", "Endocrinologist", "Gastroenterologist", "Pulmonologist"];
const bloodGroups=[ { label: "A+", value: "A Positive" },
  { label: "A−", value: "A Negetive" },
  { label: "B+", value: "B Positive" },
  { label: "B−", value: "B Negeative" },
  { label: "AB+", value: "AB Positive" },
  { label: "AB−", value: "AB Negative" },
  { label: "O+", value: "O Positive" },
  { label: "O−", value: "O Negative" }
];
const departments = ["Cardiology", "Dermatology", "Neurology", "Orthopedics", "Pediatrics", "Psychiatry", "Gynecology", "Oncology", "Ophthalmology", "ENT", "General Medicine", "Urology", "Endocrinology", "Gastroenterology", "Pulmonology"];

const appointmentReasons = [
  "Maternity/Parental Checkup",
  "Pediatric Consultant"
]
export default bloodGroups;
export { specializations };
export { departments };
export {appointmentReasons};