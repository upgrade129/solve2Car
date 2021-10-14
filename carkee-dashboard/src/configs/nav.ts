import {
  HomeOutlined,
  FlagOutlined,
  PayCircleOutlined,
  UsergroupAddOutlined,
  SketchOutlined,
  UnorderedListOutlined,
  PicLeftOutlined,
  StarOutlined,
} from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Types
import { NavMenu } from '@/types/nav';

const appNavTree: NavMenu[] = [
  {
    key: 'home',
    path: `${APP_PREFIX_PATH}/`,
    title: 'Home',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const adsNavTree: NavMenu[] = [
  {
    key: 'ads',
    path: `${APP_PREFIX_PATH}/ads`,
    title: 'Ads',
    icon: FlagOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const paymentNavTree: NavMenu[] = [
  {
    key: 'payments',
    path: `${APP_PREFIX_PATH}/payments`,
    title: 'Payment',
    icon: PayCircleOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const accountNavTree: NavMenu[] = [
  {
    key: 'accounts',
    path: `${APP_PREFIX_PATH}/accounts`,
    title: 'Clubs & Companies',
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const memberNavTree: NavMenu[] = [
  {
    key: 'members',
    path: `${APP_PREFIX_PATH}/members`,
    title: 'Members',
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const vendorNavTree: NavMenu[] = [
  {
    key: 'vendors',
    path: `${APP_PREFIX_PATH}/vendors`,
    title: 'Vendors',
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const sponsorNavTree: NavMenu[] = [
  {
    key: 'sponsors',
    path: `${APP_PREFIX_PATH}/sponsors`,
    title: 'Sponsors',
    icon: SketchOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const listingNavTree: NavMenu[] = [
  {
    key: 'listings',
    path: `${APP_PREFIX_PATH}/listings`,
    title: 'Listings',
    icon: UnorderedListOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const newsNavTree: NavMenu[] = [
  {
    key: 'news',
    path: `${APP_PREFIX_PATH}/news`,
    title: 'News',
    icon: PicLeftOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const eventNavTree: NavMenu[] = [
  {
    key: 'events',
    path: `${APP_PREFIX_PATH}/events`,
    title: 'Events',
    icon: PicLeftOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const bannerNavTree: NavMenu[] = [
  {
    key: 'banners',
    path: `${APP_PREFIX_PATH}/banners`,
    title: 'Banners',
    icon: StarOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const clubNavTree: NavMenu[] = [
  {
    key: 'clubs',
    path: `${APP_PREFIX_PATH}/clubs`,
    title: 'Clubs',
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const adminNavTree: NavMenu[] = [
  {
    key: 'admins',
    path: `${APP_PREFIX_PATH}/admins`,
    title: 'Admins',
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [
  ...appNavTree,
  ...adsNavTree,
  ...paymentNavTree,
  ...accountNavTree,
  ...memberNavTree,
  ...vendorNavTree,
  ...sponsorNavTree,
  ...listingNavTree,
  ...newsNavTree,
  ...eventNavTree,
  ...bannerNavTree,
  ...clubNavTree,
  ...adminNavTree,
];

export default navigationConfig;
