import {
    CloudOutlined,
    GlobalOutlined,
    SettingOutlined,
    HistoryOutlined
} from '@ant-design/icons';

export const USER_MENU = [{
    name: '地图',
    path: '/map',
    icon: <GlobalOutlined />
}, {
    name: '天气',
    path: '/',
    icon: <CloudOutlined />
}, {
    name: '历史',
    path: '/history',
    icon: <HistoryOutlined />
}, {
    name: '设置',
    path: '/setting',
    icon: <SettingOutlined />
}]