import { FC, useState, useRef } from 'react';
import {
  DashboardOutlined,
  AppstoreOutlined,
  AntDesignOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AutoComplete, Input } from 'antd';

// Configs
import navigationConfig from '@/configs/nav';

// Components
import IntlMessage from '@/components/util/IntlMessage';

function getOptionList(navigationTree: any, optionTree: any = []) {
  optionTree = optionTree ? optionTree : [];
  for (const navItem of navigationTree) {
    if (navItem.submenu.length === 0) {
      optionTree.push(navItem);
    }
    if (navItem.submenu.length > 0) {
      getOptionList(navItem.submenu, optionTree);
    }
  }
  return optionTree;
}

const optionList = getOptionList(navigationConfig);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'dashboards':
      return <DashboardOutlined className='text-success' />;
    case 'apps':
      return <AppstoreOutlined className='text-danger' />;
    case 'components':
      return <AntDesignOutlined className='text-primary' />;
    case 'extra':
      return <FileTextOutlined className='text-warning' />;
    default:
      return null;
  }
};

const searchResult = (searchText?: string) =>
  optionList.map((item: any) => {
    const category = item.key.split('-')[0];
    console.log({
      searchText,
    });
    return {
      value: item.path,
      label: (
        <Link to={item.path}>
          <div className='search-list-item'>
            <div className='icon'>{getCategoryIcon(category)}</div>
            <div>
              <div className='font-weight-semibold'>
                <IntlMessage id={item.title} />
              </div>
              <div className='font-size-sm text-muted'>{category} </div>
            </div>
          </div>
        </Link>
      ),
    };
  });

interface SearchInputProps {
  active?: boolean;
  close?: any;
  isMobile?: boolean;
  mode?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  active = false,
  close,
  isMobile = false,
  mode = 'light',
}) => {
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelect = (): void => {
    setValue('');
    setOptions([]);
    if (close) {
      close();
    }
  };

  const onSearch = (searchText: string) => {
    setValue(searchText);
    setOptions(!searchText ? [] : searchResult(searchText));
  };

  const autofocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (active) {
    autofocus();
  }

  return (
    <AutoComplete
      ref={inputRef}
      className={`nav-search-input ${isMobile ? 'is-mobile' : ''} ${
        mode === 'light' ? 'light' : ''
      }`}
      dropdownClassName='nav-search-dropdown'
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      value={value}
      filterOption={(inputValue, option: any) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Input
        placeholder='Search...'
        prefix={<SearchOutlined className='mr-0' />}
      />
    </AutoComplete>
  );
};

export default SearchInput;
