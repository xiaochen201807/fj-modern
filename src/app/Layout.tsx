import { Layout as AntLayout, Menu, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router'

const items = [
  { key: '/', label: '迁移概览' },
  { key: '/sqqr', label: '申请确认' },
  { key: '/dkjdcx', label: '贷款进度查询' },
  { key: '/dxslglComp/dxslglfq/index', label: '对象实例发起' }
]

export function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AntLayout className="layout-root">
      <AntLayout.Sider width={232} className="layout-sider">
        <Typography.Title level={4} className="brand-title">fj-modern</Typography.Title>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </AntLayout.Sider>
      <AntLayout.Content className="layout-content">
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  )
}
