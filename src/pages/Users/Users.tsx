import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Form,
  Button,
  Modal,
  Space
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const onFinish = (values: { name: string; email: string; company: string }) => {
    const newUser: User = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      company: { name: values.company },
    };
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
    },
  ];

  return (
    <div className="p-4 space-y-6 text-black dark:text-white transition-colors">
      {/* Top Controls */}
      <Space className="w-full justify-between flex-wrap" size="middle">
        <Input.Search
          placeholder="Search by name"
          allowClear
          enterButton
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </Space>

      {/* User Table */}
      <div className="rounded-lg overflow-hidden shadow dark:shadow-md dark:bg-zinc-800">
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          className="dark:bg-zinc-800 dark:text-white"
        />
      </div>

      {/* Modal with Form */}
      <Modal
        title={<span className="dark:text-white">Add New User</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="dark:bg-zinc-900"
        bodyStyle={{ backgroundColor: 'var(--tw-bg-opacity)' }}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label={<span className="dark:text-white">Name</span>}
            name="name"
            rules={[{ required: true, message: 'Enter name' }]}
          >
            <Input className="dark:bg-zinc-800 dark:text-white" />
          </Form.Item>
          <Form.Item
            label={<span className="dark:text-white">Email</span>}
            name="email"
            rules={[{ required: true, message: 'Enter email' }]}
          >
            <Input className="dark:bg-zinc-800 dark:text-white" />
          </Form.Item>
          <Form.Item
            label={<span className="dark:text-white">Company Name</span>}
            name="company"
            rules={[{ required: true, message: 'Enter company name' }]}
          >
            <Input className="dark:bg-zinc-800 dark:text-white" />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Add</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
