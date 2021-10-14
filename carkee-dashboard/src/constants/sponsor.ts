// Types
import { Option } from '@/types';

export const SponsorTypeOptions: Option[] = [
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

export const SponsorClubOptions: Option[] = [
  {
    key: 'all',
    label: 'All Clubs',
    value: 'all',
  },
  {
    key: 'carkee',
    label: 'CARKEE',
    value: 'carkee',
  },
];

export const SponsorStatusOptions: Option[] = [
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
    key: 'pending',
    label: 'Approved',
    value: 'approved',
  },
  {
    key: 'deleted',
    label: 'Deleted',
    value: 'deleted',
  },
];

export const SponsorCategoryOptions: Option[] = [
  {
    key: 'normal',
    label: 'Normal',
    value: 'normal',
  },
  {
    key: 'silver',
    label: 'Silver',
    value: 'silver',
  },
  {
    key: 'gold',
    label: 'Gold',
    value: 'gold',
  },
  {
    key: 'platinum',
    label: 'Platinum',
    value: 'platinum',
  },
  {
    key: 'diamond',
    label: 'Diamond',
    value: 'diamond',
  },
];
