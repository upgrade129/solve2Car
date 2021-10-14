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
  Table,
  TableProps,
  Menu,
  Dropdown,
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
import { Admin } from '@/types/admin';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

const { Title } = Typography;

const AdminDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Admin>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (admin: Admin) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`admin-view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/admins/${admin.id}`,
                })
              }
            >
              <Space>
                <DownloadOutlined />
                {`View`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`admin-edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/admins/edit/${admin.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`admin-remove`}>
              <Space>
                <DeleteOutlined />
                {`Delete`}
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

  const handleAddAdmin = () => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/admins/add`,
    });
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={2}>{`Admin`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Space>
              <Button
                type={`primary`}
                icon={<PlusOutlined />}
                onClick={handleAddAdmin}
              >{`Add`}</Button>
            </Space>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`admin_filter_form`}>
          <Space>
            <Form.Item name={`admin_filter_keyword`}>
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

      {/* List */}
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={[]} />
        </Col>
      </Row>
    </>
  );
};

export default AdminDefaultView;
