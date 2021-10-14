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

// Types
import { Member } from '@/types/member';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import { Genders, CountryOptions } from '@/constants';
import {
  MemberVehicleOwnershipOptions,
  MemberEmergencyRelationshipOptions,
} from '@/constants/member';

// Assests
import data from '@/assets/data/members';

const { Title } = Typography;

const MemberEditView: FC<RouteComponentProps> = ({ match, history }) => {
  const { member_id } = match.params as any;
  const member: Member = data.filter((mem) => mem.id === +member_id)[0];

  const actionMenu = (
    <Menu>
      <Menu.Item
        key={`member_view`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/members/${member.id}`,
          })
        }
      >
        <InfoOutlined />
        {`View`}
      </Menu.Item>
      <Menu.Item key={`member_settings`}>
        <SettingOutlined />
        {`Settings`}
      </Menu.Item>
      <Menu.Item key={`member_remove`}>
        <DeleteOutlined />
        {`Remove`}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <UserOutlined />
            <Title level={2}>{member.full_name}</Title>
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
          <Form
            name={`member-edit-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            {/* Personal Information */}
            <Fragment>
              <Space>
                <UserOutlined />
                <Title level={3}>{`Personal Information`}</Title>
              </Space>
              <Form.Item
                name={['member', 'full_name']}
                label={`Full Name`}
                initialValue={member.full_name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'nric']}
                label={`NRIC`}
                initialValue={member.nric}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'dob']}
                label={`Date of Birth`}
                initialValue={member.dob}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'gender']}
                label={`Gender`}
                initialValue={member.gender.toLowerCase()}
              >
                <Select options={Genders} />
              </Form.Item>
              <Form.Item
                name={['member', 'profession']}
                label={`Profession`}
                initialValue={member.profession}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'company']}
                label={`Company`}
                initialValue={member.company}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'annual_salary']}
                label={`Annual Salary`}
                initialValue={member.annual_salary}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'about']}
                label={`About`}
                initialValue={member.about}
              >
                <Input.TextArea />
              </Form.Item>
            </Fragment>

            {/* Address */}
            <Fragment>
              <Space align={`baseline`}>
                <AimOutlined />
                <Title level={3}>{`Address`}</Title>
              </Space>
              <Form.Item
                name={['member', 'address_1']}
                label={`Address 1`}
                initialValue={member.address.address_1}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'address_2']}
                label={`Address 2`}
                initialValue={member.address.address_2}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'unit_no']}
                label={`Unit No.`}
                initialValue={member.address.unit_no}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'postal_code']}
                label={`Postal Code`}
                initialValue={member.address.postal_code}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                name={['member', 'country']}
                label={`Country`}
                initialValue={member.address.country.toLowerCase()}
              >
                <Select options={CountryOptions} />
              </Form.Item>
            </Fragment>

            {/* Vehicle Details */}
            <Fragment>
              <Space align={`baseline`}>
                <CarOutlined />
                <Title level={3}>{`Vehicle Details`}</Title>
              </Space>
              <Form.Item
                name={['member', 'chassis_number']}
                label={`Chassis Number`}
                initialValue={member.vehicle_details.chassis_number}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'plate_no']}
                label={`Plate No.`}
                initialValue={member.vehicle_details.plate_no}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'car_model']}
                label={`Car Model`}
                initialValue={member.vehicle_details.car_model}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'ownership']}
                label={`Ownership`}
                initialValue={member.vehicle_details.ownership}
              >
                <Select options={MemberVehicleOwnershipOptions} />
              </Form.Item>
              <Form.Item
                name={['member', 'registration_code']}
                label={`Registration Code`}
                initialValue={member.vehicle_details.registration_code}
              >
                <Input />
              </Form.Item>
            </Fragment>

            {/* Emergency Details */}
            <Fragment>
              <Space align={`baseline`}>
                <PlusCircleOutlined />
                <Title level={3}>{`Emergency Details`}</Title>
              </Space>
              <Form.Item
                name={['member', 'contact_person']}
                label={`Contact Person`}
                initialValue={member.emergency_details.contact_person}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'mobile_code']}
                label={`Mobile Code`}
                initialValue={member.emergency_details.mobile_code}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['member', 'mobile_number']}
                label={`Mobile Number`}
                initialValue={member.emergency_details.mobile_number}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={['member', 'relationship']}
                label={`Relationship`}
                initialValue={member.emergency_details.relationship}
              >
                <Select options={MemberEmergencyRelationshipOptions} />
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
    </>
  );
};

export default MemberEditView;
