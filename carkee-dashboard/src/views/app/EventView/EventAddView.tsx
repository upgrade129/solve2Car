import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Upload,
  notification,
  Tabs,
  DatePicker,
  FormProps,
  Checkbox,
  InputNumber,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import { AddEventFormData } from '@/types/event';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Utils
import { normFile } from '@/utils/upload';

import ReactQuill from 'react-quill';
import axios from 'axios';

const { TabPane } = Tabs;
const { Title } = Typography;

const EventAddView: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // const onAddEvent = async (values: any) => {
  //   console.log('submitted', values);

  //   // const addData: FormData = new FormData();

  //   // const { data } = await axios.post('/api/event/create', addData, {
  //   //   headers: {
  //   //     'Content-Type': 'multipart/form-data',
  //   //   },
  //   // });
  // };

  const onAddEvent: FormProps<AddEventFormData>['onFinish'] = async (
    formData,
  ) => {
    try {
      setLoading(true);

      const addData: FormData = new FormData();
      const galleryData: FormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          switch (key) {
            case 'image':
              if (formData.image?.length === 1) {
                addData.set('image', formData.image[0].originFileObj);
              }
              break;

            case 'gallery':
              if (formData.gallery && formData.gallery.length > 0) {
                formData.gallery.forEach((galleryImage) => {
                  galleryData.append('gallery', galleryImage.originFileObj);
                });
              }
              break;

            default:
              addData.set(key, formData[key]);
              break;
          }
        }
      });

      if (!addData.get('is_paid')) {
        addData.set('is_paid', 'false');
      }
      if (!addData.get('is_public')) {
        addData.set('is_public', 'false');
      }

      const { data } = await axios.post('/api/event/create', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (galleryData.getAll('gallery').length > 0) {
        galleryData.set('event_id', data.data.id);

        await axios.post('/api/event/addGallery', galleryData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/events`,
      });
    } catch (err) {
      setLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Add new Event`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/events`,
                })
              }
            >{`List`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Details */}
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Details' key='1'>
          <Row>
            <Col span={24}>
              <Form
                name={`event_add_details-form`}
                labelCol={{ span: 6 }}
                labelAlign={`left`}
                onFinish={onAddEvent}
              >
                {/* <Form.Item>
                  <Space align={`baseline`}>
                    <InfoOutlined />
                    <Title level={3}>{`Payment Details`}</Title>
                  </Space>
                </Form.Item> */}

                <Form.Item
                  label={`Title`}
                  name={`title`}
                  rules={[{ required: true, whitespace: true }]}
                >
                  <Input />
                </Form.Item>

                {/* <Form.Item label={`Summary`} name={`event_form_summary`}>
                  <Input />
                </Form.Item> */}

                <Form.Item
                  label={`Event location`}
                  name={`place`}
                  rules={[{ required: true, whitespace: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={`Event Time`}
                  name={`event_time`}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    className='w-100'
                    format={'YYYY/MM/DD HH:mm'}
                    showTime={{ format: 'HH:mm' }}
                  />
                </Form.Item>

                <Form.Item
                  label={`Cut Off`}
                  name={`event_end`}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    className='w-100'
                    format={'YYYY/MM/DD HH:mm'}
                    showTime={{ format: 'HH:mm' }}
                  />
                </Form.Item>

                <Form.Item
                  label={`Is Paid`}
                  name='is_paid'
                  valuePropName='checked'
                >
                  <Checkbox checked />
                </Form.Item>

                <Form.Item
                  label={`Event Fee`}
                  name={`event_fee`}
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>

                {/* <Form.Item label={`No of pax.`} name={`event_form_pax`}>
                  <Input />
                </Form.Item> */}

                <Form.Item
                  name={`image`}
                  label={`Featured Image`}
                  valuePropName={`fileList`}
                  getValueFromEvent={normFile}
                  rules={[{ required: true }]}
                >
                  <Upload maxCount={1} beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>{`Upload`}</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label={`Enable Public Review`}
                  name={`is_public`}
                  valuePropName='checked'
                >
                  <Checkbox defaultChecked />
                </Form.Item>

                <Form.Item
                  label={`Content`}
                  name={`content`}
                  initialValue={``}
                  rules={[{ required: true, whitespace: true }]}
                >
                  <ReactQuill />
                </Form.Item>

                <Form.Item
                  name={`gallery`}
                  label={`Gallery`}
                  valuePropName={`fileList`}
                  getValueFromEvent={normFile}
                >
                  <Upload.Dragger multiple beforeUpload={() => false}>
                    <p className='ant-upload-drag-icon'>
                      <UploadOutlined />
                    </p>
                    <p className='ant-upload-text'>
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>

                <Row justify={`end`}>
                  <Col>
                    <Space>
                      <Button
                        loading={loading}
                        htmlType={`submit`}
                        type={`primary`}
                        icon={<SaveOutlined />}
                      >{`Save`}</Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          {/* <Row justify={`end`}>
            <Col>
              <Space>
                <Button
                  htmlType={`submit`}
                  type={`primary`}
                  icon={<SaveOutlined />}
                >{`Save`}</Button>
              </Space>
            </Col>
          </Row> */}
        </TabPane>
        {/* <TabPane tab='Gallery' key='2'>
          <Dragger>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </TabPane> */}
      </Tabs>
    </>
  );
};

export default EventAddView;
