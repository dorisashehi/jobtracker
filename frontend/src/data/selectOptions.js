const locationOptions = [
  { value: "onsite", label: "On-Site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "optional", label: "Optional" },
];

const rejectedOptions = [
  { value: "response", label: "From Response" },
  { value: "interview", label: "After Interview" },
  { value: "offer", label: "After Offer" },
  { value: "other", label: "Other" },
];

const methodOptions = [
  { value: "company_web", label: "Company Website" },
  { value: "job_board", label: "Job Board" },
  { value: "recruiter", label: "Recruiter" },
  { value: "referal", label: "Referal" },
  { value: "email", label: "Email" },
  { value: "other", label: "Other" },
];

export default { locationOptions, rejectedOptions, methodOptions };
