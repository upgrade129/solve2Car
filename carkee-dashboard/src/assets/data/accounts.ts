// Types
import { Account, AccountAdmin } from '@/types/account';

export const admins: AccountAdmin[] = [
  {
    id: 363,
    full_name: 'Jayden Lee',
    profile_picture: '/img/thumbs/thumb-6.jpg',
    nric: '',
    mobile: '81138909',
    email: 'weijan_89@hotmail.com',
    dob: '1989-12-10',
    gender: 'Male',
    profession: '',
    company: '',
    annual_salary: '',
    status: 'Approved',
    about: '',
    address: {
      address_1: '',
      address_2: '',
      unit_no: '06-03',
      postal_code: 338986,
      country: 'Singapore',
    },
    payment: '/img/thumbs/thumb-6.jpg',
    vehicle_details: {
      chassis_number: 'WBSFV92000DX96022',
      plate_no: 'smy9625c',
      car_model: 'bmw m5',
      is_owner: true,
      registration_code: '2013-02-07',
    },
    emergency_details: {
      contact_person: 'phoebe teo',
      mobile_code: '+65',
      mobile_number: 97606332,
      relationship: '',
    },
    documents: {
      driving_license_nric: '/img/thumbs/thumb-6.jpg',
      vehicle_insurance_certificate: '/img/thumbs/thumb-6.jpg',
      authorization_letter: '',
      registration_log_card: '/img/thumbs/thumb-6.jpg',
    },
  },
];

export default [
  {
    id: 1,
    member_type: 'Club Owner',
    date_created: '28-07-2020',
    company: {
      name: 'MClub',
      status: 'Pending - Approval',
      uen: '',
      about: '',
      total_members: 0,
    },
    contact: {
      email: 'demo1@yopmail.com',
      full_name: 'test',
      gender: 'Male',
      dob: '2003-12-31',
      nric: 'A1234567b',
    },
    address: {
      address_1: 'Add1',
      address_2: '',
      unit_no: '33',
      postal_code: 111222,
      country: 'Singapore',
    },
    directors_shareholders: [],
  },
] as Account[];
