# Frontend Architecture Plan / 前端架构规划

## 中文

### 目的

本项目不只是从 React 16 迁移到 React/Vite，而是一次受控的前端架构重建。目标是避免迁移后的项目继续出现旧项目中的问题：重复页面、隐式全局变量、未类型化请求、超大组件、UI 模式混乱、feature 之间相互泄漏，以及大量硬编码中文文案。

每个迁移路由都必须遵守本文档。例外情况必须记录在 `docs/migration.md`。

### 架构目标

- 业务 feature 应独立可理解、可测试、可替换。
- shared 代码必须显式、类型化、稳定且小。
- 不在证明必要性前复制旧抽象。
- 优先组合，不创建巨型配置化组件。
- 分离平台集成、数据访问、业务流程和 UI 渲染。
- 尽早暴露重复代码，阻断迁移过程中的复制粘贴。
- 默认支持未来多国语言版本，业务代码不得散落用户可见硬编码文案。

### 目录结构

```text
src/
  app/
    App.tsx
    Layout.tsx
    routes.tsx
    providers/
  features/
    dk/
      dkjdcx/
        api/
        components/
        hooks/
        model/
        pages/
        index.ts
    sqqr/
    tq/
    dxslgl/
  shared/
    api/
    assets/
    components/
    config/
    constants/
    hooks/
    i18n/
    lib/
    qiankun/
    types/
    ui/
  legacy/
```

### 目录职责

| 目录 | 职责 | 允许依赖 |
|---|---|---|
| `src/app` | 应用壳、路由注册、providers、布局、全局错误边界 | `features`, `shared` |
| `src/features/<domain>` | 业务路由和领域逻辑 | 当前领域代码, `shared` |
| `src/shared/ui` | 基于 Ant Design 的项目级设计系统组件 | React, Ant Design, `shared/lib`, `shared/i18n` |
| `src/shared/components` | 不绑定具体业务域的复合组件 | `shared/ui`, `shared/hooks`, `shared/lib`, `shared/i18n` |
| `src/shared/api` | HTTP client、拦截器、类型化请求工具 | axios, `shared/types`, `shared/qiankun` |
| `src/shared/i18n` | 多语言资源、翻译函数、locale 管理、格式化入口 | `shared/lib` |
| `src/shared/qiankun` | 微前端运行时、父应用通信、注入上下文 | 不允许依赖 feature |
| `src/shared/lib` | 不依赖 React、无业务含义的纯工具 | 不允许依赖 feature |
| `src/shared/hooks` | 无业务含义的通用 React hooks | React, `shared/lib` |
| `src/shared/types` | 全局技术类型 | types only |
| `src/legacy` | 带删除计划的临时兼容层 | 受限 |

feature 代码不得直接 import 另一个 feature。如果两个 feature 需要同一逻辑，只有确认它是领域无关逻辑后才能抽到 `shared`。如果逻辑只在同一业务域内复用，应保留在该 domain 内。

### Feature 模块标准

非平凡业务路由应采用以下结构：

```text
features/<domain>/<feature>/
  api/
    <feature>Api.ts
    <feature>Api.types.ts
  components/
    <FeaturePanel>.tsx
  hooks/
    use<Feature>.ts
  model/
    <feature>Model.ts
    <feature>Schema.ts
  pages/
    <FeaturePage>.tsx
  i18n/
    zh-CN.ts
    en-US.ts
  index.ts
```

规则：

- `pages/` 只负责路由、query 参数、页面标题和顶层布局装配。
- `components/` 负责 UI 渲染并接收类型化 props，不直接调用 API。
- `hooks/` 负责状态、副作用和业务流程编排。
- `api/` 负责后端调用和请求/响应类型。
- `model/` 负责领域类型、数据归一化、映射、常量和校验。
- `i18n/` 负责当前 feature 的语言资源。可复用文案才上升到 `shared/i18n`。
- `index.ts` 导出 feature 公共表面。外部不应 deep-import 私有文件。

### 组件分层

| 层级 | 位置 | 示例 | 规则 |
|---|---|---|---|
| 基础 UI | `shared/ui` | `AppButton`, `AppModal`, `AppForm`, `AppTable`, `AppUpload` | Ant Design 薄封装；无业务逻辑 |
| 共享复合组件 | `shared/components` | `FilePreview`, `PdfViewer`, `QueryToolbar`, `PageHeader` | 跨业务域复用；无领域文案和接口 |
| 领域组件 | `features/<domain>/**/components` | `LoanProgressCard`, `ApplicantInfoPanel` | 可包含业务术语；不得跨 domain import |
| 页面组件 | `features/<domain>/**/pages` | `DkjdcxPage` | 只做路由级编排，保持薄 |

组件进入 `shared` 必须同时满足：

- 至少两个业务域使用，或有明确且近期的第二消费者。
- 不硬编码业务接口、路由、机构编码、流程编码、字段含义或中文文案。
- 暴露类型化、最小化的 props API。
- 有清晰 owner 和示例。
- 非平凡行为有测试。

### 组件 API 标准

- 表单类组件优先使用受控 props：`value`、`onChange`、`disabled`、`status`。
- 使用显式回调：`onSubmit`、`onCancel`、`onPreview`、`onRemove`。
- 避免 `config`、`data`、`options`、`extra` 等大而泛的 props，除非类型非常窄并有文档。
- 避免 boolean props 爆炸。复杂变体使用 discriminated union。
- 高层业务组件不暴露 Ant Design 内部类型，除非该组件本身就是 Ant Design adapter。
- 不把后端原始响应对象传入 UI 组件。先在 `model/` 或 `api/` 中归一化。
- 组件对外展示文案应接收 i18n key 或已本地化文本，不直接写死中文。

