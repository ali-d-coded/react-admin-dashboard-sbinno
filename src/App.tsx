import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Grid, Layout, Menu, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';
import { useGlobalStoreDarkMode, useGlobalStoreToggleDarkMode } from './stores/globalStore';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const screens = useBreakpoint();
  const darkMode = useGlobalStoreDarkMode();
  const toggleDarkMode = useGlobalStoreToggleDarkMode();
  const { token } = theme.useToken();

  // Apply dark mode to HTML element for global CSS variables
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  const navLinks = [
    {
      title: 'Home',
      link: '/',
      icon: <UserOutlined />,
    },
    {
      title: 'Users',
      link: '/users',
      icon: <VideoCameraOutlined />,
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <UploadOutlined />,
    },
  ];

  // Create consistent theme styles
  const themeStyles = {
    background: darkMode ? 'bg-zinc-900' : 'bg-white',
    componentBg: darkMode ? 'bg-zinc-100' : 'bg-white',
    textColor: darkMode ? 'text-white' : 'text-black',
    borderColor: darkMode ? 'border-zinc-700' : 'border-gray-200',
  };

  const menu = (
    <Menu
      className="h-full"
      theme={darkMode ? 'dark' : 'light'}
      mode="inline"
      defaultSelectedKeys={['home']}
    >
      {navLinks.map((link) => (
        <Menu.Item key={link.title.toLowerCase()} icon={link.icon}>
          <NavLink to={link.link}>{link.title}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout className={`h-screen transition-colors duration-300 ${themeStyles.background} ${themeStyles.textColor}`}>
      {/* Desktop Sidebar */}
      {screens.lg ? (
        <Sider
          collapsible
          theme={darkMode ? 'dark' : 'light'}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className={`transition-colors duration-300 ${darkMode ? 'border-r border-zinc-700' : ''}`}
          style={{
            boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <div className={`h-16 flex items-center justify-center text-lg font-bold ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-gray-800'}`}>
            {!collapsed ? 'MyApp' : 'M'}
          </div>
          {menu}
        </Sider>
      ) : (
        // Mobile Drawer Sidebar
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          className={darkMode ? 'dark-drawer' : ''}
          styles={{
            body: {
              padding: 0,
              backgroundColor: darkMode ? token.colorBgContainer : 'white',
            },
            content: {
              backgroundColor: darkMode ? token.colorBgContainer : 'white',
            }
          }}
        >
          <div className={`h-16 flex items-center justify-center text-lg font-bold ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-gray-800'}`}>
            MyApp
          </div>
          {menu}
        </Drawer>
      )}

      <Layout>
        <Header
        
          className={` flex items-center justify-between px-4 transition-colors duration-300  border-b`}
          style={{ paddingInline: 16 }}
        >
          <Button
            type="text"
            icon={
              screens.lg
                ? collapsed
                  ? <MenuUnfoldOutlined />
                  : <MenuFoldOutlined />
                : <MenuUnfoldOutlined />
            }
            onClick={() =>
              screens.lg ? setCollapsed(!collapsed) : setDrawerVisible(true)
            }
            style={{ 
              fontSize: 18,
              color:  "white"
            }}
          />
          <div className='flex gap-5'>

            <div className='text-white'>
              <button className='cursor-pointer ' onClick={() => toggleDarkMode()}> 
              {
                darkMode ? (<SunOutlined />) : (<MoonOutlined />)
              }
              </button>
              
            </div>

          <LogoutButton />
          </div>
        </Header>

        <Content
          className={`m-4 p-6 min-h-[280px] rounded-lg transition-colors duration-300 ${themeStyles.componentBg} ${themeStyles.borderColor} border`}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;