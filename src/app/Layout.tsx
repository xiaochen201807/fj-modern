import { Layout as AntLayout, Menu, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useI18n, type MessageKey } from '@shared/i18n'

const items = [
  { key: '/', labelKey: 'app.menu.overview' },
  { key: '/sqqr', labelKey: 'app.menu.sqqr' },
  { key: '/dkjdcx', labelKey: 'app.menu.dkjdcx' },
  { key: '/dxslglComp/dxslglfq/index', labelKey: 'app.menu.dxslglfq' }
] satisfies Array<{
  key: string
  labelKey: MessageKey
}>

export function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()

  return (
    <AntLayout className="layout-root">
      <AntLayout.Sider width={232} className="layout-sider">
        <Typography.Title level={4} className="brand-title">{t('app.brand')}</Typography.Title>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items.map(item => ({ key: item.key, label: t(item.labelKey) }))}
          onClick={({ key }) => navigate(key)}
        />
      </AntLayout.Sider>
      <AntLayout.Content className="layout-content">
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  )
}
