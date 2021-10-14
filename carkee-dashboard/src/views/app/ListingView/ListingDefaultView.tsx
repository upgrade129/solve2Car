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
  Select,
  Button,
  Table,
  TableProps,
  Menu,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  MenuOutlined,
  InfoOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// Types
import { Listing } from '@/types/listing';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import { ListingStatusOptions } from '@/constants/listing';

const { Title } = Typography;

const ListingDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Listing>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Listing['status']) => {
        return ListingStatusOptions.filter((sta) => sta.value === status)[0];
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (listing: Listing) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/listings/${listing.id}`,
                })
              }
            >
              <Space>
                <InfoOutlined />
                {`View`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/edit/${listing.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`remove`}>
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

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Listings`}</Title>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`filter-form`}>
          <Space>
            <Form.Item name={`keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item
              name={`status`}
              initialValue={ListingStatusOptions[0].value}
            >
              <Select options={ListingStatusOptions} />
            </Form.Item>

            <Form.Item name={`search`}>
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
          <Table columns={columns} dataSource={[]} />
        </Col>
      </Row>
    </>
  );
};

export default ListingDefaultView;
