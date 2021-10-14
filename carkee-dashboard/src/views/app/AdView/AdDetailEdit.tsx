import { FC, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
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
  FormProps,
  Skeleton,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

import { normFile } from '@/utils/upload';

import { AddAdsFormData } from '@/types/ad';

import axios from 'axios';
import { useEffect } from 'react';

const { Title } = Typography;

const AdDetailEdit: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [hideImage, setHideImage] = useState(false);

  const [form] = Form.useForm();

  const onEditAds: FormProps<AddAdsFormData>['onFinish'] = async (
    formData: any,
  ) => {
    console.log('formData', formData);
    try {
      setLoading(true);

      const addData: FormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          switch (key) {
            case 'image':
              if (formData.image?.length === 1) {
                addData.set('image', formData.image[0].originFileObj);
              }
              break;

            default:
              addData.set(key, formData[key]);
              break;
          }
        }
      });

      // if (!addData.get('image') || addData.get('image') === undefined) {
      //   addData.set('image', image);
      // }

      addData.set('isBottom', '0');
      addData.set('Ads_id', id);

      const { data } = await axios.patch('/api/ads/updateAds', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/ads`,
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

  const { id }: any = useParams();

  const fetchAdDetail = () => {
    axios
      .get('/api/ads/viewAds?id=' + id)
      .then((res) => {
        console.log('res', res);
        const result = res.data.data;
        if (result) {
          setImage(result.image);
          form.setFieldsValue({
            // image: result.image,
            name: result.name,
            description: result.description,
            link: result.link,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    fetchAdDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Edit Ad`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/ads`,
                })
              }
            >{`List`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Details */}
      <Row>
        <Col span={24}>
          <Form
            name={`ad_add_details-form`}
            form={form}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
            onFinish={onEditAds}
          >
            {/* <Form.Item>
              <Space align={`baseline`}>
                <InfoOutlined />
                <Title level={3}>{`Ad Details`}</Title>
              </Space>
            </Form.Item> */}

            <Form.Item label={`Name`} name={`name`}>
              <Input />
            </Form.Item>

            <Form.Item label={`Description`} name={`description`}>
              <Input />
            </Form.Item>

            <Form.Item
              name={`image`}
              label={`Featured Image`}
              valuePropName={`fileList`}
              getValueFromEvent={normFile}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                onChange={() => {
                  setHideImage(true);
                }}
              >
                <Button icon={<UploadOutlined />}>{`Upload`}</Button>
              </Upload>
            </Form.Item>

            <div style={{ marginTop: `1rem` }}>
              {image ? (
                <Form.Item
                  label={' '}
                  name={`image-demo`}
                  className='empty-label'
                >
                  <img
                    src={image}
                    alt='preview'
                    style={{
                      maxWidth: `50%`,
                      maxHeight: `50%`,
                      display: hideImage ? 'none' : 'block',
                    }}
                  />
                </Form.Item>
              ) : (
                <Skeleton.Image />
              )}
            </div>

            <Form.Item label={`Link`} name={`link`}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Row justify={`end`}>
                <Button
                  loading={loading}
                  type={`primary`}
                  htmlType={`submit`}
                  icon={<SaveOutlined />}
                >{`Save`}</Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AdDetailEdit;
