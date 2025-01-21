const handleSelectedAction = (el, name) => {
  console.log(name, el);
  setCrFormData({ ...crFormData, [name]: el.value });
  const { newErrors } = Validation.validateField(name, el.value);

  setErrors({ ...errors, ...newErrors });
};

export default {
  handleSelectedAction,
};
