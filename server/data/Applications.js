const Applications = [
  {
    id: 1,
    user_id: 1,
    company_name: "Tech Innovators Inc.",
    company_website: "https://www.techinnovators.com",
    favorite: true,
    apply_date: "2024-12-29T09:00:00",
    apply_method: "Online Application",
    apply_url: "https://www.techinnovators.com/careers",
    position: "Software Engineer",
    fit_rating: 8,
    location: "San Francisco, CA",
    interview_date: "2025-01-10T10:30:00",
    offer_amount: 120000.0,
    rejected: null,
    contact_name: "Emily Clark",
    contact_email: "emily.clark@techinnovators.com",
    contact_phone: "+1-555-123-4567",
    notes: "Great company, looking forward to the interview.",
    created_on: "2024-12-29T08:30:00",
    updated_on: "2024-12-30T08:00:00",
  },
  {
    id: 2,
    user_id: 2,
    company_name: "Global Finance Group",
    company_website: "https://www.globalfinancegroup.com",
    favorite: false,
    apply_date: "2024-12-25T14:00:00",
    apply_method: "Referral",
    apply_url: "https://www.globalfinancegroup.com/careers",
    position: "Financial Analyst",
    fit_rating: 7,
    location: "New York, NY",
    interview_date: "2025-01-05T13:00:00",
    offer_amount: null,
    rejected: null,
    contact_name: "John Dorsey",
    contact_email: "john.dorsey@globalfinancegroup.com",
    contact_phone: "+1-555-987-6543",
    notes: "Referred by a colleague. Waiting to hear back from HR.",
    created_on: "2024-12-25T13:45:00",
    updated_on: "2024-12-30T07:00:00",
  },
  {
    id: 3,
    user_id: 3,
    company_name: "Creative Solutions Ltd.",
    company_website: "https://www.creativesolutions.com",
    favorite: true,
    apply_date: "2024-12-20T11:30:00",
    apply_method: "Job Board",
    apply_url: "https://www.creativesolutions.com/jobs",
    position: "UX/UI Designer",
    fit_rating: 9,
    location: "Remote",
    interview_date: "2025-01-15T15:00:00",
    offer_amount: 95000.0,
    rejected: null,
    contact_name: "Sophia Roberts",
    contact_email: "sophia.roberts@creativesolutions.com",
    contact_phone: "+1-555-234-5678",
    notes: "The role seems perfect. The company has a good culture.",
    created_on: "2024-12-20T10:00:00",
    updated_on: "2024-12-29T09:30:00",
  },
  {
    id: 4,
    user_id: 4,
    company_name: "HealthTech Innovations",
    company_website: "https://www.healthtechinnovations.com",
    favorite: false,
    apply_date: "2024-12-18T16:45:00",
    apply_method: "Direct Email",
    apply_url: "https://www.healthtechinnovations.com/careers",
    position: "Data Scientist",
    fit_rating: 6,
    location: "Los Angeles, CA",
    interview_date: null,
    offer_amount: null,
    rejected: "Position filled",
    contact_name: "Mark Peters",
    contact_email: "mark.peters@healthtechinnovations.com",
    contact_phone: "+1-555-345-6789",
    notes:
      "Didn't get an interview. The position was filled before my application was reviewed.",
    created_on: "2024-12-18T16:00:00",
    updated_on: "2024-12-20T11:00:00",
  },
  {
    id: 5,
    user_id: 5,
    company_name: "EnviroTech Solutions",
    company_website: "https://www.envirotechsolutions.com",
    favorite: true,
    apply_date: "2024-12-22T10:30:00",
    apply_method: "Job Fair",
    apply_url: "https://www.envirotechsolutions.com/careers",
    position: "Environmental Engineer",
    fit_rating: 8,
    location: "Seattle, WA",
    interview_date: "2025-01-12T09:00:00",
    offer_amount: 105000.0,
    rejected: null,
    contact_name: "Jessica Lee",
    contact_email: "jessica.lee@envirotechsolutions.com",
    contact_phone: "+1-555-456-7890",
    notes:
      "Very interested in the company's mission. The interview is scheduled soon.",
    created_on: "2024-12-22T09:45:00",
    updated_on: "2024-12-30T08:30:00",
  },
];

export default Applications;
