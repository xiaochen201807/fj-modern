import { Card, Space, Tag, Typography } from 'antd'

const migrationTargets = [
  { route: '/sqqr', source: 'src/matter/bb2gjjywmxweb/pages/sqqr-pc/sqqr.js', priority: 'P0' },
  { route: '/dkjdcx', source: 'src/matter/bb2gjjywmxweb/pages/dk/dkjdcx/index', priority: 'P0' },
  { route: '/dxslglComp/dxslglfq/index', source: 'src/components/dxslglComp/dxslglfq/index', priority: 'P1' },
  { route: '/dxslglComp/dxslglsp/index', source: 'src/components/dxslglComp/dxslglsp/index', priority: 'P1' },
  { route: '/dxslglComp/dxslglth/index', source: 'src/components/dxslglComp/dxslglthyf/index', priority: 'P2' }
]

export function MigrationHome() {
  return (
    <Space direction="vertical" size="large" className="page-stack">
      <div>
        <Typography.Title>现代化迁移工作台</Typography.Title>
        <Typography.Paragraph>
          当前项目用于从旧 React 16 / CRA4 应用按路由迁移到 React 19 / Vite 8 / Ant Design 6。
        </Typography.Paragraph>
      </div>
      <div className="migration-grid">
        {migrationTargets.map(item => (
          <Card key={item.route} title={item.route}>
            <Space direction="vertical">
              <Tag color={item.priority === 'P0' ? 'red' : 'blue'}>{item.priority}</Tag>
              <Typography.Text code>{item.source}</Typography.Text>
            </Space>
          </Card>
        ))}
      </div>
    </Space>
  )
}
