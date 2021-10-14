import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Tabs,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  Input,
  Menu,
  Dropdown,
  Image,
  Button,
} from 'antd';
import {
  InfoOutlined,
  UserOutlined,
  AimOutlined,
  DollarOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
  MenuOutlined,
  CarOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

// Types
import {
  AccountAdmin,
  AccountAdminVehicleDetails,
  AccountAdminEmergencyDetails,
  AccountAdminDocuments,
} from '@/types/account';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Assets
import { admins } from '@/assets/data/accounts';

const { Title } = Typography;
const { TabPane } = Tabs;

interface MemberPersonalInformationTabProps {
  member: AccountAdmin;
}

const MemberPersonalInformationTab: FC<MemberPersonalInformationTabProps> = ({
  member,
}) => {
  return (
    <>
      {/* Personal Information */}
      <Row>
        <Col span={24}>
          <Form
            name={`member-personal-information-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <UserOutlined />

                <Title level={3}>{`Personal Information`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Profile Picture`}
              name={`member-personal-info-profile-picture`}
            >
              <Col span={24}>
                <Image src={member.profile_picture} width={100} height={100} />
              </Col>
            </Form.Item>

            <Form.Item
              label={`Full Name`}
              name={`member-personal-information-full-name`}
              initialValue={member.full_name}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`NRIC`}
              name={`member-personal-information-nric`}
              initialValue={member.nric}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Mobile`}
              name={`member-personal-information-mobile`}
              initialValue={member.mobile}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Email`}
              name={`member-personal-information-email`}
              initialValue={member.email}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Date of Birth`}
              name={`member-personal-information-dob`}
              initialValue={member.dob}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Gender`}
              name={`member-personal-information-gender`}
              initialValue={member.gender}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Profession`}
              name={`member-personal-information-profession`}
              initialValue={member.profession}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Company`}
              name={`member-personal-information-company`}
              initialValue={member.company}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Annual Salary`}
              name={`member-personal-information-annual-salary`}
              initialValue={member.annual_salary}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Status`}
              name={`member-personal-information-status`}
              initialValue={member.status}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`About`}
              name={`member-personal-information-about`}
              initialValue={member.about}
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
            name={`member-address-form`}
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
              name={`member-address-address-1`}
              initialValue={member.address.address_1}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Address 2`}
              name={`member-address-address-2`}
              initialValue={member.address.address_2}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Unit No.`}
              name={`member-address-unit-no`}
              initialValue={member.address.unit_no}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Postal Code`}
              name={`member-address-postal-code`}
              initialValue={member.address.postal_code}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Country`}
              name={`member-address-country`}
              initialValue={member.address.postal_code}
            >
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Divider />

      {/* Payment */}
      <Row>
        <Col span={24}>
          <Form
            name={`member-payment-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <DollarOutlined />

                <Title level={3}>{`Payment`}</Title>
              </Space>
            </Form.Item>

            <Form.Item label={`Attachment`} name={`member-payment-attachment`}>
              <Image src={member.payment} width={100} height={100} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

interface MemberVehicleDetailsTabProps {
  details: AccountAdminVehicleDetails;
}

const MemberVehicleDetailsTab: FC<MemberVehicleDetailsTabProps> = ({
  details,
}) => {
  console.log(details);

  return (
    <>
      {/* Vehicle Details */}
      <Row>
        <Col span={24}>
          <Form labelCol={{ span: 6 }} labelAlign={`left`}>
            <Form.Item>
              <Space align={`baseline`}>
                <CarOutlined />

                <Title level={3}>{`Vehicle Details`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Chassis Number`}
              name={`member_vehicle-details_chassis-number`}
              initialValue={details.chassis_number}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Plate No.`}
              name={`member_vehicle-details_plate-no`}
              initialValue={details.plate_no}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Car Model`}
              name={`member_vehicle-details_car-model`}
              initialValue={details.car_model}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Are you owner?`}
              name={`member_vehicle-details_is-owner`}
              initialValue={details.is_owner ? `Yes` : `No`}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Registration Code`}
              name={`member_vehicle-details_registration-code`}
              initialValue={details.registration_code}
            >
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

interface MemberEmergencyDetailsTabProps {
  details: AccountAdminEmergencyDetails;
}

