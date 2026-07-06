import { Card, Typography } from 'antd'
import { useI18n } from '@shared/i18n'

export function SqqrPage() {
  const { t } = useI18n()

  return (
    <Card title={t('sqqr.placeholder.title')}>
      <Typography.Paragraph>
        {t('sqqr.placeholder.description')}
      </Typography.Paragraph>
    </Card>
  )
}