### 组件规模规则

- 超过 200 行的组件需要说明原因。
- 超过 300 行的组件必须拆分后才能标记迁移完成。
- 同一文件混合渲染、API 调用、数据归一化和事件编排不可接受。
- 两个迁移路由出现重复 JSX 块时，第二个路由完成前必须抽取。

### 设计系统策略

不要立即包装所有 Ant Design 组件。只封装应用需要一致行为的组件。

### 平台层与主题边界

迁移后的业务开发目标是只修改 `features/<domain>/<feature>` 下的业务代码。主题、页面框架、全局 providers、网关上下文、请求透传、错误边界和通用 UI 组件都属于平台层，不应在业务页面中重复实现。

当前项目先在 app 内建立未来可抽包的边界：

```text
src/app/providers/       应用级 Provider 编排，例如 i18n、theme、后续 gateway/api provider
src/app/shell/           应用页面框架，例如 PageShell、错误边界、权限兜底页
src/shared/theme/        design tokens、Ant Design theme adapter、CSS variables、ThemeProvider
src/shared/ui/           项目级通用 UI 组件 public API
src/shared/gateway/      后续网关上下文 SDK，见独立 Issue
src/shared/testing/      后续测试工具，减少业务测试样板
```

业务 feature 允许使用平台 public API，例如 `@app/shell`、`@shared/ui`、`@shared/api` 和 `@shared/i18n`。业务 feature 不得直接配置 `ConfigProvider`、不得创建 axios 实例、不得直接读取 qiankun 或网关全局变量。

主题拆分为两个概念：

| 层级 | 当前位置 | 未来包名 | 职责 |
|---|---|---|---|
| Design tokens | `src/shared/theme/tokens.ts` | `@fj/tokens` | 颜色、字体、间距、圆角、阴影、状态色等不依赖 React 的设计变量 |
| Theme adapter | `src/shared/theme` | `@fj/theme` | Ant Design theme、CSS variables、ThemeProvider 和 locale bridge |

`PageShell` 是页面根框架的唯一入口。业务页面应把标题、描述和页面级操作交给 `PageShell`，页面内部只装配业务组件。

```tsx
export function BusinessPage() {
  return (
    <PageShell title={t('business.page.title')} description={t('business.page.description')}>
      <BusinessPanel />
    </PageShell>
  )
}
```

`src/shared/ui` 的组件准入标准：

- 至少两个页面或一个明确近期页面会复用。
- 不绑定具体业务字段、接口、流程编码或机构编码。
- 不硬编码业务中文文案。
- 通过 public `index.ts` 导出，不允许业务 deep import 内部实现。
- 非平凡行为必须有测试。

第一批 `shared/ui` 候选：

| 组件 | 目的 |
|---|---|
| `AppPage` | 统一页面间距、标题、操作区、loading、error、empty 状态 |
| `AppButton` | 权限、loading 和常用按钮变体 |
| `AppModal` | 统一宽度、footer 行为、销毁策略和异步确认 |
| `AppForm` | 统一表单布局、提交行为、校验消息归一化 |
| `AppTable` | 统一分页、空状态、密度、loading、row key |
| `AppUpload` | 统一上传状态、文件限制、类型限制和错误展示 |
| `AppDatePicker` | 只使用 dayjs，并统一后端序列化 |
| `AppResult` | 成功、失败、处理中、提交完成状态 |

暂不封装：

- 简单 typography 和 layout，除非出现明显重复不一致。
- 低频 Ant Design 组件。
- 高度业务化组件。

### 数据访问标准

所有 HTTP 请求必须通过 `src/shared/api`。

```text
shared/api/
  httpClient.ts
  request.ts
  errors.ts
  types.ts
```

规则：

- feature 代码不得直接 import `axios`。
- 每个 API 函数必须定义请求和响应类型。
- 后端响应归一化属于 `api/` 或 `model/`，不属于 JSX。
- 路由级异步查询存在过期响应风险时应支持请求取消。
- query 参数、qiankun 注入参数和父应用上下文必须通过 shared adapter 读取。
- 错误处理应返回类型化应用错误，UI 不解析原始后端错误结构。

### 网关上下文标准

所有页面入口和后续业务请求都必须通过 `src/shared/gateway` 读取、校验和透传网关上下文。业务 feature 不得直接读取 `window.SY_QIANKUN`、`window.IS_SY_QIANKUN`、`window.__POWERED_BY_QIANKUN__`，也不得手动拼接网关 headers。

当前边界：

```text
src/shared/gateway/
  types.ts             网关上下文、校验结果和 headers 类型
  parse.ts             从 qiankun props、URL 和 dev mock 解析上下文
  validate.ts          前端基础结构校验
  headers.ts           生成请求透传 headers
  GatewayProvider.tsx  应用级上下文 Provider
  useGateway.ts        业务读取网关状态的 public hook
  context.ts           request 层读取当前上下文的运行时存储
```

`src/shared/api/request.ts` 会自动合并 `createGatewayHeaders()`，所以业务 API 函数只需要描述业务请求：

```ts
export function getLoanProgress(params: LoanProgressQuery) {
  return request<LoanProgressResponse>({
    url: '/loan/progress',
    method: 'GET',
    params
  })
}
```

