
import { useNavigate } from "react-router-dom";
import { useLogout } from "../stores/globalStore";
import {  LogoutOutlined} from "@ant-design/icons"; 

const LogoutButton = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return <button className="text-white" onClick={handleLogout}> <LogoutOutlined /></button>;
};

export default LogoutButton;