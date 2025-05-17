import { Button, Checkbox, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useGlobalStoreDarkMode, useGlobalStoreToggleDarkMode, useUpdateUser, useUser } from "../../stores/globalStore";


type Props = {};

export default function Settings({}: Props) {
  const [form] = Form.useForm();

    const user = useUser();
  const updateUser = useUpdateUser();

  const darkMode = useGlobalStoreDarkMode();
  const toggleDarkMode = useGlobalStoreToggleDarkMode();

  // Optional: preload form with default values
  useEffect(() => {
    form.setFieldsValue({
      name: "John Doe",
      email: "john@example.com"
    });
  }, [form]);

  const onFinish = (values: any) => {
    console.log({
      ...values,
      darkMode
    });
    
       updateUser({ name: values.name, email: values.email });
    message.success("Profile updated successfully");
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode(); // Zustand handles the state toggle + persist
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark-mode:bg-slate-800 dark-mode:text-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}
        initialValues={{
          name: user?.name,
          email: user?.email
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={darkMode}
            onChange={handleDarkModeToggle}
          >
            Enable Dark Mode
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