前端 SDK 的安全边界：

- 只做统一解析、基础结构校验、headers 生成和开发模式 mock。
- 不保存服务端密钥、签名密钥或可提升权限的秘密。
- 不把前端传入的用户、机构、租户、角色当作可信事实。
- 可信鉴权、token 过期、签名校验、重放保护和数据范围过滤必须在网关或后端完成。
- 生产环境不得依赖 dev mock context。

如果需要临时兼容旧网关字段，应在 `src/shared/gateway/parse.ts` 中集中映射，不得散落到业务页面。

### 状态管理标准

默认使用本地 React state 和 feature hooks。只有证明必要时才引入更重的状态方案。

| 需求 | 默认选择 |
|---|---|
| 本地表单状态 | Ant Design Form 或本地 `useState` |
| 异步路由状态 | 带 loading/error/data 的 feature hook |
| 共享应用上下文 | `app/providers` 下的 React context |
| 跨路由缓存 | 至少两个路由需要时再引入 query/cache library |
| 复杂流程状态 | `useReducer` 加显式 events |
| 旧 MobX store | 迁移时替换，不复制 decorators |

MobX 4 class/decorator store 不得原样迁移。若旧 store 包含有价值业务规则，应先抽为纯函数和类型化 model。

### 路由标准

- 路由注册位于 `src/app/routes.tsx`。
- 真实路由 bundle 变大后，feature 页面应 lazy-load。
- 只有外部系统依赖 URL 时才保留旧路径。
- 新内部路由命名应面向业务域且稳定。
- 已迁移路由必须在 `docs/migration.md` 记录旧源码路径。

### 微前端标准

所有 qiankun 和父应用集成都必须通过 `src/shared/qiankun`。

规则：

- feature 中不得直接访问 `window.SY_QIANKUN`。
- feature 中不得直接调用 `window.parent.postMessage`。
- 页面组件中不得解析父应用注入 URL。
- 提供类型化 helper，例如 `getCurrentUser`、`getBusinessParam`、`emitWorkflowEvent`、`closeCurrentTab`。
- feature 代码应脱离 qiankun 全局变量可测试。

### 国际化标准

多语言能力是目标架构的一部分，不是上线前补丁。

资源建议结构：

```text
shared/i18n/
  index.ts
  locales/
    zh-CN.ts
    en-US.ts
features/<domain>/<feature>/i18n/
  zh-CN.ts
  en-US.ts
```

规则：

- 新增用户可见文案必须进入 i18n 资源。
- i18n key 使用稳定语义命名，例如 `dk.dkjdcx.actions.query`，不要使用整句中文作为 key。
- 表单校验、接口错误映射、空状态、弹窗标题、确认文案、表格列名都属于 i18n 范围。
- 日期、时间、数字、金额、百分比、文件大小必须通过统一 formatter。
- 后端枚举值先映射为稳定语义 key，再映射为语言文案。
- 不允许在 shared 组件中写死中文业务文案。
- 文案资源应能支持中文和英文；新增语言不得要求修改业务组件。

### Legacy 兼容策略

`src/legacy` 是隔离区，不是第二个 shared library。

允许：

- 为保持单个迁移路由运行所需的短期 adapter。
- 对不可避免旧协议的类型化 wrapper。
- 带明确删除条件的代码。

不允许：

- 新业务组件。
- 未重构的旧 store 复制品。
- 泛化 utility dump。
- 没有 owner 和删除计划的文件。

`src/legacy` 中每个文件必须说明：

- 旧源码路径。
- 为什么仍然存在。
- 删除前需要完成什么。

### NPM 包策略

项目应有意识地使用 npm 包。内部复用代码只有在复用和 owner 清晰后才应成为包。

平台层最终可以拆为私有包，但必须先在当前仓库内按包边界沉淀。不要因为“公共”就立即发布 npm 包；抽包必须服务于跨应用复用和版本治理。

推荐演进路线：

```text
阶段 1：src/shared 与 src/app 内部模块化
阶段 2：迁移 2-3 条真实路由后改为 pnpm workspace packages
阶段 3：多个应用复用时发布到私有 npm / GitHub Packages
```

未来建议包边界：

| 包名 | 依赖方向 | 职责 |
|---|---|---|
| `@fj/tokens` | 无 React/Ant Design 依赖 | 设计变量 |
| `@fj/theme` | 依赖 `@fj/tokens` | ThemeProvider、Ant Design theme、CSS variables |
| `@fj/ui` | 依赖 `@fj/theme`、`@fj/i18n` | 通用 UI 组件 |
| `@fj/app-shell` | 依赖 theme/ui/gateway/i18n | AppShell、PageShell、错误边界、权限兜底 |
| `@fj/gateway-client` | 不依赖业务 feature | 网关上下文解析、基础校验、请求透传数据生成 |
| `@fj/api-client` | 依赖 gateway-client | 统一 request、错误模型、headers 注入 |
| `@fj/testing` | 依赖 providers 和 testing library | renderWithProviders、mock gateway、route smoke helpers |

依赖方向必须单向：`tokens -> theme -> ui -> app-shell -> app`。禁止 theme 依赖 app-shell、ui 依赖业务 feature、tokens 依赖 React。

