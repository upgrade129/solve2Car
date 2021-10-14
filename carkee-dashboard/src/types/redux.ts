export interface Action<T = any> {
  type: string;
  payload: T;
}

export interface RootState {
  theme: ThemeReducer;
  auth: AuthReducer;
}

export interface ThemeReducer {
  navCollapsed: boolean;
  sideNavTheme: 'SIDE_NAV_LIGHT' | 'SIDE_NAV_DARK';
  locale: string;
  navType: 'SIDE' | 'TOP';
  topNavColor: string;
  headerNavColor: string;
  mobileNav: boolean;
  currentTheme: 'light' | 'dark';
  direction: 'ltr' | 'rtl';
}

export interface AuthReducer {
  loading: boolean;
  message: string;
  showMessage: boolean;
  redirect: string;
  token: string | null;
  currentUser: currentUser | null;
}

export interface currentUser {
  id: 2;
  email: string;
  password: string;
  password_reset_token: string;
  reset_code: string;
  pin_hash: string;
  userToken: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  account_id: number;
  userDetails: userDetails;
  userOtherDetails: userOtherDetails;
  userTransfer: userTransfer;
}

export interface userDetails {
  [index: number]: {
    id: number;
    fullName: string;
    mobile_code: string;
    mobile: string;
    gender: string;
    uen: string;
    birthday: string;
    country: string;
    postal_code: string;
    unit_no: string;
    add_1: string;
    add_2: string;
    nric: string;
    img_profile: string;
    profession: string;
    annual_salary: string;
    company: string;
    createdAt: string;
    updatedAt: string;
    user_id: number;
  };
}

export interface userOtherDetails {
  [index: number]: {
    id: number;
    fullName: string;
    mobile_code: string;
    mobile: string;
    gender: string;
    uen: string;
    birthday: string;
    country: string;
    postal_code: string;
    unit_no: string;
    add_1: string;
    add_2: string;
    nric: string;
    img_profile: string;
    profession: string;
    annual_salary: string;
    company: string;
    createdAt: string;
    updatedAt: string;
    user_id: number;
  };
}

export interface userTransfer {
  [index: number]: {
    id: number;
    transfer_number: string;
    transfer_banking_nickname: string;
    transfer_date: string;
    transfer_amount: string;
    transfer_screenshot: string;
    createdAt: string;
    updatedAt: string;
    user_id: number;
  };
}
