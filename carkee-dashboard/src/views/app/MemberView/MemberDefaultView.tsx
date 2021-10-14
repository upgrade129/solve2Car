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
  SketchOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// Types
import { Member } from '@/types/member';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import {
  MemberTypeOptions,
  MemberClubOptions,
  MemberStatusOptions,
} from '@/constants/member';

const { Title } = Typography;

const MemberDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Member>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Photo',
      dataIndex: 'profile_picture',
      key: 'profile_picture',
    },
    {
      title: 'Full Name',
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
      render: (member: Member) => {
        const actionMenu = (
          <Menu>
            <Menu.Item key={`member_become-sponsor`}>
              <Space>
                <SketchOutlined />
                {`Become Sponsor`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`member_view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/members/${member.id}`,
                })
              }
            >
              <Space>
                <InfoOutlined />
                {`View`}
              </Space>
            </Menu.Item>
            <Menu.Item
              key={`member_edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/members/edit/${member.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`member_settings`}>
              <Space>
                <SettingOutlined />
                {`Settings`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`member_remove`}>
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
          <Title level={2}>{`Members`}</Title>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`member_filter-form`}>
          <Space>
            <Form.Item name={`member_keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`member_filter_type`}>
              <Select
                options={MemberTypeOptions}
                defaultValue={MemberTypeOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`member_club`}>
              <Select
                options={MemberClubOptions}
                defaultValue={MemberClubOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`member_filter_status`}>
              <Select
                options={MemberStatusOptions}
                defaultValue={MemberStatusOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`member_search`}>
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

export default MemberDefaultView;