| 类别 | 位置 | 发布策略 |
|---|---|---|
| App-only 代码 | `src/features`, `src/shared` | 不发布 |
| 跨应用 UI kit | 未来 `packages/ui` 或独立仓库 | 私有 npm registry |
| 跨应用 SDK | 未来 `packages/platform-sdk` | 私有 npm registry |
| 配置预设 | 未来 `packages/eslint-config`, `packages/tsconfig` | 私有 npm registry |
| Legacy bridge | 先保留在 app 内 | 只有其他 app 需要时发布 |

创建内部包必须同时满足：

- 至少两个独立应用需要。
- API 可以在不依赖具体 app 业务知识的前提下版本化。
- 有 owner 负责发布和 changelog。
- 有测试、文档和示例。
- 不依赖 app 路由或 feature-specific 后端接口。

建议私有 registry 形式：

```ini
@fj:registry=https://npm.example.internal/repository/npm-private/
registry=https://registry.npmjs.org/
always-auth=true
```

建议包名：

- `@fj/ui`
- `@fj/platform-sdk`
- `@fj/request`
- `@fj/i18n`
- `@fj/eslint-config`
- `@fj/tsconfig`
- `@fj/vite-config`

不要把 `sqqr`、`dkjdcx`、`dxslgl` 等业务 feature 发布为 npm 包，除非它们被明确产品化给多个应用使用。

### 依赖治理

默认允许：

- React, React DOM, React Router。
- Ant Design。
- dayjs。
- 仅通过 `shared/api` 使用 axios。
- 能减少代码且维护稳定的小型聚焦工具。

需要评审：

- 状态管理库。
- Ant Design Form 之外的表单库。
- dayjs 之外的日期库。
- 大型可视化库。
- 富文本、PDF viewer、地图 SDK、上传 SDK。
- 替换现有技术栈能力的任何包。

不允许：

- `antd@3`。
- 新 class component 框架。
- 未确认运行目标时引入 IE11 polyfill stack。
- 直接 webpack/CRA runtime 依赖。
- `moment`，除非特定库强依赖且通过 adapter 隔离。

### 质量门禁

路由满足以下条件前不得标记为已迁移：

- TypeScript strict 通过。
- ESLint 通过。
- 生产构建通过。
- 路由可独立访问。
- 路由可在 qiankun 下 mount/unmount。
- 主流程行为与旧路由一致。
- API payload 已类型化。
- 无直接 `window.parent.postMessage`。
- `shared/qiankun` 外无直接 `window.SY_QIANKUN`。
- `shared/api` 外无直接 `axios` import。
- 无 `Form.create()` 等 `antd@3` 模式。
- 无新增 class component。
- `src/legacy` 新文件都有删除说明。
- 用户可见文案已进入 i18n 资源。
- 至少切换中文和英文资源做基础验证。

推荐门禁：

- 为抽取的纯逻辑添加单元测试。
- 为高风险交互添加组件测试。
- 重大 UI 页面提供截图或短录屏。
- 添加重依赖后检查 bundle size。

### 测试策略

| 代码类型 | 测试类型 |
|---|---|
| 纯映射和校验 | Vitest unit tests |
| Feature hooks | React Testing Library hook/component harness |
| Shared UI 行为 | React Testing Library |
| API adapters | Mocked request tests |
| qiankun runtime | mock window globals 的单元测试 |
| i18n resources | key 完整性和 fallback 测试 |
| 完整业务路由 | Smoke test 加人工旧路由对比 |

### 迁移工作流

1. 盘点旧路由、直接依赖、API 调用、全局变量、样式、子组件和硬编码文案。
2. 将代码分类为 page、component、hook、API、model、shared candidate、i18n resource 或 legacy adapter。
3. 在迁移 JSX 前建立类型化 API、model 和 i18n 边界。
4. 迁移可在 Vite 中运行的最小可见切片。
5. 迁移时将 Ant Design 3 API 替换为 Ant Design 6 API。
6. 第二个真实使用场景出现后再抽取重复 UI。
7. 为抽取逻辑和高风险交互添加测试。
8. 验证独立访问、qiankun 行为和中英文语言切换。
9. 更新 `docs/migration.md`，记录状态、缺口和验证说明。

### 必须阻断的反模式

- 整个旧页面复制到一个 `.tsx` 文件里，然后修到能编译。
- 创建混杂业务、UI、日期、请求和格式化逻辑的 `utils.ts`。
- 为页面局部状态创建全局 store。
- 把 feature-specific 组件提升到 `shared`。
- 添加依赖来逃避理解旧代码。
- 在组件树里传递后端原始响应。
- 让 shared 组件可配置到包含多个业务流程。
- 同一逻辑新旧两套长期并存但没有删除计划。
- 在 JSX 中继续硬编码中文文案。

### 初始路线图

Phase 0: 治理基线

- 添加本架构文档。
- 安装依赖并提交 lockfile。
- 添加路径边界 lint 或 import 检查。
- 添加 Vitest 和 React Testing Library。
- 添加 `shared/api`。
- 完善 qiankun helper API。
- 添加 `shared/i18n` 基础设施和中英文资源结构。

Phase 1: 第一条真实路由

- 先迁移 `/dkjdcx` 作为参考路由。
- 只在需要时建立第一批 `AppPage`、`AppForm`、`AppTable` 和 request 约定。
- 记录路由迁移 checklist 结果。

Phase 2: 用户确认流程

- 抽取文件预览、PDF 预览、上传和签章相关边界后迁移 `/sqqr`。
- feature-specific 确认逻辑保留在 `features/sqqr`。
- 只把中性的预览/上传组件提升到 `shared/components`。

Phase 3: 流程/表单平台

