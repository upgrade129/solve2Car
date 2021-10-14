import { UploadProps } from 'antd';

export interface Ad {
  id: number;
  name: string;
  description: string;
  image: string;
  is_bottom: boolean;
}

export interface AddAdsFormData {
  name: string;
  description: string;
  image: UploadProps['fileList'];
  link: string;
}
