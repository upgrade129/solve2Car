import { countries } from 'countries-list';

// Types
import { Option } from '@/types';

export const Genders: Option[] = [
  {
    key: 'male',
    label: 'Male',
    value: 'male',
  },
  {
    key: 'male',
    label: 'Female',
    value: 'female',
  },
];

export const CountryOptions: Option[] = Object.values(countries).map(
  (country) => ({
    key: country.name.toLowerCase(),
    label: country.name,
    value: country.name.toLowerCase(),
  }),
);

export const CountryCodeOptions: Option[] = Object.values(countries).map(
  (country) => ({
    key: country.name.toLowerCase(),
    label: `${country.name} (+${country.phone.split(',').join(', +')})`,
    value: country.phone,
  }),
);
