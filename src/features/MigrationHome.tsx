import { Card, Space, Tag, Typography } from 'antd'
import { useI18n, type MessageKey } from '@shared/i18n'

const migrationTargets = [
  { route: '/sqqr', source: 'src/matter/bb2gjjywmxweb/pages/sqqr-pc/sqqr.js', priorityKey: 'migration.priority.p0' },
  { route: '/dkjdcx', source: 'src/matter/bb2gjjywmxweb/pages/dk/dkjdcx/index', priorityKey: 'migration.priority.p0' },
  { route: '/dxslglComp/dxslglfq/index', source: 'src/components/dxslglComp/dxslglfq/index', priorityKey: 'migration.priority.p1' },
  { route: '/dxslglComp/dxslglsp/index', source: 'src/components/dxslglComp/dxslglsp/index', priorityKey: 'migration.priority.p1' },
  { route: '/dxslglComp/dxslglth/index', source: 'src/components/dxslglComp/dxslglthyf/index', priorityKey: 'migration.priority.p2' }
] satisfies Array<{
  route: string
  source: string
  priorityKey: MessageKey
}>

export function MigrationHome() {
  const { t } = useI18n()

  return (
    <Space direction="vertical" size="large" className="page-stack">
      <div>
        <Typography.Title>{t('migration.home.title')}</Typography.Title>
        <Typography.Paragraph>
          {t('migration.home.description')}
        </Typography.Paragraph>
      </div>
      <div className="migration-grid">
        {migrationTargets.map(item => (
          <Card key={item.route} title={item.route}>
            <Space direction="vertical">
              <Tag color={item.priorityKey === 'migration.priority.p0' ? 'red' : 'blue'}>{t(item.priorityKey)}</Tag>
              <Typography.Text code>{item.source}</Typography.Text>
            </Space>
          </Card>
        ))}
      </div>
    </Space>
  )
}