- 通过抽取 workflow model、form schema handling、upload handling 和 preview components 迁移 `dxslglComp`。
- 至少另一个应用需要同样平台前，不发布 workflow/form package。

Phase 4: 内部包

- app 内抽象稳定后再创建私有 npm 包。
- 先发布 config packages，再考虑 UI packages。
- 多个应用认可组件 API 和视觉标准后，再发布 `@fj/ui`。

### 决策记录

重大架构选择应记录在 `docs/decisions/`。

格式：

```md
# ADR-0001: Decision Title

## Status

Accepted

## Context

What problem forced this decision.

## Decision

What we chose.

## Consequences

Tradeoffs, follow-up work, and migration impact.
```

---

## English

### Purpose

This project is not only a React 16 to React/Vite migration. It is a controlled rebuild of the frontend architecture. The goal is to prevent migrated code from recreating legacy problems: duplicated pages, implicit globals, untyped request payloads, oversized components, inconsistent UI patterns, feature leakage across domains, and scattered hard-coded Chinese text.

Every migrated route must follow this document. Exceptions must be documented in `docs/migration.md`.

### Architecture Goals

- Keep business features independently understandable, testable, and replaceable.
- Make shared code explicit, typed, stable, and small.
- Avoid copying legacy abstractions before proving they are still needed.
- Prefer composition over large configurable components.
- Keep platform integration, data access, business workflow, and UI rendering separated.
- Make duplication visible early and block copy-paste during migration.
- Support future multilingual releases by default; business code must not scatter hard-coded user-facing text.

### Source Layout

```text
src/
  app/
    App.tsx
    Layout.tsx
    routes.tsx
    providers/
  features/
    dk/
      dkjdcx/
        api/
        components/
        hooks/
        model/
        pages/
        index.ts
    sqqr/
    tq/
    dxslgl/
  shared/
    api/
    assets/
    components/
    config/
    constants/
    hooks/
    i18n/
    lib/
    qiankun/
    types/
    ui/
  legacy/
```

### Directory Responsibilities

| Directory | Responsibility | Allowed Dependencies |
|---|---|---|
| `src/app` | App shell, route registration, providers, layout, app-wide error boundaries | `features`, `shared` |
| `src/features/<domain>` | Business routes and domain-specific logic | own domain code, `shared` |
| `src/shared/ui` | Project design-system components built on Ant Design | React, Ant Design, `shared/lib`, `shared/i18n` |
| `src/shared/components` | Business-agnostic composite components | `shared/ui`, `shared/hooks`, `shared/lib`, `shared/i18n` |
| `src/shared/api` | HTTP client, interceptors, typed request utilities | axios, `shared/types`, `shared/qiankun` |
| `src/shared/i18n` | Language resources, translation helpers, locale management, formatting entry points | `shared/lib` |
| `src/shared/qiankun` | Micro-frontend runtime, parent communication, injected context | no feature imports |
| `src/shared/lib` | Pure utilities without React and without business meaning | no feature imports |
| `src/shared/hooks` | Generic React hooks without business meaning | React, `shared/lib` |
| `src/shared/types` | Global technical types only | types only |
| `src/legacy` | Temporary compatibility shims with removal plans | restricted |

Feature code must not import from another feature directly. If two features need the same logic, extract it to `shared` only after confirming it is domain-neutral. If it is domain-specific but shared by multiple routes in the same domain, keep it under that domain.

### Feature Module Standard

Non-trivial business routes should use this structure:

```text
features/<domain>/<feature>/
  api/
    <feature>Api.ts
    <feature>Api.types.ts
  components/
    <FeaturePanel>.tsx
  hooks/
    use<Feature>.ts
  model/
    <feature>Model.ts
    <feature>Schema.ts
  pages/
    <FeaturePage>.tsx
  i18n/
    zh-CN.ts
    en-US.ts
  index.ts
```

Rules:

- `pages/` wires routing, query params, page title, and top-level layout only.
- `components/` renders UI and receives typed props. It must not call APIs directly.
- `hooks/` coordinates state, side effects, and workflows.
- `api/` owns backend calls and request/response types.
- `model/` owns domain types, normalization, mapping, constants, and validation.
- `i18n/` owns feature-level language resources. Reusable text should move to `shared/i18n` only when it is truly shared.
- `index.ts` exports the public surface of the feature. External modules should not deep-import private files.

### Component Layering

| Level | Location | Examples | Rules |
|---|---|---|---|
| Foundation UI | `shared/ui` | `AppButton`, `AppModal`, `AppForm`, `AppTable`, `AppUpload` | Thin Ant Design wrappers; no business logic |
| Shared Composite | `shared/components` | `FilePreview`, `PdfViewer`, `QueryToolbar`, `PageHeader` | Reusable across domains; no domain-specific wording or endpoints |
| Domain Component | `features/<domain>/**/components` | `LoanProgressCard`, `ApplicantInfoPanel` | Can contain business terminology; no cross-domain imports |
| Page Component | `features/<domain>/**/pages` | `DkjdcxPage` | Route-level orchestration only; keep thin |

A component is eligible for `shared` only when all conditions are true:

- It is used by at least two feature domains, or there is a documented near-term second consumer.
- It has no hard-coded business endpoint, route, organization code, workflow code, field meaning, or Chinese text.
- It exposes a typed, minimal prop API.
- It has a clear owner and examples.
- It has tests for non-trivial behavior.

### Component API Rules

