// Types
import { Option } from '@/types';

export const VendorTypeOptions: Option[] = [
  {
    key: 'all',
    label: 'All Types',
    value: 'all',
  },
  {
    key: 'member',
    label: 'Member Only',
    value: 'member',
  },
  {
    key: 'vendor',
    label: 'Vendor Only',
    value: 'vendor',
  },
  {
    key: 'member-vendor',
    label: 'Member and Vendor',
    value: 'member-vendor',
  },
];

export const VendorStatusOptions: Option[] = [
  {
    key: 'all',
    label: 'All Status',
    value: 'all',
  },
  {
    key: 'incomplete',
    label: 'Incomplete',
    value: 'incomplete',
  },
  {
    key: 'pending',
    label: 'Pending',
    value: 'pending',
  },
  {
    key: 'approved',
    label: 'Approved',
    value: 'approved',
  },
  {
    key: 'deleted',
    label: 'Deleted',
    value: 'deleted',
  },
];

export const VendorVehicleOwnershipOptions: Option[] = [
  {
    key: 'yes',
    label: 'Yes',
    value: 'yes',
  },
  {
    key: 'family-owned',
    label: 'The car registered above is owned by my family.',
    value: 'family-owned',
  },
  {
    key: 'company-owned',
    label: 'It is a company-owned car that I am authorized to drive.',
    value: 'company-owned',
  },
  {
    key: 'access',
    label:
      'I have an access to above mentioned car that I am authorized to drive',
    value: 'access',
  },
];

export const VendorEmergencyRelationshipOptions: Option[] = [
  {
    key: 'spouse',
    label: 'Spouse',
    value: 'spouse',
  },
  {
    key: 'child',
    label: 'Child',
    value: 'child',
  },
  {
    key: 'sibling',
    label: 'Sibling',
    value: 'sibling',
  },
  {
    key: 'parent',
    label: 'Parent',
    value: 'parent',
  },
  {
    key: 'partner',
    label: 'Partner',
    value: 'partner',
  },
  {
    key: 'friend',
    label: 'Friend',
    value: 'friend',
  },
  {
    key: 'relative',
    label: 'Relative',
    value: 'relative',
  },
  {
    key: 'other',
    label: 'Other',
    value: 'other',
  },
];
