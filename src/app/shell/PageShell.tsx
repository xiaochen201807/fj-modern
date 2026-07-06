import { Card, Space, Typography, type CardProps } from 'antd'
import type { ReactNode } from 'react'

export interface PageShellProps {
  title: ReactNode
  description?: ReactNode
  extra?: CardProps['extra']
  children: ReactNode
}

export function PageShell({ title, description, extra, children }: PageShellProps) {
  return (
    <Space orientation="vertical" size="large" className="page-shell">
      <div className="page-shell__header">
        <div>
          <Typography.Title level={3} className="page-shell__title">
            {title}
          </Typography.Title>
          {description && (
            <Typography.Paragraph className="page-shell__description">
              {description}
            </Typography.Paragraph>
          )}
        </div>
        {extra && <div className="page-shell__extra">{extra}</div>}
      </div>
      <Card className="page-shell__body">
        {children}
      </Card>
    </Space>
  )
}
