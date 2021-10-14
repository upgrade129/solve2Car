import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Divider, Table, TableProps, Button } from 'antd';

// Types
import { Log } from '@/types/log';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Assets
import { latest as data } from '@/assets/data/logs';

const { Title } = Typography;

const HomeView: FC<RouteComponentProps> = ({ history }) => {
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

  const handleViewAll = (): void => {
    history.push({
      pathname: `${APP_PREFIX_PATH}/logs`,
    });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Home`}</Title>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={12}>
          <Title level={4}>{`Latest Logs`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button type={`text`} onClick={handleViewAll}>{`View All`}</Button>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default HomeView;
