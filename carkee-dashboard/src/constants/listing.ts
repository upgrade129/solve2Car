// Types
import { Option } from '@/types';

export const ListingStatusOptions: Option[] = [
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
