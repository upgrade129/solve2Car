import { FC, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
} from 'antd';
import {
  UserAddOutlined,
  UnorderedListOutlined,
  SaveOutlined,
} from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import { CountryOptions, CountryCodeOptions } from '@/constants';
import { VendorStatusOptions } from '@/constants/vendor';

const { Title } = Typography;

const VendorAddView: FC<RouteComponentProps> = ({ history }) => {
  return (
    <Fragment>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <UserAddOutlined />
            <Title level={2}>{`Add new Vendor`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/vendors`,
                })
              }
            >{`List`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <Form
            name={`vendor-add-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item name={`email`} label={`Email`}>
              <Input disabled />
            </Form.Item>

            <Divider />

            <Fragment>
              <Form.Item name={`name`} label={`Vendor Name`}>
                <Input />
              </Form.Item>
              <Form.Item name={`description`} label={`Vendor Description`}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name={`founded_date`} label={`Founded Date`}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name={`about`} label={`About`}>
                <Input.TextArea />
              </Form.Item>
            </Fragment>

            <Divider />

            <Fragment>
              <Form.Item name={`mobile_code`} label={`Mobile Code`}>
                <Select options={CountryCodeOptions} />
              </Form.Item>

              <Form.Item name={`mobile`} label={`Mobile`}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name={`telephone_code`} label={`Telephone Code`}>
                <Select options={CountryCodeOptions} />
              </Form.Item>

              <Form.Item name={`telephone`} label={`Telephone`}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Fragment>

            <Divider />

            <Fragment>
              <Form.Item name={`country`} label={`Country`}>
                <Select options={CountryOptions} />
              </Form.Item>

              <Form.Item name={`postal_code`} label={`Postal Code`}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name={`unit_no`} label={`Unit No.`}>
                <Input />
              </Form.Item>

              <Form.Item name={`address_1`} label={`Address 1`}>
                <Input />
              </Form.Item>

              <Form.Item name={`status`} label={`Status`}>
                <Select options={VendorStatusOptions} />
              </Form.Item>
            </Fragment>

            <Form.Item>
              <Row justify={`end`}>
                <Button
                  type={`primary`}
                  htmlType={`submit`}
                  icon={<SaveOutlined />}
                >{`Save`}</Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default VendorAddView;
