import { FC } from 'react';
import { Avatar, AvatarProps } from 'antd';

interface AvatarStatusProps extends AvatarProps {
  id?: any;
  name?: string;
  src?: string;
  type?: string;
  suffix?: string;
  subTitle?: string;
  text?: string;
  onNameClick?: (e?: any) => any;
}

const AvatarStatus: FC<AvatarStatusProps> = ({
  name,
  suffix,
  subTitle,
  id,
  type,
  src,
  icon,
  size,
  shape,
  gap,
  text,
  onNameClick,
}) => {
  return (
    <div className='avatar-status d-flex align-items-center'>
      <Avatar
        className={`ant-avatar-${type}`}
        icon={icon}
        src={src}
        size={size}
        shape={shape}
        gap={gap}
      >
        {text}
      </Avatar>
      <div className='ml-2'>
        <div>
          {onNameClick ? (
            <div
              onClick={() => onNameClick({ name, subTitle, src, id })}
              className='avatar-status-name clickable'
            >
              {name}
            </div>
          ) : (
            <div className='avatar-status-name'>{name}</div>
          )}
          <span>{suffix}</span>
        </div>
        <div className='text-muted avatar-status-subtitle'>{subTitle}</div>
      </div>
    </div>
  );
};

export default AvatarStatus;
