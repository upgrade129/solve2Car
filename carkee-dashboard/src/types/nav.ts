import { ComponentType } from 'react';

export interface NavMenu {
  key: string;
  path: string;
  title: string;
  icon: ComponentType;
  breadcrumb: boolean;
  submenu: NavMenu[];
}
