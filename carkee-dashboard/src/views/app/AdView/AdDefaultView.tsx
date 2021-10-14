import { FC, useEffect, useState } from 'react';
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
  Table,
  TableProps,
  Menu,
  Dropdown,
  notification,
  Skeleton,
} from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

// Types
import { Ad } from '@/types/ad';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';
import axios from 'axios';

const { Title } = Typography;

const AdDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Ad>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string, ad) => {
        const adsImage =
          image === 'NA' ? (
            <Skeleton.Image />
          ) : image ? (
            <img
              src={image}
              alt={ad.name}
              style={{ maxWidth: `600px`, maxHeight: '600px' }}
            />
          ) : (
            <Skeleton.Image />
          );
        return adsImage;
      },
    },
    {
      title: 'Is Bottom',
      dataIndex: 'isBottom',
      key: 'isBottom',
      render: (isBottom: any, ads) => {
        const eventImage =
          isBottom < 1 ? (
            <Button
              type='primary'
              icon={<ArrowUpOutlined />}
              onClick={() => updateIsBottom(1, ads.id)}
            />
          ) : (
            <Button
              type='primary'
              danger
              icon={<ArrowDownOutlined />}
              onClick={() => updateIsBottom(0, ads.id)}
            />
          );
        return eventImage;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (ad: Ad) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`ad-view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/ads/${ad.id}`,
                })
              }
            >
              <Space>
                <DownloadOutlined />
                {`View Ad`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`ad-edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/ads/edit/${ad.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit Ad`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`ad-remove`} onClick={() => deleteAds(ad.id)}>
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

  const updateIsBottom = async (val: any, adsId: number) => {
    console.log('val x id:', val + ' x ' + adsId);
    try {
      const updateFormData: any = new FormData();
      updateFormData.set('isBottom', val);
      updateFormData.set('Ads_id', adsId);

      const { data } = await axios.patch(
        '/api/ads/updateisBottom',
        updateFormData,
      );
      notification.success({
        message: data.message,
      });

      fetchAds(currentPage);
    } catch (err) {
      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  const handleAddAd = () => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/ads/add`,
    });
  };

  const deleteAds = async (adsId: number) => {
    try {
      const deleteFormData: any = new FormData();
      deleteFormData.set('Ads_id', adsId);

      const { data } = await axios.delete('/api/ads/deleteAds', {
        data: deleteFormData,
      });
      notification.success({
        message: data.message,
      });

      fetchAds(currentPage);
    } catch (err) {
      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  const fetchAds = (page: number) => {
    axios
      .get('/api/ads/list', {
        params: {
          page: page,
          limit: 10,
        },
      })
      .then((res) => {
        setPageCount(res.data.count);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    fetchAds(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={2}>{`Ads`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Space>
              <Button
                type={`primary`}
                icon={<PlusOutlined />}
                onClick={handleAddAd}
              >{`Add`}</Button>
            </Space>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`ad_filter_form`}>
          <Space>
            <Form.Item name={`ad_filter_keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`ad_filter_button`}>
              <Button
                type={`primary`}
                htmlType={`submit`}
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Space>
        </Form>
      </Row>

      {/* List */}
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
              onChange: (e) => fetchAds(e),
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdDefaultView;
