import { FC, useEffect, useState } from 'react';
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
  Skeleton,
} from 'antd';
import { FileAddOutlined, UnorderedListOutlined } from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

import axios from 'axios';

const { Title } = Typography;

const AdDetailView: FC<RouteComponentProps> = ({ history }) => {
  const [image, setImage] = useState('');

  const [form] = Form.useForm();
  const { id }: any = useParams();

  const fetchAdDetail = () => {
    axios
      .get('/api/ads/viewAds?id=' + id)
      .then((res) => {
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
            <Title level={2}>{`View Ad`}</Title>
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
            form={form}
            name={`ad_add_details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            {/* <Form.Item>
              <Space align={`baseline`}>
                <InfoOutlined />
                <Title level={3}>{`Ad Details`}</Title>
              </Space>
            </Form.Item> */}

            <div style={{ marginBottom: `1rem` }}>
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
                    }}
                  />
                </Form.Item>
              ) : (
                <Skeleton.Image />
              )}
            </div>

            <Form.Item label={`Name`} name={`name`}>
              <Input disabled />
            </Form.Item>

            <Form.Item label={`Description`} name={`description`}>
              <Input disabled />
            </Form.Item>

            <Form.Item label={`Link`} name={`link`}>
              <Input disabled />
            </Form.Item>

            {/* <Form.Item>
              <Row justify={`end`}>
                <Button
                  loading={loading}
                  type={`primary`}
                  htmlType={`submit`}
                  icon={<SaveOutlined />}
                >{`Save`}</Button>
              </Row>
            </Form.Item> */}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AdDetailView;
