import { Card, Typography } from 'antd'

type DxslglEntryPageProps = {
  flow: 'fq' | 'sp' | 'th'
}

const flowNames = {
  fq: '对象实例发起',
  sp: '对象实例审批',
  th: '对象实例退回'
}

export function DxslglEntryPage({ flow }: DxslglEntryPageProps) {
  return (
    <Card title={`${flowNames[flow]}迁移占位`}>
      <Typography.Paragraph>
        旧对象实例模块依赖较多，迁移时先抽离公共 utils、表单协议和流程状态，再迁入具体页面。
      </Typography.Paragraph>
    </Card>
  )
}
