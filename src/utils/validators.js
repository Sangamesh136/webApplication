// Password validation
export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

// Phone number validation
export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return 'Please enter a valid 10-digit phone number';
  }
  return null;
};

// Vehicle number validation
export const validateVehicleNumber = (vehicleNumber) => {
  const input = vehicleNumber.toUpperCase();
  
  // Regular format (e.g., KA01AB1234)
  const regularFormat = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
  
  // Old format with single character (e.g., KA32X0952)
  const oldFormat = /^[A-Z]{2}\d{2}[A-Z]\d{4}$/;
  
  // Bharat series format (e.g., 23BH1234AB)
  const bharatFormat = /^\d{2}BH\d{4}[A-Z]{2}$/;

  if (regularFormat.test(input) || oldFormat.test(input) || bharatFormat.test(input)) {
    return null;
  }

  return 'Please enter a valid vehicle number in one of these formats:\n' +
         '- Standard (e.g., KA01AB1234)\n' +
         '- Old format (e.g., KA32X0952)\n' +
         '- Bharat series (e.g., 23BH1234AB)';
};

// Driving license validation
export const validateDrivingLicense = (drivingLicense) => {
  // Updated regex to accept format like KA3420220002142
  const licenseRegex = /^[A-Z]{2}\d{13}$/;
  if (!licenseRegex.test(drivingLicense.toUpperCase())) {
    return 'Please enter a valid driving license number';
  }
  return null;
};