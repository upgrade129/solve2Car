import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Table,
  TableProps,
  Space,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Types
import { Log } from '@/types/log';

// Assets
import data from '@/assets/data/logs';

const { Title } = Typography;

const LogView: FC<RouteComponentProps> = () => {
  const [columns] = useState<TableProps<Log>['columns']>([
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Logs`}</Title>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`log_filter_form`}>
          <Space>
            <Form.Item name={`log_filter_search-keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`log_filter_search-button`}>
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
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default LogView;