- Prefer controlled props for form-like components: `value`, `onChange`, `disabled`, `status`.
- Prefer explicit callbacks: `onSubmit`, `onCancel`, `onPreview`, `onRemove`.
- Avoid catch-all props such as `config`, `data`, `options`, or `extra` unless the type is narrow and documented.
- Avoid boolean prop explosions. Use discriminated unions for variants.
- Do not expose Ant Design internal types from high-level business components unless the component is intentionally an Ant Design adapter.
- Do not pass raw backend response objects into UI components. Normalize them first in `model/` or `api/`.
- Display text exposed by a component should be an i18n key or already-localized text, not hard-coded Chinese.

### Component Size Rules

- A component over 200 lines needs a reason.
- A component over 300 lines must be split before migration is considered complete.
- A file containing unrelated rendering, API calls, data normalization, and event orchestration is not acceptable.
- Repeated JSX blocks across two migrated routes must be extracted before the second route is marked complete.

### Design System Strategy

Do not wrap every Ant Design component immediately. Wrap only components where the application needs consistent behavior.

### Platform Layer And Theme Boundaries

The target model is that business developers only change code under `features/<domain>/<feature>`. Theme setup, page shell, app providers, gateway context, request propagation, error boundaries, and shared UI components belong to the platform layer and must not be reimplemented in business pages.

The project currently keeps package-ready boundaries inside the app:

```text
src/app/providers/       App-level provider composition, such as i18n, theme, and future gateway/api providers
src/app/shell/           App page shell, such as PageShell, error boundaries, and permission fallback pages
src/shared/theme/        Design tokens, Ant Design theme adapter, CSS variables, and ThemeProvider
src/shared/ui/           Project-level shared UI public API
src/shared/gateway/      Future gateway context SDK, tracked by a separate Issue
src/shared/testing/      Future test helpers to reduce business test boilerplate
```

Feature code may use platform public APIs such as `@app/shell`, `@shared/ui`, `@shared/api`, and `@shared/i18n`. Feature code must not configure `ConfigProvider` directly, create axios instances, or read qiankun/gateway globals directly.

Theme is split into two concepts:

| Layer | Current Location | Future Package | Responsibility |
|---|---|---|---|
| Design tokens | `src/shared/theme/tokens.ts` | `@fj/tokens` | React-agnostic color, font, spacing, radius, shadow, and status tokens |
| Theme adapter | `src/shared/theme` | `@fj/theme` | Ant Design theme, CSS variables, ThemeProvider, and locale bridge |

`PageShell` is the single page-root framework entry. Business pages should pass title, description, and page-level actions to `PageShell`; the page body should only compose business components.

```tsx
export function BusinessPage() {
  return (
    <PageShell title={t('business.page.title')} description={t('business.page.description')}>
      <BusinessPanel />
    </PageShell>
  )
}
```

Admission rules for `src/shared/ui`:

- It is reused by at least two pages, or there is a clear near-term second consumer.
- It does not bind to business fields, endpoints, workflow codes, or organization codes.
- It does not hard-code business Chinese text.
- It is exported through the public `index.ts`; business code must not deep-import internals.
- Non-trivial behavior has tests.

First-wave `shared/ui` candidates:

| Component | Purpose |
|---|---|
| `AppPage` | Standard page padding, title, actions, loading, error, and empty states |
| `AppButton` | Permission, loading, and common button variants |
| `AppModal` | Unified width, footer behavior, destroy behavior, and async confirm handling |
| `AppForm` | Shared form layout, submit behavior, validation message normalization |
| `AppTable` | Standard pagination, empty text, density, loading, row key handling |
| `AppUpload` | Unified upload state, file limits, accepted types, error display |
| `AppDatePicker` | dayjs-only date handling and backend serialization |
| `AppResult` | Success, failure, pending, and submission result states |

Do not wrap yet:

- Simple typography and layout components unless repeated inconsistencies appear.
- Rarely used Ant Design components.
- Highly business-specific widgets.

### Data Access Standard

All HTTP requests must go through `src/shared/api`.

```text
shared/api/
  httpClient.ts
  request.ts
  errors.ts
  types.ts
```

Rules:

- Feature code must not import `axios` directly.
- Each API function must define request and response types.
- Backend response normalization belongs in `api/` or `model/`, not JSX.
- Request cancellation should be used for route-level async queries where stale responses are possible.
- Query params, qiankun injected params, and parent context must be read through shared adapters.
- Error handling must return typed application errors. UI should not parse raw backend error shapes.

### Gateway Context Standard

All page entry points and follow-up business requests must read, validate, and propagate gateway context through `src/shared/gateway`. Feature code must not read `window.SY_QIANKUN`, `window.IS_SY_QIANKUN`, or `window.__POWERED_BY_QIANKUN__` directly, and it must not manually compose gateway headers.

Current boundary:

```text
src/shared/gateway/
  types.ts             Gateway context, validation result, and headers types
  parse.ts             Context parsing from qiankun props, URL, and dev mock
  validate.ts          Frontend structural validation
  headers.ts           Request propagation headers
  GatewayProvider.tsx  App-level context provider
  useGateway.ts        Public hook for reading gateway state
  context.ts           Runtime storage used by the request layer
```

`src/shared/api/request.ts` automatically merges `createGatewayHeaders()`, so business API functions only describe business requests:

```ts
export function getLoanProgress(params: LoanProgressQuery) {
  return request<LoanProgressResponse>({
    url: '/loan/progress',
    method: 'GET',
    params
  })
}
```

