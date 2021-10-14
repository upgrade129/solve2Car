import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  Input,
  Table,
  TableProps,
  Button,
  Menu,
  Dropdown,
} from 'antd';
import {
  UserOutlined,
  InfoOutlined,
  AimOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// Types
import { Account } from '@/types/account';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Assets
import data from '@/assets/data/accounts';

const { Title } = Typography;

const accountDirectorsShareholdersColumns: TableProps<
  Account['directors_shareholders']
>['columns'] = [
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Is Director',
    dataIndex: 'is_director',
    key: 'is_director',
  },
  {
    title: 'Is Shareholder',
    dataIndex: 'is_shareholder',
    key: 'is_shareholder',
  },
];

const AccountDetailView: FC<RouteComponentProps> = ({ match, history }) => {
  const { account_id } = match.params as any;
  const account: Account = data.filter((acc) => acc.id === +account_id)[0];

  const actionMenu = (
    <Menu>
      <Menu.Item
        key={`edit-account`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/accounts/edit/${account.id}`,
          })
        }
      >
        <Space>
          <EditOutlined />
          {`Edit Account`}
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`account-admins`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/accounts/admins/${account.id}`,
          })
        }
      >
        <Space>
          <UsergroupAddOutlined />
          {`Account Admins`}
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`account-members`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/accounts/members/${account.id}`,
          })
        }
      >
        <Space>
          <UserOutlined />
          {`Members`}
        </Space>
      </Menu.Item>
      <Menu.Item key={`remove-account`}>
        <Space>
          <DeleteOutlined />
          {`Remove`}
        </Space>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <UserOutlined />

            <Title level={2}>{account.company.name}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Dropdown overlay={actionMenu} trigger={['click']}>
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Company Details */}
      <Row>
        <Col span={24}>
          <Form
            name={`account_company-details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <InfoOutlined />
                <Title level={3}>{`Company Details`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Company`}
              name={`account-company-details-name`}
              initialValue={account.company.name}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Status`}
              name={`account-company-details-status`}
              initialValue={account.company.status}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`UEN`}
              name={`account-company-details-uen`}
              initialValue={account.company.uen}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`About`}
              name={`account-company-details-about`}
              initialValue={account.company.about}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Total Members`}
              name={`account-company-details-total-members`}
              initialValue={account.company.total_members}
            >
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Divider />

      {/* Contact Details */}
      <Row>
        <Col span={24}>
          <Form
            name={`account-contact-details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <UserOutlined />

                <Title level={3}>{`Contact Details`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Email`}
              name={`account-contacts-email`}
              initialValue={account.contact.email}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Full Name`}
              name={`account-contacts-full-name`}
              initialValue={account.contact.full_name}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Gender`}
              name={`account-contacts-gender`}
              initialValue={account.contact.gender}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Date of Birth`}
              name={`account-contacts-dob`}
              initialValue={account.contact.dob}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`NRIC`}
              name={`account-contacts-nric`}
              initialValue={account.contact.nric}
            >
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Divider />

      {/* Address */}
      <Row>
        <Col span={24}>
          <Form
            name={`account-address-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <AimOutlined />

                <Title level={3}>{`Address`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Address 1`}
              name={`account-address-address-1`}
              initialValue={account.address.address_1}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Address 2`}
              name={`account-address-address-2`}
              initialValue={account.address.address_2}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Unit No.`}
              name={`account-address-unit-no`}
              initialValue={account.address.unit_no}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Postal Code`}
              name={`account-address-postal-code`}
              initialValue={account.address.postal_code}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Country`}
              name={`account-address-country`}
              initialValue={account.address.country}
            >
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Divider />

      {/* Documents */}
      <Row>
        <Col span={24}>
          <Form
            name={`account-documents-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <FileTextOutlined />

                <Title level={3}>{`Documents`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`ACRA Business Profile`}
              name={`account-documents-acra`}
            >
              <Input type={`file`} disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Divider />

      {/* Directors / Shareholders */}
      <Row>
        <Col span={24}>
          <Form name={`account-directors-shareholders-form`}>
            <Form.Item>
              <Space align={`baseline`}>
                <UsergroupAddOutlined />

                <Title level={3}>{`Directors / Shareholders`}</Title>
              </Space>
            </Form.Item>

            <Form.Item>
              <Table columns={accountDirectorsShareholdersColumns} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row justify={`end`}>
        <Col>
          <Space>
            <Button>{`Reject`}</Button>
            <Button>{`Approve`}</Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default AccountDetailView;
