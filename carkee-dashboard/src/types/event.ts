import { UploadProps } from 'antd';
import { Moment } from 'moment';

export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  when: string;
}

export interface AddEventFormData {
  [key: string]: any;
  title: string;
  place: string;
  is_public: boolean;
  is_paid: boolean;
  event_fee: number;
  content: string;
  event_time: string | Date | Moment;
  event_end: string | Date | Moment;
  image: UploadProps['fileList'];
  gallery: UploadProps['fileList'];
}

export interface EditEventFormData {
  [key: string]: any;
  title: string;
  place: string;
  is_public: boolean;
  is_paid: boolean;
  event_fee: number;
  content: string;
  event_time: string | Date | Moment;
  event_end: string | Date | Moment;
  image: UploadProps['fileList'] | string;
}
