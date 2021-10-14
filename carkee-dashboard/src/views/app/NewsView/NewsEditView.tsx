import { FC, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Typography,
  Divider,
  Form,
  FormProps,
  Input,
  Button,
  Upload,
  UploadProps,
  notification,
} from 'antd';
import {
  UnorderedListOutlined,
  UploadOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import axios from 'axios';

// Types
import { News, EditNewsFormData } from '@/types/news';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Utils
// import { normFile } from '@/utils/upload';

const { Title } = Typography;

const NewsEditView: FC<RouteComponentProps> = ({ history, match }) => {
  const { news_id }: any = match.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News | null>(null);
  const [image, setImage] = useState<UploadProps['fileList']>([]);
  const [gallery, setGallery] = useState<UploadProps['fileList']>([]);

  useEffect(() => {
    if (+news_id <= 0) {
      history.push({
        pathname: `${APP_PREFIX_PATH}/news`,
      });
      return;
    } else if (+news_id > 0 && news === null) {
      fetchNews();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news_id, news]);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('/api/news/view', {
        params: {
          news_id,
        },
      });

      const fetchedNews: News = data.data[0];

      setNews(fetchedNews);

      if (fetchedNews.image) {
        setImage([
          {
            url: fetchedNews.image,
          },
        ] as UploadProps['fileList']);
      }

      if (fetchedNews.newsGallery.length > 0) {
        setGallery(
          fetchedNews.newsGallery.map(
            (nG) =>
              ({
                uid: nG.id,
                url: nG.filename,
              } as unknown),
          ) as UploadProps['fileList'],
        );
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [news_id]);

  const handleChangeImage: UploadProps['onChange'] = (e) => {
    setImage(e.fileList);
  };

  const handleChangeGallery: UploadProps['onChange'] = async (e) => {
    if (e.file.status === 'removed') {
      await axios.delete('/api/news/removeGallery', {
        data: {
          news_id: news!.id,
          image_id: e.file.uid,
        },
      });
      setGallery(e.fileList);
      return;
    }

    const formData: FormData = new FormData();
    formData.set('news_id', news_id);
    formData.set('gallery', e.file as any);

    await axios.post('/api/news/addGallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setGallery(e.fileList);
  };

  const handleEditNews: FormProps<EditNewsFormData>['onFinish'] = async (
    formData,
  ) => {
    try {
      setLoading(true);

      const editData: FormData = new FormData();
      editData.set('news_id', news_id);

      Object.keys(formData).forEach((key) => {
        switch (key) {
          case 'image':
            if (image!.length === 1 && image![0].url !== news!.image) {
              editData.set('image', image![0].originFileObj);
            }
            break;

          case 'gallery':
            break;

          default:
            editData.set(key, formData[key]);
            break;
        }
      });

      const { data } = await axios.put('/api/news/update', editData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/news`,
      });
    } catch (err) {
      setLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {news && (
        <>
          <Row justify={`space-between`} align={`middle`}>
            <Col span={12}>
              <Title level={2}>{`Edit News`}</Title>
            </Col>

            <Col span={12}>
              <Row justify={`end`}>
                <Button
                  type={`primary`}
                  icon={<UnorderedListOutlined />}
                  onClick={() =>
                    history.push({
                      pathname: `${APP_PREFIX_PATH}/news`,
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
                name={`edit-form`}
                labelCol={{ span: 6 }}
                labelAlign={`left`}
                onFinish={handleEditNews}
              >
                <Form.Item
                  name={`title`}
                  label={`Title`}
                  rules={[{ required: true, whitespace: true }]}
                  initialValue={news.title}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={`summary`}
                  label={`Summary`}
                  rules={[{ required: true, whitespace: true }]}
                  initialValue={news.summary}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={`image`}
                  label={`Featured Image`}
                  // valuePropName={`fileList`}
                  // getValueFromEvent={normFile}
                >
                  <Upload
                    fileList={image}
                    listType={`picture-card`}
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={handleChangeImage}
                  >
                    {image!.length === 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>

                <Form.Item
                  name={`content`}
                  label={`Content`}
                  rules={[{ required: true, whitespace: true }]}
                  initialValue={news.content}
                >
                  <ReactQuill theme={`snow`} />
                </Form.Item>

                <Form.Item
                  name={`gallery`}
                  label={`Gallery`}
                  // valuePropName={`fileList`}
                  // getValueFromEvent={normFile}
                >
                  <Upload.Dragger
                    fileList={gallery}
                    listType={`picture-card`}
                    multiple
                    beforeUpload={() => false}
                    onChange={handleChangeGallery}
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    <p className='ant-upload-drag-icon'>
                      <UploadOutlined />
                    </p>
                    <p className='ant-upload-text'>
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>

                <Form.Item>
                  <Row justify={`end`}>
                    <Button
                      loading={loading}
                      type={`primary`}
                      htmlType={`submit`}
                      icon={<SaveOutlined />}
                    >
                      {`Save`}
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default NewsEditView;
