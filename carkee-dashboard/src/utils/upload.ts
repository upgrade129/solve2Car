import { FormItemProps } from 'antd';

export const normFile: FormItemProps['getValueFromEvent'] = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
