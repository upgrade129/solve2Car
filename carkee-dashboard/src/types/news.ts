import { UploadProps } from 'antd';
import { Moment } from 'moment';

export interface News {
  id: number;
  title: string;
  content: string;
  summary: string;
  image: string;
  created_by: number;
  account_id: number;
  newsGallery: NewsGallery[];
  createdAt: string | Date | Moment;
  updatedAt: string | Date | Moment;
}

export interface NewsGallery {
  id: number;
  news_id: number;
  filename: string;
  status: boolean | null;
  createdAt: string | Date | Moment;
  updatedAt: string | Date | Moment;
}

export interface AddNewsFormData {
  [key: string]: any;
  title: string;
  content: string;
  summary: string;
  image: UploadProps['fileList'];
  gallery: UploadProps['fileList'];
}

export interface EditNewsFormData {
  [key: string]: any;
  title: string;
  content: string;
  summary: string;
  image: UploadProps['fileList'];
  gallery: UploadProps['fileList'];
}

export interface NewsFilterFormData {
  news_string: string;
}
