// Types
import { Member } from '@/types/member';

export default [
  {
    id: 363,
    full_name: 'Jayden Lee',
    profile_picture: '/img/thumbs/thumb-6.jpg',
    nric: '',
    dob: '1989-12-10',
    gender: 'Male',
    profession: '',
    company: '',
    club: 'MClub',
    annual_salary: '',
    about: '',
    type: 'Member and Vendor',
    status: 'Approved',
    address: {
      address_1: '',
      address_2: '',
      unit_no: '06-03',
      postal_code: 338986,
      country: 'Singapore',
    },
    vehicle_details: {
      chassis_number: 'WBSFV92000DX96022',
      plate_no: 'smy9625c',
      car_model: 'bmw m5',
      ownership: 'yes',
      registration_code: '2013-02-07',
    },
    emergency_details: {
      contact_person: 'phoebe teo',
      mobile_code: '+65',
      mobile_number: 97606332,
      relationship: 'spouse',
    },
    date_created: '06-06-2021',
  },
] as Member[];
