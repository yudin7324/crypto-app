import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../../images/logo.png';
import './Navbar.css';

const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  const location = useLocation();
  const pathName = location.pathname;
  const selectedRoute = () => [
    pathName.replace(/^(\/admin\/\w+)\/.*/, '$1')
  ];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    if(screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize])

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" style={{ marginRight: '5px' }}/>
        <Title level={4} style={{ margin: 0 }}>
          <Link className="logo-link" to="/">Crypto Road</Link>
        </Title> 
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}> 
          <MenuOutlined/>
        </Button>
      </div>
      {activeMenu && (
        <Menu selectedKeys={selectedRoute()} theme="dark" className="menu-list">
          <Item key={"/"} icon={<HomeOutlined/>}>
            <NavLink to="/">Главная страница</NavLink>
          </Item>
          <Item key={"/cryptocurrencies"} icon={<FundOutlined/>}>
            <NavLink to="/cryptocurrencies">Криптовалюты</NavLink>
          </Item>
          <Item key={"/exchanges"} icon={<MoneyCollectOutlined/>}>
            <NavLink to="/exchanges">Биржы</NavLink>
          </Item>
          <Item key={"/news"} icon={<BulbOutlined/>}>
            <NavLink to="/news">Новости</NavLink>
          </Item>
        </Menu>
      )} 
    </div>
  )
}

export default Navbar;
