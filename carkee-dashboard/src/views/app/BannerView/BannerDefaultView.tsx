import { FC, useEffect, useState } from 'react';
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
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';

// Types
import { Banner } from '@/types/banner';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;

const BannerDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Banner>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (banner: Banner) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`banner-edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/banners/edit/${banner.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit Banner`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`banner-remove`}
              onClick={() => deleteBanner(banner.id)}
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

  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage] = useState<number>(1);

  const handleAddEvent = () => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/banners/add`,
    });
  };

  const fetchBanners = (page: number) => {
    axios
      .get('/api/banner/list', {
        params: {
          page: page,
          limit: 10,
        },
      })
      .then((res) => {
        console.log('res', res);
        setPageCount(res.data.count);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteBanner = async (id: number) => {
    try {
      const deleteFormData: any = new FormData();
      deleteFormData.set('banner_id', id);

      const { data } = await axios.delete('/api/banner/removeBanner', {
        data: deleteFormData,
      });

      notification.success({
        message: data.message,
      });

      fetchBanners(currentPage);
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

  useEffect(() => {
    fetchBanners(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Row>
        <Col span={12}>
          <Title level={2}>{`Banners`}</Title>
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
        <Form name={`banner_filter_form`}>
          <Space>
            <Form.Item name={`banner_filter_keyword`}>
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
              onChange: (e) => fetchBanners(e),
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BannerDefaultView;
