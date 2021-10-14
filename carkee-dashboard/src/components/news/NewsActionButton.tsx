import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Space, Dropdown, Button, Modal, notification } from 'antd';
import {
  MenuOutlined,
  InfoOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

// Types
import { News } from '@/types/news';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

export interface NewsActionButtonProps {
  news: News;
  view?: boolean;
  edit?: boolean;
  remove?: boolean;
  onFinishRemove?: () => Promise<void> | void;
}

const NewsActionButton: FC<NewsActionButtonProps> = ({
  news,
  view = true,
  edit = true,
  remove = true,
  onFinishRemove = () => {},
}) => {
  const history = useHistory();
  const [removeModalVisibility, setRemoveModalVisibility] =
    useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  const handleShowRemoveModal = () => {
    setRemoveModalVisibility(true);
  };
  const handleHideRemoveModal = () => {
    setRemoveModalVisibility(false);
  };

  const handleRemoveNews = async () => {
    try {
      setRemoveLoading(true);

      const { data } = await axios.delete('/api/news/removeNews', {
        data: {
          news_id: news.id,
        },
      });

      notification.success({
        message: data.message,
      });

      setRemoveLoading(false);
      setRemoveModalVisibility(false);

      onFinishRemove();
    } catch (err) {
      setRemoveLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
      }
    }
  };

  const actionMenu = (
    <Menu>
      {view && (
        <Menu.Item
          key={`view`}
          onClick={() =>
            history.push({
              pathname: `${APP_PREFIX_PATH}/news/${news.id}`,
            })
          }
        >
          <Space>
            <InfoOutlined />
            {`View`}
          </Space>
        </Menu.Item>
      )}
      {edit && (
        <Menu.Item
          key={`edit`}
          onClick={() =>
            history.push({
              pathname: `${APP_PREFIX_PATH}/news/edit/${news.id}`,
            })
          }
        >
          <Space>
            <EditOutlined />
            {`Edit`}
          </Space>
        </Menu.Item>
      )}
      {remove && (
        <Menu.Item key={`remove`} onClick={handleShowRemoveModal}>
          <Space>
            <DeleteOutlined />
            {`Remove`}
          </Space>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={actionMenu} trigger={['click']}>
        <Button icon={<MenuOutlined />} />
      </Dropdown>

      {/* Remove Modal */}
      <Modal
        title={`Confirm Removal`}
        visible={removeModalVisibility}
        confirmLoading={removeLoading}
        okType={`danger`}
        okText={`Remove`}
        onOk={handleRemoveNews}
        onCancel={handleHideRemoveModal}
      >
        <Space align={`baseline`}>
          <ExclamationCircleOutlined />
          {`Are you sure you want to delete "${news.title}"?`}
        </Space>
      </Modal>
    </>
  );
};

export default NewsActionButton;
