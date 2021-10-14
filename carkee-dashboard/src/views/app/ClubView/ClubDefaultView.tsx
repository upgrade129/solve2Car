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
  MenuOutlined,
} from '@ant-design/icons';

// Types
import { Club } from '@/types/club';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

const { Title } = Typography;

const ClubDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Club>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'Brand Synopsis',
      dataIndex: 'brand_synopsis',
      key: 'brand_synopsis',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (club: Club) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`club-view`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/clubs/${club.id}`,
                })
              }
            >
              <Space>
                <DownloadOutlined />
                {`View Club`}
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
        <Col span={12}>
          <Title level={2}>{`Club App`}</Title>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`club_filter_form`}>
          <Space>
            <Form.Item name={`club_filter_keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`club_filter_button`}>
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

export default ClubDefaultView;
