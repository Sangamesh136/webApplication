import { 
  validatePassword,
  validatePhoneNumber,
  validateVehicleNumber,
  validateDrivingLicense 
} from './validators';

export const validateForm = (formData) => {
  const {
    password,
    confirmPassword,
    phoneNumber,
    vehicleNumber,
    drivingLicense
  } = formData;

  // Check password match
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  // Validate individual fields
  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  const phoneError = validatePhoneNumber(phoneNumber);
  if (phoneError) return phoneError;

  const vehicleError = validateVehicleNumber(vehicleNumber);
  if (vehicleError) return vehicleError;

  const licenseError = validateDrivingLicense(drivingLicense);
  if (licenseError) return licenseError;

  return null;
};