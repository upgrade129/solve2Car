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
  Image,
} from 'antd';
import {
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  MenuOutlined,
  InfoOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';

// Types
import { Vendor } from '@/types/vendor';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import { VendorTypeOptions, VendorStatusOptions } from '@/constants/vendor';

// Assets
import data from '@/assets/data/vendors';

const { Title } = Typography;

const VendorDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Vendor>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Photo',
      dataIndex: 'profile_picture',
      key: 'profile_picture',
      render: (profile_picture: Vendor['profile_picture']) => (
        <Image src={profile_picture} width={100} height={100} />
      ),
    },
    {
      title: 'Member Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      key: 'date_created',
    },
    {
      title: 'Club',
      dataIndex: 'club',
      key: 'club',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (vendor: Vendor) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={'vendor_view'}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/vendors/${vendor.id}`,
                })
              }
            >
              <Space>
                <InfoOutlined />
                {`View`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`vendor_edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/vendors/edit/${vendor.id}`,
                })
              }
            >
              <EditOutlined />
              {`Edit`}
            </Menu.Item>
            <Menu.Item key={`vendor_settings`}>
              <Space>
                <SettingOutlined />
                {`Settings`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`vendor_remove`}>
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

  const handleAddVendor = () => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/vendors/add`,
    });
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={2}>{`Vendors`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Space>
              <Button
                type={`primary`}
                icon={<PlusOutlined />}
                onClick={handleAddVendor}
              >
                {`Add`}
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`vendor_filter-form`}>
          <Space>
            <Form.Item name={`vendor_filter_search`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`vendor_filter_type`}>
              <Select
                options={VendorTypeOptions}
                defaultValue={VendorTypeOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`vendor_filter_status`}>
              <Select
                options={VendorStatusOptions}
                defaultValue={VendorStatusOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`vendor_filter_button`}>
              <Button
                type={`primary`}
                htmlType={`submit`}
                icon={<SearchOutlined />}
              />
            </Form.Item>

            <Form.Item name={`vendor_filter_export`}>
              <Button
                className={clsx('export-btn')}
                type={`primary`}
                icon={<ExportOutlined />}
              >{`Export`}</Button>
            </Form.Item>

            <Form.Item name={`vendor_filter-deleted-records`}>
              <Button
                className={clsx('danger-btn')}
                type={`primary`}
              >{`Deleted Records`}</Button>
            </Form.Item>
          </Space>
        </Form>
      </Row>

      {/* List */}
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default VendorDefaultView;