Security boundary of the frontend SDK:

- It only centralizes parsing, basic structural validation, header generation, and development-mode mocks.
- It does not store server secrets, signing keys, or privilege-escalating secrets.
- It does not treat user, organization, tenant, or role fields from the frontend as trusted facts.
- Trusted authentication, token expiry, signature checks, replay protection, and data-scope filtering must happen in the gateway or backend.
- Production must not rely on dev mock context.

If legacy gateway fields need temporary compatibility, map them centrally in `src/shared/gateway/parse.ts` instead of scattering them across business pages.

### State Management Standard

Default to local React state and feature hooks. Add heavier state only when there is a proven need.

| Need | Default Choice |
|---|---|
| Local form state | Ant Design Form or local `useState` |
| Async route state | Feature hook with typed loading/error/data |
| Shared app context | React context under `app/providers` |
| Cross-route cache | Introduce a query/cache library only after at least two routes need it |
| Complex workflow state | `useReducer` with explicit events |
| Legacy MobX store | Replace during migration; do not copy decorators |

MobX 4 class/decorator stores must not be migrated as-is. If a legacy store contains useful business rules, extract pure functions and typed models first.

### Routing Standard

- Route registration lives in `src/app/routes.tsx`.
- Feature page components should be lazy-loaded once real route bundles grow.
- Paths must match the legacy route only where external systems depend on the URL.
- New internal route names should be domain-oriented and stable.
- A migrated route must document the legacy source path in `docs/migration.md`.

### Micro-Frontend Standard

All qiankun and parent-application integration must go through `src/shared/qiankun`.

Rules:

- Do not access `window.SY_QIANKUN` directly inside features.
- Do not call `window.parent.postMessage` directly inside features.
- Do not parse parent-injected URLs in page components.
- Expose typed helpers such as `getCurrentUser`, `getBusinessParam`, `emitWorkflowEvent`, and `closeCurrentTab`.
- Feature code should be testable without qiankun globals.

### Internationalization Standard

Multilingual capability is part of the target architecture, not a pre-release patch.

Recommended resource structure:

```text
shared/i18n/
  index.ts
  locales/
    zh-CN.ts
    en-US.ts
features/<domain>/<feature>/i18n/
  zh-CN.ts
  en-US.ts
```

Rules:

- New user-facing text must live in i18n resources.
- i18n keys should use stable semantic names, such as `dk.dkjdcx.actions.query`, not full Chinese sentences.
- Form validation, API error mapping, empty states, modal titles, confirmation text, and table column names are all in i18n scope.
- Dates, times, numbers, money, percentages, and file sizes must use shared formatters.
- Backend enum values should first map to stable semantic keys, then to localized text.
- Shared components must not hard-code Chinese business text.
- Text resources should support Chinese and English; adding a new language must not require business component changes.

### Legacy Compatibility Policy

`src/legacy` is a quarantine zone, not a second shared library.

Allowed:

- Short-lived adapters needed to keep one migrated route working.
- Typed wrappers around unavoidable legacy contracts.
- Code with a documented deletion condition.

Not allowed:

- New business components.
- Copied legacy stores without refactoring.
- Generic utility dumps.
- Any file without an owner and removal plan.

Every file in `src/legacy` must include:

- Source legacy path.
- Why it still exists.
- What must happen before deletion.

### NPM Package Strategy

The project should use npm packages deliberately. Internal reusable code should become packages only when reuse and ownership are clear.

The platform layer can eventually become private packages, but it must first stabilize inside this repository using package-like boundaries. Do not publish npm packages only because code is "shared"; package extraction must serve cross-app reuse and version governance.

Recommended evolution:

```text
Phase 1: Internal modules under src/shared and src/app
Phase 2: Move to pnpm workspace packages after 2-3 real route migrations
Phase 3: Publish to private npm / GitHub Packages when multiple apps reuse them
```

Recommended future package boundaries:

| Package | Dependency Direction | Responsibility |
|---|---|---|
| `@fj/tokens` | No React/Ant Design dependency | Design tokens |
| `@fj/theme` | Depends on `@fj/tokens` | ThemeProvider, Ant Design theme, CSS variables |
| `@fj/ui` | Depends on `@fj/theme`, `@fj/i18n` | Shared UI components |
| `@fj/app-shell` | Depends on theme/ui/gateway/i18n | AppShell, PageShell, error boundaries, permission fallbacks |
| `@fj/gateway-client` | No business feature dependency | Gateway context parsing, basic validation, request propagation data |
| `@fj/api-client` | Depends on gateway-client | Unified request, error model, headers injection |
| `@fj/testing` | Depends on providers and testing library | renderWithProviders, mock gateway, route smoke helpers |

Dependencies must stay one-way: `tokens -> theme -> ui -> app-shell -> app`. Theme must not depend on app-shell, ui must not depend on business features, and tokens must not depend on React.

| Category | Location | Publishing |
|---|---|---|
| App-only code | `src/features`, `src/shared` | Not published |
| Cross-app UI kit | future `packages/ui` or separate repo | Private npm registry |
| Cross-app SDK | future `packages/platform-sdk` | Private npm registry |
| Config presets | future `packages/eslint-config`, `packages/tsconfig` | Private npm registry |
| Legacy bridge | keep in app first | Publish only if another app needs it |

Create an internal package only when all conditions are true:

