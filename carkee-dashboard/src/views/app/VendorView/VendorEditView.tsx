import { FC, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Button,
  Menu,
  Dropdown,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
} from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  AimOutlined,
  CarOutlined,
  PlusCircleOutlined,
  InfoOutlined,
  SettingOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import moment from 'moment';

// Types
import { Vendor } from '@/types/vendor';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import { Genders, CountryOptions, CountryCodeOptions } from '@/constants';
import {
  VendorVehicleOwnershipOptions,
  VendorEmergencyRelationshipOptions,
} from '@/constants/vendor';

// Assets
import data from '@/assets/data/vendors';

const { Title } = Typography;

const VendorEditView: FC<RouteComponentProps> = ({ match, history }) => {
  const { vendor_id } = match.params as any;
  const vendor: Vendor = data.filter((ven) => ven.id === +vendor_id)[0];

  const actionMenu = (
    <Menu>
      <Menu.Item
        key={`view`}
        onClick={() =>
          history.push({ pathname: `${APP_PREFIX_PATH}/vendors/${vendor_id}` })
        }
      >
        <InfoOutlined />
        {`View`}
      </Menu.Item>
      <Menu.Item key={`settings`}>
        <SettingOutlined />
        {`Settings`}
      </Menu.Item>
      <Menu.Item key={`remove`}>
        <DeleteOutlined />
        {`Remove`}
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <UserOutlined />
            <Title level={2}>{vendor.full_name}</Title>
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

      <Row>
        <Col span={24}>
          <Form name={`edit-form`} labelCol={{ span: 6 }} labelAlign={`left`}>
            {/* Personal Information */}
            <Fragment>
              <Space>
                <UserOutlined />
                <Title level={3}>{`Personal Information`}</Title>
              </Space>
              <Form.Item
                name={`full_name`}
                label={`Full Name`}
                initialValue={vendor.full_name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`nric`}
                label={`NRIC`}
                initialValue={vendor.nric}
              >
                <Input />
              </Form.Item>
              <Form.Item name={`dob`} label={`Date of Birth`}>
                <DatePicker
                  defaultValue={moment(vendor.dob)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name={`gender`}
                label={`Gender`}
                initialValue={vendor.gender}
              >
                <Select options={Genders} />
              </Form.Item>
              <Form.Item
                name={`profession`}
                label={`Profession`}
                initialValue={vendor.profession}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`company`}
                label={`Company`}
                initialValue={vendor.company}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`annual_salary`}
                label={`Annual Salary`}
                initialValue={vendor.annual_salary}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`about`}
                label={`About`}
                initialValue={vendor.about}
              >
                <Input.TextArea />
              </Form.Item>
            </Fragment>

            {/* Address */}
            <Fragment>
              <Space>
                <AimOutlined />
                <Title level={3}>{`Address`}</Title>
              </Space>
              <Form.Item
                name={`address_1`}
                label={`Address 1`}
                initialValue={vendor.address.address_1}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`address_2`}
                label={`Address 2`}
                initialValue={vendor.address.address_2}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`unit_no`}
                label={`Unit No.`}
                initialValue={vendor.address.unit_no}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`postal_code`}
                label={`Postal Code`}
                initialValue={vendor.address.postal_code}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={`country`}
                label={`Country`}
                initialValue={vendor.address.country}
              >
                <Select options={CountryOptions} />
              </Form.Item>
            </Fragment>

            {/* Vehicle Details */}
            <Fragment>
              <Space>
                <CarOutlined />
                <Title level={3}>{`Vehicle Details`}</Title>
              </Space>
              <Form.Item
                name={`chassis_number`}
                label={`Chassis Number`}
                initialValue={vendor.vehicle_details.chassis_number}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`plate_no`}
                label={`Plate No.`}
                initialValue={vendor.vehicle_details.plate_no}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`car_model`}
                label={`Car Model`}
                initialValue={vendor.vehicle_details.car_model}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`ownership`}
                label={`Ownership`}
                initialValue={vendor.vehicle_details.ownership}
              >
                <Select options={VendorVehicleOwnershipOptions} />
              </Form.Item>
              <Form.Item
                name={`registration_code`}
                label={`Registration Code`}
                initialValue={vendor.vehicle_details.registration_code}
              >
                <Input />
              </Form.Item>
            </Fragment>

            {/* Emergency Details */}
            <Fragment>
              <Space>
                <PlusCircleOutlined />
                <Title level={3}>{`Emergency Details`}</Title>
              </Space>
              <Form.Item
                name={`contact_person`}
                label={`Contact Person`}
                initialValue={vendor.emergency_details.contact_person}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`mobile_code`}
                label={`Mobile Code`}
                initialValue={vendor.emergency_details.mobile_code}
              >
                <Select options={CountryCodeOptions} />
              </Form.Item>
              <Form.Item
                name={`mobile_number`}
                label={`mobile_number`}
                initialValue={vendor.emergency_details.mobile_number}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={`relationship`}
                label={`Relationship`}
                initialValue={vendor.emergency_details.relationship}
              >
                <Select options={VendorEmergencyRelationshipOptions} />
              </Form.Item>
            </Fragment>

            {/* Save Button */}
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

export default VendorEditView;
