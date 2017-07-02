export const validateZip = (value) => {
  if (!value || value.length === 0) {
    return 'Please enter a zipcode';
  }
  if (!/^\d{5}(-\d{4})?$/.test(value)) {
    return 'Not a valid zipcode';
  }
};