- At least two independent applications need it.
- The API can be versioned without requiring app-specific knowledge.
- There is an owner responsible for releases and changelog.
- It has tests, docs, and examples.
- It does not depend on app routes or feature-specific backend endpoints.

Recommended private registry setup:

```ini
@fj:registry=https://npm.example.internal/repository/npm-private/
registry=https://registry.npmjs.org/
always-auth=true
```

Recommended package names:

- `@fj/ui`
- `@fj/platform-sdk`
- `@fj/request`
- `@fj/i18n`
- `@fj/eslint-config`
- `@fj/tsconfig`
- `@fj/vite-config`

Do not publish feature modules such as `sqqr`, `dkjdcx`, or `dxslgl` as npm packages unless they are explicitly productized for multiple applications.

### Dependency Governance

Allowed by default:

- React, React DOM, React Router.
- Ant Design.
- dayjs.
- axios through `shared/api` only.
- Small focused utilities when they reduce code and have stable maintenance.

Requires review:

- State management libraries.
- Form libraries beyond Ant Design Form.
- Date libraries other than dayjs.
- Large visualization libraries.
- Rich text editors, PDF viewers, map SDKs, upload SDKs.
- Any package replacing a capability already present in the stack.

Not allowed:

- `antd@3`.
- New class component frameworks.
- IE11 polyfill stacks unless a confirmed runtime target requires them.
- Direct webpack/CRA runtime dependencies.
- `moment` unless a specific library requires it and an adapter isolates it.

### Quality Gates

A route is not considered migrated until all gates pass:

- TypeScript passes with `strict`.
- ESLint passes.
- Production build passes.
- Route works standalone.
- Route works under qiankun mount/unmount.
- Main workflows match the legacy behavior.
- API payloads are typed.
- No direct `window.parent.postMessage`.
- No direct `window.SY_QIANKUN` access outside `shared/qiankun`.
- No direct `axios` import outside `shared/api`.
- No copied `antd@3` patterns such as `Form.create()`.
- No new class components.
- No new files under `src/legacy` without deletion notes.
- User-facing text is extracted into i18n resources.
- Basic verification passes with both Chinese and English resources.

Recommended gates:

- Unit tests for extracted pure logic.
- Component tests for high-risk interactions.
- Screenshot or short recording for major UI pages.
- Bundle size review after adding heavy dependencies.

### Testing Strategy

| Code Type | Test Type |
|---|---|
| Pure mapping and validation | Vitest unit tests |
| Feature hooks | React Testing Library hook/component harness |
| Shared UI behavior | React Testing Library |
| API adapters | Mocked request tests |
| qiankun runtime | Unit tests with mocked window globals |
| i18n resources | Key completeness and fallback tests |
| Full business route | Smoke test plus manual legacy comparison |

### Migration Workflow

1. Inventory the legacy route, direct dependencies, API calls, global usage, styles, child components, and hard-coded text.
2. Classify code into page, component, hook, API, model, shared candidate, i18n resource, or legacy adapter.
3. Create typed API, model, and i18n boundaries before migrating JSX.
4. Migrate the smallest visible slice that can run in Vite.
5. Replace Ant Design 3 APIs with Ant Design 6 equivalents during migration.
6. Extract duplicated UI only after the second real use case appears.
7. Add tests for extracted logic and high-risk interactions.
8. Verify standalone access, qiankun behavior, and Chinese/English language switching.
9. Update `docs/migration.md` with status, gaps, and verification notes.

### Anti-Patterns To Block

- Copying an entire legacy page into one `.tsx` file and fixing errors until it compiles.
- Creating `utils.ts` files with mixed business, UI, date, request, and formatting logic.
- Creating global stores for page-local state.
- Promoting feature-specific components to `shared`.
- Adding dependencies to avoid understanding legacy code.
- Passing raw backend responses through the component tree.
- Making shared components configurable enough to contain multiple business workflows.
- Keeping both old and new versions of the same logic without a removal plan.
- Continuing to hard-code Chinese text in JSX.

### Initial Architecture Roadmap

Phase 0: Governance Baseline

- Add this architecture document.
- Install dependencies and commit a lockfile.
- Add path-boundary lint rules or import checks.
- Add Vitest and React Testing Library.
- Add `shared/api`.
- Complete qiankun helper APIs.
- Add `shared/i18n` infrastructure and Chinese/English resource structure.

Phase 1: First Real Route

- Migrate `/dkjdcx` first as the reference route.
- Establish the first `AppPage`, `AppForm`, `AppTable`, and request conventions only when needed.
- Document the route migration checklist result.

Phase 2: User Confirmation Flow

- Migrate `/sqqr` after extracting file preview, PDF preview, upload, and signing-related boundaries.
- Keep feature-specific confirmation logic inside `features/sqqr`.
- Promote only neutral preview/upload components to `shared/components`.

Phase 3: Workflow/Form Platform

- Migrate `dxslglComp` by extracting workflow model, form schema handling, upload handling, and preview components.
- Do not publish a workflow/form package until at least one more application needs the same platform.

Phase 4: Internal Packages

- Create private npm packages only after app-local abstractions stabilize.
- Start with config packages before UI packages.
- Publish `@fj/ui` only after multiple apps agree on component API and visual standards.

### Decision Records

Major architecture choices should be recorded as short decision records under `docs/decisions/`.

Use this format:

```md
# ADR-0001: Decision Title

## Status

Accepted

## Context

What problem forced this decision.

## Decision

What we chose.

## Consequences

Tradeoffs, follow-up work, and migration impact.
```
