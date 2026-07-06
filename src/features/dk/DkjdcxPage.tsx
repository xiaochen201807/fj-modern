import { Card, Typography } from 'antd'
import { useI18n } from '@shared/i18n'

export function DkjdcxPage() {
  const { t } = useI18n()

  return (
    <Card title={t('dkjdcx.placeholder.title')}>
      <Typography.Paragraph>
        {t('dkjdcx.placeholder.description')}
      </Typography.Paragraph>
    </Card>
  )
}
