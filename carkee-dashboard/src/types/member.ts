export interface Member {
  id: number;
  full_name: string;
  profile_picture: string;
  nric: string;
  dob: string;
  gender: string;
  profession: string;
  company: string;
  club: string;
  annual_salary: string;
  about: string;
  type: string;
  status: string;
  address: MemberAddress;
  vehicle_details: MemberVehicleDetails;
  emergency_details: MemberEmergencyDetails;
  date_created: string;
}

export interface MemberAddress {
  address_1: string;
  address_2: string;
  unit_no: string;
  postal_code: number;
  country: string;
}

export interface MemberVehicleDetails {
  chassis_number: string;
  plate_no: string;
  car_model: string;
  ownership: string;
  registration_code: string;
}

export interface MemberEmergencyDetails {
  contact_person: string;
  mobile_code: string;
  mobile_number: number;
  relationship: string;
}
