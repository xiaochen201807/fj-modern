import { Alert, Button, Descriptions, Space, Spin, Steps } from 'antd'
import { useEffect, useState } from 'react'
import { PageShell } from '@app/shell'
import { useI18n } from '@shared/i18n'
import { getLoanProgress } from './dkjdcx/api'
import { getProgressStepIndex, loanProgressSteps, type LoanProgressSnapshot } from './dkjdcx/model'

export function DkjdcxPage() {
  const { t } = useI18n()
  const [progress, setProgress] = useState<LoanProgressSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function loadProgress() {
    setLoading(true)
    setError(false)

    try {
      const result = await getLoanProgress()
      setProgress(result)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    getLoanProgress()
      .then(result => {
        if (active) {
          setProgress(result)
        }
      })
      .catch(() => {
        if (active) {
          setError(true)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const currentStep = progress ? getProgressStepIndex(progress.currentProgress) : 0
  const currentProgressLabel = progress ? t(loanProgressSteps[currentStep].titleKey) : ''

  return (
    <PageShell
      title={t('dkjdcx.page.title')}
      description={t('dkjdcx.page.description')}
      extra={<Button onClick={loadProgress}>{t('dkjdcx.actions.refresh')}</Button>}
    >
      <Space orientation="vertical" size="large" className="dkjdcx-page">
        {error && (
          <Alert
            type="error"
            showIcon
            message={t('dkjdcx.errors.loadFailed')}
          />
        )}

        <Spin spinning={loading}>
          {progress && (
            <Space orientation="vertical" size="large" className="dkjdcx-page__content">
              <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }} size="middle">
                <Descriptions.Item label={t('dkjdcx.fields.currentProgress')}>
                  {currentProgressLabel}
                </Descriptions.Item>
                <Descriptions.Item label={t('dkjdcx.fields.source')}>
                  {t('dkjdcx.source.legacyStatic')}
                </Descriptions.Item>
              </Descriptions>

              <Steps
                current={currentStep}
                items={loanProgressSteps.map(step => ({
                  title: t(step.titleKey),
                  content: t(step.descriptionKey)
                }))}
              />
            </Space>
          )}
        </Spin>
      </Space>
    </PageShell>
  )
}
