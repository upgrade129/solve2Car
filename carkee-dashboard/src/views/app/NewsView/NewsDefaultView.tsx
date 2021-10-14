import { FC, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  FormProps,
  Input,
  Button,
  Table,
  TableProps,
  PaginationProps,
  Image,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

// Types
import { Pagination } from '@/types';
import { News, NewsFilterFormData } from '@/types/news';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Components
import NewsActionButton, {
  NewsActionButtonProps,
} from '@/components/news/NewsActionButton';

const { Title } = Typography;

const NewsDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    size: 5,
  });
  const [total, setTotal] = useState<number>(0);
  const [news, setNews] = useState<News[]>([]);
  const [columns] = useState<TableProps<News>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: News['image']) => {
        if (image === 'NA') {
          return 'N/A';
        }

        return <Image src={image} width={100} height={100} />;
      },
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (news: News) => (
        <NewsActionButton news={news} onFinishRemove={handleFinishRemove} />
      ),
    },
  ]);
  const [filterForm] = Form.useForm<NewsFilterFormData>();
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    if (isFiltering) {
      fetchFilteredNews();
    } else {
      fetchNews();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltering, pagination]);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/news/list', {
        params: {
          page: pagination.page - 1,
          pagesize: pagination.size,
        },
      });
      setTotal(data.count);
      setNews(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  const fetchFilteredNews = useCallback(async () => {
    try {
      setLoading(true);
      const filterFormData = filterForm.getFieldsValue();
      const { data } = await axios.get('/api/news/searchNews', {
        params: {
          news_string: filterFormData.news_string,
          page: pagination.page - 1,
          pagesize: pagination.size,
        },
      });
      setTotal(data.count);
      setNews(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm, pagination]);

  const resetPagination = () => {
    setPagination({
      page: 1,
      size: 5,
    });
  };
  const handleChangePagination: PaginationProps['onChange'] = (page, size) => {
    if (pagination.page !== page || pagination.size !== size) {
      setPagination({
        page,
        size: size || 5,
      });
    }
  };

  const handleFinishRemove: NewsActionButtonProps['onFinishRemove'] = () => {
    fetchNews();
  };

  const handleFilterNews: FormProps<NewsFilterFormData>['onFinish'] = (
    formData,
  ) => {
    if (formData.news_string.length > 0) {
      setIsFiltering(true);
      resetPagination();
    } else {
      setIsFiltering(false);
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={2}>{`News`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<PlusOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/news/add`,
                })
              }
            >{`Add`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form
          name={`filter-form`}
          form={filterForm}
          onFinish={handleFilterNews}
        >
          <Space>
            <Form.Item name={`news_string`} initialValue={``}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item>
              <Button
                type={`primary`}
                htmlType={`submit`}
                loading={loading}
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Space>
        </Form>
      </Row>

      {/* List */}
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={news}
            rowKey={`id`}
            pagination={{
              disabled: loading,
              responsive: true,
              total,
              defaultCurrent: pagination.page,
              current: pagination.page,
              defaultPageSize: pagination.size,
              pageSize: pagination.size,
              pageSizeOptions: ['5', '10', '25'],
              showSizeChanger: total > pagination.size,
              onChange: handleChangePagination,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default NewsDefaultView;