const MemberEmergencyDetailsTab: FC<MemberEmergencyDetailsTabProps> = ({
  details,
}) => {
  return (
    <>
      {/* Emergency Details */}
      <Row>
        <Col span={24}>
          <Form
            name={`member_emergency-details_form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <PlusCircleOutlined />

                <Title level={3}>{`Emergency Details`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Contact Person`}
              name={`member_emergency-details_contact-person`}
              initialValue={details.contact_person}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Mobile Code`}
              name={`member_emergency-details_mobile-code`}
              initialValue={details.mobile_code}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Mobile Number`}
              name={`member_emergency-details_mobile-number`}
              initialValue={details.mobile_number}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label={`Relationship`}
              name={`member_emergency-details_relationship`}
              initialValue={details.relationship}
            >
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

interface MemberDocumentsTabProps {
  documents: AccountAdminDocuments;
}

const MemberDocumentsTab: FC<MemberDocumentsTabProps> = ({ documents }) => {
  return (
    <>
      {/* Documents */}
      <Row>
        <Col span={24}>
          <Form
            name={`member_documents_form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item
              label={`Driving License / NRIC`}
              name={`member_documents_driving-license-nric`}
            >
              {documents.driving_license_nric.length > 0 ? (
                <Button
                  icon={<DownloadOutlined />}
                  href={documents.driving_license_nric}
                  target={`_blank`}
                  download
                >{`Download`}</Button>
              ) : (
                <Button
                  icon={<DownloadOutlined />}
                  disabled
                >{`Download`}</Button>
              )}
            </Form.Item>

            <Form.Item
              label={`Vehicle Insurance Certificate`}
              name={`member_documents_vehicle-insurance-certificate`}
            >
              {documents.vehicle_insurance_certificate.length > 0 ? (
                <Button
                  icon={<DownloadOutlined />}
                  href={documents.vehicle_insurance_certificate}
                  target={`_blank`}
                  download
                >{`Download`}</Button>
              ) : (
                <Button
                  icon={<DownloadOutlined />}
                  disabled
                >{`Download`}</Button>
              )}
            </Form.Item>

            <Form.Item
              label={`Authorization Letter`}
              name={`member_documents_authorization-letter`}
            >
              {documents.authorization_letter.length > 0 ? (
                <Button
                  icon={<DownloadOutlined />}
                  href={documents.authorization_letter}
                  target={`_blank`}
                  download
                >{`Download`}</Button>
              ) : (
                <Button
                  icon={<DownloadOutlined />}
                  disabled
                >{`Download`}</Button>
              )}
            </Form.Item>

            <Form.Item
              label={`Registration Log Card`}
              name={`member_documents_registration-log-card`}
            >
              {documents.registration_log_card.length > 0 ? (
                <Button
                  icon={<DownloadOutlined />}
                  href={documents.registration_log_card}
                  target={`_blank`}
                  download
                >{`Download`}</Button>
              ) : (
                <Button
                  icon={<DownloadOutlined />}
                  disabled
                >{`Download`}</Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const MemberDetailView: FC<RouteComponentProps> = ({ match, history }) => {
  const { member_id } = match.params as any;
  const member: AccountAdmin = admins.filter((ad) => ad.id === +member_id)[0];

  const actionMenu = (
    <Menu>
      <Menu.Item
        key={`member-edit`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/members/edit/${member.id}`,
          })
        }
      >
        <Space>
          <EditOutlined />
          {`Edit Member`}
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`member-settings`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/members/settings/${member.id}`,
          })
        }
      >
        <Space>
          <SettingOutlined />
          {`Member Settings`}
        </Space>
      </Menu.Item>
      <Menu.Item key={`member-remove`}>
        <Space>
          <DeleteOutlined />
          {`Remove Member`}
        </Space>
      </Menu.Item>
    </Menu>
  );

  return (
    <Space direction={`vertical`} size={`small`} style={{ width: '100%' }}>
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

      <Tabs defaultActiveKey={`member-personal-information-tab`} size={`large`}>
        <TabPane
          key={`member-personal-information-tab`}
          tab={
            <Space>
              <InfoOutlined />

              {`Personal Information`}
            </Space>
          }
        >
          <MemberPersonalInformationTab member={member} />
        </TabPane>

        <TabPane
          key={`member-vehicle-details-tab`}
          tab={
            <Space>
              <CarOutlined />

              {`Vehicle Details`}
            </Space>
          }
        >
          <MemberVehicleDetailsTab details={member.vehicle_details} />
        </TabPane>

        <TabPane
          key={`member-emergency-details-tab`}
          tab={
            <Space>
              <PlusCircleOutlined />

              {`Emergency Details`}
            </Space>
          }
        >
          <MemberEmergencyDetailsTab details={member.emergency_details} />
        </TabPane>

        <TabPane
          key={`member-documents-tab`}
          tab={
            <Space>
              <FileTextOutlined />

              {`Documents`}
            </Space>
          }
        >
          <MemberDocumentsTab documents={member.documents} />
        </TabPane>
      </Tabs>
    </Space>
  );
};

export default MemberDetailView;
