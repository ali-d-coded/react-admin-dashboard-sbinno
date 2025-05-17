import { Button, Checkbox, Flex, Form, Input, message, type FormProps } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLogin } from "../../stores/globalStore";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const login = useLogin();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  type FieldType = {
    email?: string;
    password?: string;
  };

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
    try {
      const res = login({
        email:values.email,
        password:values.password
      });
      console.log({res});
      messageApi.open({
      type: 'error',
      content: "Login Success",
    });
    navigate("/");

    } catch (error:any) {
      console.log({error: error.message});
      
      messageApi.open({
      type: 'error',
      content: error.message,
    });
    }

};

  return (
    <div className="grid justify-center items-center h-screen bg-slate-50">
        {contextHolder}
      <section className=" shadow-2xl p-4 w-[400px] max-w-[400px]">
         <h1 className="text-2xl text-center mb-4">
          Welcome Back
         </h1>
         <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, type:"email", message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
      </section>
    </div>
  )
}