import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Row,
  Col,
  Typography,
  Divider,
  Table,
  TableProps,
  Button,
  Form,
  Space,
  Input,
  Menu,
  Dropdown,
  Skeleton,
  notification,
} from 'antd';

import {
  SearchOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';

// Types
import { Event } from '@/types/event';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';
import { useEffect } from 'react';

import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;

const EventDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage] = useState(1);

  const [columns] = useState<TableProps<Event>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{title}</div>;
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string, event) => {
        const eventImage =
          image === 'NA' ? (
            <Skeleton.Image />
          ) : image ? (
            <img
              src={image}
              alt={event.title}
              style={{ maxWidth: `600px`, maxHeight: '600px' }}
            />
          ) : (
            <Skeleton.Image />
          );
        return eventImage;
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            {moment(date).format('MM-DD-YYYY')}
          </div>
        );
      },
    },
    {
      title: 'When',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            {moment(date).format('MM-DD-YYYY h:mm:ss')}
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (event: Event) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`event-view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/events/${event.id}`,
                })
              }
            >
              <Space>
                <DownloadOutlined />
                {`View Event`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`event-edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/events/edit/${event.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit Event`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`event-remove`}
              onClick={() => deleteEvent(event.id)}
            >
              <Space>
                <DeleteOutlined />
                {`Remove`}
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

  const deleteEvent = async (id: number) => {
    try {
      const deleteFormData: any = new FormData();
      deleteFormData.set('event_id', id);

      const { data } = await axios.delete('/api/event/deleteEvent', {
        data: deleteFormData,
      });

      notification.success({
        message: data.message,
      });

      fetchEvents(currentPage);
    } catch (err) {
      // setLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  const handleAddEvent = () => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/events/add`,
    });
  };

  const fetchEvents = (page: number) => {
    console.log('fetching', page);
    axios
      .get('/api/event/getAllEvents', {
        params: {
          page: page - 1,
          pagesize: 10,
        },
      })
      .then((res) => {
        console.log('init', res);
        setPageCount(res.data.count);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    fetchEvents(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Row>
        <Col span={12}>
          <Title level={2}>{`Event`}</Title>
        </Col>
        <Col span={12}>
          <Row justify={`end`}>
            <Space>
              <Button
                type={`primary`}
                icon={<PlusOutlined />}
                onClick={handleAddEvent}
              >{`Add`}</Button>
            </Space>
          </Row>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Form name={`payment_filter_form`}>
          <Space>
            <Form.Item name={`payment_filter_keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`paymeny_filter_button`}>
              <Button
                type={`primary`}
                htmlType={`submit`}
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Space>
        </Form>
      </Row>

      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              defaultCurrent: currentPage,
              total: pageCount,
              pageSize: 10,
              defaultPageSize: 10,
              onChange: (e) => fetchEvents(e),
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EventDefaultView;
