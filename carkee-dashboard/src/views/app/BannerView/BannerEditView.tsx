import { FC, useState, useEffect } from 'react';
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
  UploadProps,
  notification,
  Tabs,
  Skeleton,
  FormProps,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import ReactQuill from 'react-quill';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';
import axios from 'axios';
import { normFile } from '@/utils/upload';
import { EditBannerFormData } from '@/types/banner';

const { TabPane } = Tabs;
const { Title } = Typography;

const BannerEditView: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [hideImage, setHideImage] = useState(false);

  const [form] = Form.useForm();
  const { id }: any = useParams();

  const onEditBanner: FormProps<EditBannerFormData>['onFinish'] = async (
    formData: any,
  ) => {
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

      addData.set('banner_id', id);

      const { data } = await axios.put('/api/banner/updateBanner', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/banners`,
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

  const fetchBannerDetail = () => {
    axios
      .get('/api/banner/viewBanner', {
        params: {
          banner_id: id,
        },
      })
      .then((res: any) => {
        console.log('view detail', res);
        const result = res.data.data;
        console.log('result', result);
        if (result) {
          setImage(result.image);
          form.setFieldsValue({
            // image: result.image,
            title: result.title,
            link: result.link,
            content: result.content,
          });
        }
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    fetchBannerDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Update Banner`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/banners`,
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
                form={form}
                name={`event_add_details-form`}
                labelCol={{ span: 6 }}
                labelAlign={`left`}
                onFinish={onEditBanner}
              >
                {/* <Form.Item>
                  <Space align={`baseline`}>
                    <InfoOutlined />
                    <Title level={3}>{`Payment Details`}</Title>
                  </Space>
                </Form.Item> */}

                <Form.Item label={`Title`} name={`title`}>
                  <Input />
                </Form.Item>

                <Form.Item label={`Link`} name={`link`}>
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
                    <Form.Item
                      label={' '}
                      name={`image-demo`}
                      className='empty-label'
                    >
                      <Skeleton.Image />
                    </Form.Item>
                  )}
                </div>

                <Form.Item label={`Content`} name={`content`} initialValue={''}>
                  <ReactQuill />
                </Form.Item>

                <Row justify={`end`}>
                  <Col>
                    <Space>
                      <Button
                        loading={loading}
                        type={`primary`}
                        htmlType={`submit`}
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
                  loading={loading}
                  type={`primary`}
                  htmlType={`submit`}
                  icon={<SaveOutlined />}
                >{`Save`}</Button>
              </Space>
            </Col>
          </Row> */}
        </TabPane>
      </Tabs>
    </>
  );
};

export default BannerEditView;
