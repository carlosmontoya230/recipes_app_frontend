import React, { useState } from 'react';
import { AppstoreOutlined, LikeOutlined, LogoutOutlined, SearchOutlined, SettingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from "react-router-dom";

import './Header.scss';

const items: MenuProps['items'] = [
  {
    label: (
      <Link to="recetas">Recetas</Link>
    ),
    icon: <AppstoreOutlined />,
    key: 'recetas',
  },
  {
    label: (
      <Link to="search">Buscador</Link>
    ),
    icon: <SearchOutlined />, 
    key: 'search',
  },
  {
    label: (
      <Link to="favorite">Favoritos</Link>
    ),
    icon: <StarOutlined />,
    key: 'favorite',
  },
  {
    label: (
      <Link to="liked">Me gusta</Link>
    ),
    icon: <LikeOutlined />,
    key: 'liked',
  },
  {
    label: (
      <UserOutlined />
    ),
    key: 'user',
    children: [
      {
        label: 'Configuración',
        key: 'setting:1',
        icon: <SettingOutlined/>,
      },
      {
        label: 'Cerrar Sesion',
        key: 'logout',
        icon: <LogoutOutlined />
      },
    ],
  }
];

interface LoginProps {
  setLogin: (status: boolean) => void;
}

export default function Header({ setLogin }: LoginProps) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('recetas');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    if (e.key === 'logout') {
      localStorage.clear();
      navigate('login');
      setLogin(false);
    }
    setCurrent(e.key);
  };

  return( 
    <Menu 
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} 
      style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}/>
    );
}
