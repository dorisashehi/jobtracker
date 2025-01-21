const validateField = (name, value) => {
  const newErrors = {};
  let valid = true;

  if (!value) {
    newErrors[name] = "Required Field";
    valid = false;
  } else {
    newErrors[name] = null;
  }

  return { valid, newErrors };
};

const validateAll = (formData) => {
  let newErrors = {};
  let valid = true;

  const reqFields = [
    "company_name",
    "company_website",
    "apply_date",
    "apply_method",
    "apply_url",
    "position",
    "location",
  ];

  reqFields.forEach((field) => {
    if (!formData[field]) {
      newErrors[field] = "Required field.";
      valid = false;
    }
  });

  if (formData.contact_email) {
    if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = "Please enter a valid email address.";
      valid = false;
    }
  }

  return { valid, newErrors };
};

export default {
  validateAll,
  validateField,
};
