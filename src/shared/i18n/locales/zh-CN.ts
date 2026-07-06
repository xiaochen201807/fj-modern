export const zhCNMessages = {
  'app.brand': 'fj-modern',
  'app.menu.overview': '迁移概览',
  'app.menu.sqqr': '申请确认',
  'app.menu.dkjdcx': '贷款进度查询',
  'app.menu.dxslglfq': '对象实例发起',
  'migration.home.title': '现代化迁移工作台',
  'migration.home.description': '当前项目用于从旧 React 16 / CRA4 应用按路由迁移到 React 19 / Vite 8 / Ant Design 6。',
  'migration.priority.p0': 'P0',
  'migration.priority.p1': 'P1',
  'migration.priority.p2': 'P2',
  'sqqr.placeholder.title': '申请确认迁移占位',
  'sqqr.placeholder.description': '旧路由来源：src/matter/bb2gjjywmxweb/pages/sqqr-pc/sqqr.js。迁移时先替换全局参数读取和父子应用通信逻辑。',
  'dkjdcx.placeholder.title': '贷款进度查询迁移占位',
  'dkjdcx.placeholder.description': '旧路由来源：src/matter/bb2gjjywmxweb/pages/dk/dkjdcx/index。迁移时优先拆分接口请求、表单状态和展示组件。',
  'dxslgl.flow.fq': '对象实例发起',
  'dxslgl.flow.sp': '对象实例审批',
  'dxslgl.flow.th': '对象实例退回',
  'dxslgl.placeholder.title': '{flowName}迁移占位',
  'dxslgl.placeholder.description': '旧对象实例模块依赖较多，迁移时先抽离公共 utils、表单协议和流程状态，再迁入具体页面。'
} as const

export type MessageKey = keyof typeof zhCNMessages
