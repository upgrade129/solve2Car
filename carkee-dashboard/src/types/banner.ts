import { UploadProps } from 'antd';

export interface Banner {
  id: number;
  image: string;
  date: string;
  title: string;
}

export interface AddBannerFormData {
  [key: string]: any;
  title: string;
  content: string;
  link: string;
  image: UploadProps['fileList'];
}

export interface EditBannerFormData {
  [key: string]: any;
  title: string;
  content: string;
  link: string;
  image: UploadProps['fileList'] | string;
}
