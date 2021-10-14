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
  MenuOutlined,
  CreditCardOutlined,
  SketchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';

// Types
import { Sponsor } from '@/types/sponsor';

// Configs
// import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import {
  SponsorTypeOptions,
  SponsorClubOptions,
  SponsorStatusOptions,
  SponsorCategoryOptions,
} from '@/constants/sponsor';

// Assets
import data from '@/assets/data/sponsors';

const { Title } = Typography;

const SponsorDefaultView: FC<RouteComponentProps> = () => {
  const [columns] = useState<TableProps<Sponsor>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Photo',
      dataIndex: 'profile_picture',
      key: 'profile_picture',
      render: (profile_picture: Sponsor['profile_picture']) => (
        <Image src={profile_picture} width={100} height={100} />
      ),
    },
    {
      title: 'Member Name',
      dataIndex: 'member_name',
      key: 'member_name',
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
      title: 'Club',
      dataIndex: 'club',
      key: 'club',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: Sponsor['category']) => {
        if (category === 'diamond') {
          return (
            <Space>
              <SketchOutlined />
              {`Diamond`}
            </Space>
          );
        }

        return (
          <Space>
            <CreditCardOutlined />
            {
              SponsorCategoryOptions.filter((cat) => cat.value === category)[0]
                .label
            }
          </Space>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Sponsor['status']) => {
        return SponsorStatusOptions.filter((sta) => sta.value === status)[0]
          .label;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => {
        const actionMenu = (
          <Menu>
            {SponsorCategoryOptions.map((category) => {
              if (category.value === 'diamond') {
                return (
                  <Menu.Item key={category.value}>
                    <Space>
                      <SketchOutlined />
                      {category.label}
                    </Space>
                  </Menu.Item>
                );
              }

              return (
                <Menu.Item key={category.value}>
                  <Space>
                    <CreditCardOutlined />
                    {category.label}
                  </Space>
                </Menu.Item>
              );
            })}
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
          <Title level={2}>{`Sponsors`}</Title>
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

            <Form.Item name={`type`}>
              <Select
                options={SponsorTypeOptions}
                defaultValue={SponsorTypeOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`club`}>
              <Select
                options={SponsorClubOptions}
                defaultValue={SponsorClubOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`status`}>
              <Select
                options={SponsorStatusOptions}
                defaultValue={SponsorStatusOptions[0].value}
              />
            </Form.Item>

            <Form.Item name={`search`}>
              <Button
                type={`primary`}
                htmlType={`submit`}
                icon={<SearchOutlined />}
              />
            </Form.Item>

            <Form.Item name={`export`}>
              <Button
                className={clsx('export-btn')}
                type={`primary`}
                icon={<ExportOutlined />}
              >{`Export`}</Button>
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

export default SponsorDefaultView;
