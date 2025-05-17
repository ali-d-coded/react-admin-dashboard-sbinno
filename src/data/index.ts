import { UserOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

interface Stat {
  key: number;
  title: string;
  value: number;
  icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
}

export const stats: Stat[] = [
  {
    key: 1,
    title: "Users",
    value: 120,
    icon: UserOutlined
  },
  {
    key: 2, 
    title: "Active Sessions",
    value: 45,
    icon: CheckOutlined
  },
  {
    key: 3,
    title: "Pending Requests", 
    value: 8,
    icon: ClockCircleOutlined
  }
];


export const userFlow = [

  { month: "Jan", registrations: 30 },

  { month: "Feb", registrations: 45 },

  { month: "Mar", registrations: 60 },

  { month: "Apr", registrations: 40 },

  { month: "May", registrations: 80 },

  { month: "Jun", registrations: 70 }
]

export const activeUsers = [

  { role: "Admin", count: 5 },

  { role: "Editor", count: 12 },

  { role: "Viewer", count: 25 }
]