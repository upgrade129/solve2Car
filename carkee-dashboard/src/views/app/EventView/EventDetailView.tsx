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
  Tabs,
  DatePicker,
  Table,
  Menu,
  Skeleton,
  TableProps,
  Dropdown,
  Checkbox,
  InputNumber,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  DownloadOutlined,
  DeleteOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import ReactQuill from 'react-quill';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';
import moment from 'moment';

import axios from 'axios';
import { Event } from '@/types/event';

const { TabPane } = Tabs;
const { Title } = Typography;

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

export const TextEditor: FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <>
      <ReactQuill
        theme='snow'
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly
      />
    </>
  );
};

const EventDetailView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Event>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Photo',
      dataIndex: 'image',
      key: 'image',
      render: (image: string, event) => {
        const eventImage = image ? (
          <img src={image} alt={event.title} style={{ maxWidth: `100%` }} />
        ) : (
          <Skeleton.Image />
        );
        return eventImage;
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{title}</div>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`attendee-accept`}
              onClick={() =>
                // history.push({
                //   pathname: `${APP_PREFIX_PATH}/events/${event.id}`,
                // })
                console.log('Accept')
              }
            >
              <Space>
                <DownloadOutlined />
                {`Accept`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`attendee-reject`}>
              <Space>
                <DeleteOutlined />
                {`Reject`}
              </Space>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={actionMenu} trigger={['click']}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        );
      },
    },
  ]);

  const [image, setImage] = useState('');

  const [form] = Form.useForm();

  const { id }: any = useParams();

  useEffect(() => {
    // setCustomHeader('event_id', id);
    axios
      .get('/api/event/view', {
        headers: {
          event_id: id,
        },
      })
      .then((res) => {
        const result = res.data.data[0];
        if (result) {
          setImage(result.image);
          form.setFieldsValue({
            image: result.image,
            title: result.title,
            place: result.place,
            eventTime: moment(result.eventTime, 'YYYY/MM/DD HH:mm'),
            eventEnd: moment(result.eventEnd, 'YYYY/MM/DD HH:mm'),
            is_paid: result.is_paid,
            event_fee: result.event_fee,
            limit: result.limit,
            is_public: result.is_public,
            content: result.content,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`View Event`}</Title>
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
                form={form}
                name={`event_view_details-form`}
                labelCol={{ span: 6 }}
                labelAlign={`left`}
              >
                {/* <Form.Item>
                  <Space align={`baseline`}>
                    <InfoOutlined />
                    <Title level={3}>{`Payment Details`}</Title>
                  </Space>
                </Form.Item> */}

                <div style={{ marginBottom: `1rem` }}>
                  {image ? (
                    <Form.Item
                      label={' '}
                      name={`image`}
                      className='empty-label'
                    >
                      <img
                        src={image}
                        alt='preview'
                        style={{ maxWidth: `100%`, maxHeight: `100%` }}
                      />
                    </Form.Item>
                  ) : (
                    <Skeleton.Image />
                  )}
                </div>

                <Form.Item label={`Title`} name={`title`}>
                  <Input disabled />
                </Form.Item>

                {/* <Form.Item label={`Summary`} name={`event_form_summary`}>
                  <Input disabled />
                </Form.Item> */}

                <Form.Item label={`Place`} name={`place`}>
                  <Input disabled />
                </Form.Item>

                <Form.Item label={`Event Time`} name={`eventTime`}>
                  <DatePicker
                    className='w-100'
                    format={'YYYY/MM/DD HH:mm'}
                    showTime={{ format: 'HH:mm' }}
                    disabled
                  />
                </Form.Item>

                <Form.Item label={`Cut Off`} name={`eventEnd`}>
                  <DatePicker
                    className='w-100'
                    format={'YYYY/MM/DD HH:mm'}
                    showTime={{ format: 'HH:mm' }}
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  label={`Is Paid`}
                  name='is_paid'
                  valuePropName='checked'
                >
                  <Checkbox disabled />
                </Form.Item>

                <Form.Item label={`Event Fee`} name={`event_fee`}>
                  <InputNumber disabled />
                </Form.Item>

                {/* <Form.Item label={`Limit`} name={`limit`}>
                  <Input disabled />
                </Form.Item> */}

                <Form.Item
                  label={`Enable Public Review`}
                  name={`is_public`}
                  valuePropName='checked'
                >
                  <Checkbox disabled />
                </Form.Item>

                {/* <Form.Item label={`Event Fee`} name={`fee`}>
                  <Input />
                </Form.Item> */}

                <Form.Item label={`Content`} name={`content`}>
                  {/* @ts-ignore */}
                  <TextEditor />
                </Form.Item>

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
        <TabPane tab='Attendees' key='2'>
          {/* <Dragger>
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
          </Dragger> */}
          <Table columns={columns} dataSource={[]} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default EventDetailView;
