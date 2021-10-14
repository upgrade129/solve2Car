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
import { Payment } from '@/types/payment';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

const { Title } = Typography;

const PaymentDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Payment>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (payment: Payment) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`payment-view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/payments/${payment.id}`,
                })
              }
            >
              <Space>
                <DownloadOutlined />
                {`View Payment`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`payment-edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/payments/edit/${payment.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit Payment`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`payment-remove`}>
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

  const handleAddPayment = () => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/payments/add`,
    });
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={2}>{`User Payments`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Space>
              <Button
                type={`primary`}
                icon={<PlusOutlined />}
                onClick={handleAddPayment}
              >{`Add`}</Button>
            </Space>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
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

      {/* List */}
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={[]} />
        </Col>
      </Row>
    </>
  );
};

export default PaymentDefaultView;
