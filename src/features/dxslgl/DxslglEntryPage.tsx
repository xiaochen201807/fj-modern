import { Card, Typography } from 'antd'
import { useI18n } from '@shared/i18n'

type DxslglEntryPageProps = {
  flow: 'fq' | 'sp' | 'th'
}

const flowNameKeys = {
  fq: 'dxslgl.flow.fq',
  sp: 'dxslgl.flow.sp',
  th: 'dxslgl.flow.th'
} as const

export function DxslglEntryPage({ flow }: DxslglEntryPageProps) {
  const { t } = useI18n()
  const flowName = t(flowNameKeys[flow])

  return (
    <Card title={t('dxslgl.placeholder.title', { flowName })}>
      <Typography.Paragraph>
        {t('dxslgl.placeholder.description')}
      </Typography.Paragraph>
    </Card>
  )
}
