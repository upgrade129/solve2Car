export interface Account {
  id: number;
  member_type: string;
  date_created: string;
  company: AccountCompany;
  contact: AccountContact;
  address: AccountAddress;
  directors_shareholders: AccountDirectorShareholder[];
}

export interface AccountCompany {
  name: string;
  status: string;
  uen: string;
  about: string;
  total_members: number;
}

export interface AccountContact {
  email: string;
  full_name: string;
  gender: string;
  dob: string;
  nric: string;
}

export interface AccountAddress {
  address_1: string;
  address_2: string;
  unit_no: string;
  postal_code: number;
  country: string;
}

export interface AccountDirectorShareholder {
  full_name: string;
  email: string;
  mobile: string;
  is_director: boolean;
  is_shareholder: boolean;
}

export interface AccountAdmin {
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
  address: AccountAddress;
  payment: string;
  vehicle_details: AccountAdminVehicleDetails;
  emergency_details: AccountAdminEmergencyDetails;
  documents: AccountAdminDocuments;
}

export interface AccountAdminVehicleDetails {
  chassis_number: string;
  plate_no: string;
  car_model: string;
  is_owner: boolean;
  registration_code: string;
}

export interface AccountAdminEmergencyDetails {
  contact_person: string;
  mobile_code: string;
  mobile_number: number;
  relationship: string;
}

export interface AccountAdminDocuments {
  driving_license_nric: string;
  vehicle_insurance_certificate: string;
  authorization_letter: string;
  registration_log_card: string;
}
