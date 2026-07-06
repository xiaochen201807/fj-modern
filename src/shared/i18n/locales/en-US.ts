import type { MessageKey } from './zh-CN'

export const enUSMessages: Record<MessageKey, string> = {
  'app.brand': 'fj-modern',
  'app.menu.overview': 'Migration Overview',
  'app.menu.sqqr': 'Application Confirmation',
  'app.menu.dkjdcx': 'Loan Progress Query',
  'app.menu.dxslglfq': 'Object Workflow Start',
  'migration.home.title': 'Modernization Migration Workspace',
  'migration.home.description': 'This project migrates the legacy React 16 / CRA4 application route by route to React 19 / Vite 8 / Ant Design 6.',
  'migration.priority.p0': 'P0',
  'migration.priority.p1': 'P1',
  'migration.priority.p2': 'P2',
  'sqqr.placeholder.title': 'Application Confirmation Migration Placeholder',
  'sqqr.placeholder.description': 'Legacy route source: src/matter/bb2gjjywmxweb/pages/sqqr-pc/sqqr.js. Replace global parameter access and parent-child application communication first during migration.',
  'dkjdcx.placeholder.title': 'Loan Progress Query Migration Placeholder',
  'dkjdcx.placeholder.description': 'Legacy route source: src/matter/bb2gjjywmxweb/pages/dk/dkjdcx/index. Split API requests, form state, and display components first during migration.',
  'dxslgl.flow.fq': 'Object Workflow Start',
  'dxslgl.flow.sp': 'Object Workflow Approval',
  'dxslgl.flow.th': 'Object Workflow Return',
  'dxslgl.placeholder.title': '{flowName} Migration Placeholder',
  'dxslgl.placeholder.description': 'The legacy object workflow module has many dependencies. Extract shared utilities, form contracts, and workflow state before migrating concrete pages.'
}
