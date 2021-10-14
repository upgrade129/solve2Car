export interface Vendor {
  id: number;
  full_name: string;
  profile_picture: string;
  nric: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  profession: string;
  company: string;
  annual_salary: string;
  status: string;
  about: string;
  address: VendorAddress;
  payment: string;
  vehicle_details: VendorVehicleDetails;
  emergency_details: VendorEmergencyDetails;
  documents: VendorDocuments;
}

export interface VendorAddress {
  address_1: string;
  address_2: string;
  unit_no: string;
  postal_code: number;
  country: string;
}

export interface VendorVehicleDetails {
  chassis_number: string;
  plate_no: string;
  car_model: string;
  ownership: string;
  registration_code: string;
}

export interface VendorEmergencyDetails {
  contact_person: string;
  mobile_code: string;
  mobile_number: number;
  relationship: string;
}

export interface VendorDocuments {
  driving_license_nric: string;
  vehicle_insurance_certificate: string;
  authorization_letter: string;
  registration_log_card: string;
}
