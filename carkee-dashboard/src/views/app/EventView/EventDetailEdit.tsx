import { FC, useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Tabs,
  DatePicker,
  Skeleton,
  Upload,
  Image,
  Checkbox,
  InputNumber,
  FormProps,
  notification,
  Modal,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import ReactQuill from 'react-quill';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';
import moment from 'moment';

import axios from 'axios';
import { normFile } from '@/utils/upload';
import { EditEventFormData } from '@/types/event';

const { TabPane } = Tabs;
const { Title } = Typography;

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

export const TextEditor: FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <>
      <ReactQuill
        theme='snow'
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

const EventDetailEdit: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [image, setImage] = useState('');
  const [hideImage, setHideImage] = useState(false);

  const [galleries, setGalleries] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalId, setModalId] = useState<any>(0);
  const [editLoading, setEditLoading] = useState(false);
  const [editImage, setEditImage] = useState<any>('');
  const [newGallery, setNewGallery] = useState<any>('');
  const [addLoading, setAddLoading] = useState(false);

  const [form] = Form.useForm();

  const openModal = (galleryId: number) => {
    setIsModalVisible(true);
    setModalId(galleryId);
    console.log('modal gallery id:', galleryId);
  };

  const handleEdit = async () => {
    try {
      console.log('editing', modalId);
      setEditLoading(true);

      const editGallery: FormData = new FormData();
      editGallery.set('event_id', id);
      editGallery.set('image', editImage.fileList[0].originFileObj);
      editGallery.set('image_id', modalId);
      const { data } = await axios.put(
        '/api/event/updateGallery',
        editGallery,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      notification.success({
        message: data.message,
      });

      fetchGalleries();
      setEditLoading(false);
      setIsModalVisible(false);
    } catch (err) {
      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { id }: any = useParams();

  useEffect(() => {
    // setCustomHeader('event_id', id);
    axios
      .get('/api/event/view', {
        params: {
          event_id: id,
        },
      })
      .then((res) => {
        const result = res.data.data[0];
        if (result) {
          setImage(result.image);
          form.setFieldsValue({
            // image: result.image,
            title: result.title,
            place: result.place,
            event_time: moment(result.eventTime, 'YYYY/MM/DD HH:mm'),
            event_end: moment(result.eventEnd, 'YYYY/MM/DD HH:mm'),
            is_paid: result.is_paid,
            event_fee: result.event_fee,
            limit: result.limit,
            is_public: result.is_public,
            content: result.content,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });

    fetchGalleries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGalleries = () => {
    axios
      .get('/api/event/getGallery', {
        params: {
          event_id: id,
        },
      })
      .then((res) => {
        console.log('gallery', res);
        setGalleries(res.data.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const addGallery = async () => {
    setAddLoading(true);
    try {
      const galleryData: FormData = new FormData();
      galleryData.set('event_id', id);

      if (newGallery.fileList && newGallery.fileList.length > 0) {
        newGallery.fileList.forEach((galleryImage: any) => {
          galleryData.append('filename', galleryImage.originFileObj);
        });
      }
      console.log('before send', galleryData);

      const { data } = await axios.post('/api/event/addGallery', galleryData);
      console.log('add response', data);

      notification.success({
        message: data.message,
      });
      setAddLoading(false);
      fetchGalleries();
    } catch (err) {
      setAddLoading(false);
      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  const deleteGallery = async (imageId: string) => {
    try {
      const galleryData: FormData = new FormData();
      galleryData.set('event_id', id);
      galleryData.set('image_id', imageId);

      const { data } = await axios.delete('/api/event/removeGallery', {
        data: galleryData,
      });
      console.log('delete response', data);

      notification.success({
        message: data.message,
      });

      fetchGalleries();
    } catch (err) {
      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  const onEditEvent: FormProps<EditEventFormData>['onFinish'] = async (
    formData: any,
  ) => {
    try {
      setLoading(true);

      const addData: FormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          switch (key) {
            case 'image':
              if (formData.image?.length === 1) {
                addData.set('image', formData.image[0].originFileObj);
              }
              break;

            default:
              addData.set(key, formData[key]);
              break;
          }
        }
      });

      if (!addData.get('is_paid')) {
        addData.set('is_paid', 'false');
      }
      if (!addData.get('is_public')) {
        addData.set('is_public', 'false');
      }
      if (!addData.get('image')) {
        addData.set('image', image);
      }
      addData.set('event_id', id);

      addData.set('summary', 'summary test');
      addData.set('is_closed', 'true');
      addData.set('order', '2');
      addData.set('limit', '2');

      const { data } = await axios.put('/api/event/update', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/events`,
      });
    } catch (err) {
      setLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Edit Event`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/events`,
                })
              }
            >{`List`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Details */}
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Details' key='1'>
          <Row>
            <Col span={24}>
              <Form
                form={form}
                name={`event_view_details-form`}
                labelCol={{ span: 6 }}
                labelAlign={`left`}
                onFinish={onEditEvent}
              >
                <Form.Item label={`Title`} name={`title`}>
                  <Input />
                </Form.Item>

                <Form.Item label={`Place`} name={`place`}>
                  <Input />
                </Form.Item>

                <Form.Item label={`Event Time`} name={`event_time`}>
                  <DatePicker
                    className='w-100'
                    format={'YYYY/MM/DD HH:mm'}
                    showTime={{ format: 'HH:mm' }}
                  />
                </Form.Item>

                <Form.Item label={`Cut Off`} name={`event_end`}>
                  <DatePicker
                    className='w-100'
                    format={'YYYY/MM/DD HH:mm'}
                    showTime={{ format: 'HH:mm' }}
                  />
                </Form.Item>

                <Form.Item
                  label={`Is Paid`}
                  name='is_paid'
                  valuePropName='checked'
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item label={`Event Fee`} name={`event_fee`}>
                  <InputNumber />
                </Form.Item>

                {/* <Form.Item label={`Limit`} name={`limit`}>
                  <Input />
                </Form.Item> */}

                <Form.Item
                  name={`image`}
                  label={`Featured Image`}
                  valuePropName={`fileList`}
                  getValueFromEvent={normFile}
                >
                  <Upload
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={() => setHideImage(true)}
                  >
                    <Button icon={<UploadOutlined />}>{`Upload`}</Button>
                  </Upload>
                </Form.Item>

                <div style={{ marginBottom: `1rem` }}>
                  {image ? (
                    <Form.Item
                      label={' '}
                      name={`image-demo`}
                      className='empty-label'
                    >
                      <img
                        src={image}
                        alt='preview'
                        style={{
                          maxWidth: `50%`,
                          maxHeight: `50%`,
                          display: hideImage ? 'none' : 'block',
                        }}
                      />
                    </Form.Item>
                  ) : (
                    <Skeleton.Image />
                  )}
                </div>

                <Form.Item
                  label={`Enable Public Review`}
                  name={`is_public`}
                  valuePropName='checked'
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item label={`Content`} name={`content`}>
                  {/* @ts-ignore */}
                  <TextEditor />
                </Form.Item>

                <Row justify={`end`}>
                  <Col>
                    <Space>
                      <Button
                        loading={loading}
                        htmlType={`submit`}
                        type={`primary`}
                        icon={<SaveOutlined />}
                      >{`Save Edit`}</Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab='Gallery' key='2'>
          <Modal
            title='Update Image'
            visible={isModalVisible}
            onOk={handleEdit}
            okButtonProps={{ disabled: editLoading }}
            cancelButtonProps={{ disabled: editLoading }}
            okText={editLoading ? 'Replacing...' : 'Replace Image'}
            onCancel={handleCancel}
          >
            <Form.Item
              name={`image`}
              label={`Select New Image`}
              valuePropName={`fileList`}
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                onChange={(e) => {
                  setEditImage(e);
                }}
              >
                <Button icon={<UploadOutlined />}>{`Upload`}</Button>
              </Upload>
            </Form.Item>
          </Modal>
          <div style={{ overflowY: 'scroll' }}>
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                padding: '2.5rem 0',
                flexWrap: 'wrap',
              }}
            >
              {galleries.map((gallery: any) => {
                return (
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <Image
                      width={200}
                      src={gallery.filename}
                      placeholder={true}
                    />
                    <Button
                      size={'small'}
                      style={{
                        position: 'absolute',
                        right: '-24px',
                        top: '-18px',
                      }}
                      type='primary'
                      danger
                      onClick={() => deleteGallery(gallery.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                    <Button
                      size={'small'}
                      style={{
                        position: 'absolute',
                        right: '-24px',
                        top: '22px',
                      }}
                      type='primary'
                      onClick={() => openModal(gallery.id)}
                    >
                      <EditOutlined />
                    </Button>
                  </div>
                );
              })}
            </div>
            <Upload.Dragger
              multiple
              beforeUpload={() => false}
              onChange={(e) => {
                setNewGallery(e);
              }}
            >
              <p className='ant-upload-drag-icon'>
                <UploadOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
            <Button
              loading={addLoading}
              type={`primary`}
              icon={<PlusOutlined />}
              onClick={() => addGallery()}
              style={{ marginTop: `1rem` }}
            >
              {addLoading ? `Adding...` : `Add`}
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default EventDetailEdit;
