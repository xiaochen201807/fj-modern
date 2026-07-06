# Repository Guidelines / 仓库规范

## 中文

### 项目结构与模块组织

- `src/main.tsx` 是独立运行和 qiankun 子应用运行的统一入口。
- `src/app/` 放置根 React shell、路由定义、providers 和应用级样式。
- `src/features/` 是旧项目业务模块迁移的目标位置，按业务域分组，例如 `dk`、`tq`、`sqqr`、`dxslgl`。
- `src/shared/` 放置可复用工具、qiankun 适配器、类型、请求助手、通用 hooks、通用 UI 和兼容函数。
- `src/legacy/` 只允许放置临时兼容 shim。新代码不得放入该目录。
- `docs/migration.md` 记录迁移顺序、不兼容依赖和验证说明。
- `docs/frontend-architecture.md` 定义架构、组件封装、依赖治理、内部 npm 包策略、i18n 标准和路由迁移质量门禁。迁移业务代码前必须遵循。

### 开发命令

- `npm install` 安装现代化依赖。
- `npm run dev` 启动 Vite dev server，用于独立访问。
- `npm run build` 执行 TypeScript 检查并输出生产构建。
- `npm run preview` 本地预览构建结果。
- `npm run lint` 检查 TypeScript 和 React 源码。

### 代码风格与命名

- 新文件使用 TypeScript。React 组件优先使用 `.tsx`，工具函数使用 `.ts`。
- 使用函数组件和 hooks。不得新增 class component。
- 路由页面组件使用 PascalCase，例如 `src/features/dk/dkjdcx/pages/DkjdcxPage.tsx`。
- 工具文件使用 camelCase，例如 `src/shared/qiankun/runtime.ts`。
- 状态优先保留在 feature 内。只有多个路由真实共享时才提升到 shared 或 app provider。
- 用户可见文案不得硬编码在组件中，应使用 i18n 资源 key 或已本地化文本。

### 测试规范

- 单元测试放在实现旁边，命名为 `*.test.ts` 或 `*.test.tsx`。
- 组件行为测试优先使用 React Testing Library，测试执行使用 Vitest。
- 删除旧实现前，应优先覆盖已迁移的兼容代码和高风险业务规则。
- i18n 相关组件至少验证一种非中文语言资源不会破坏布局和逻辑。

### 迁移规则

- 每次只迁移一个路由或一个功能切片。
- 迁移路由前，按 `docs/frontend-architecture.md` 将代码分类为 page、component、hook、API、model、shared candidate 或 legacy adapter。
- 使用 `src/shared/qiankun/runtime.ts` helper 替换旧全局变量和 `window.parent.postMessage`。
- 迁移时将 `antd@3` API 替换为 `antd@6` API；不得向本项目添加 `antd@3`。
- 不复制旧 webpack、CRA、UMD externals 或 IE11 polyfills。
- 组件不得提升到 `src/shared`，除非满足 `docs/frontend-architecture.md` 中的 shared component 标准。
- 业务文案迁移时必须同步抽取到 i18n 资源，不允许继续散落中文字符串。

### Commit 与 Pull Request

- 使用简洁、有 scope 的 commit message，例如 `feat(qiankun): add sub-app lifecycle` 或 `migrate(dk): port loan progress route`。
- PR 应说明迁移路由、行为变化、验证命令、i18n 影响和 UI 截图。

---

## English

### Project Structure And Module Organization

- `src/main.tsx` is the unified entry for standalone mode and qiankun sub-application mode.
- `src/app/` contains the root React shell, route definitions, providers, and app-level styles.
- `src/features/` is the target location for migrated business modules from the legacy project, grouped by domain such as `dk`, `tq`, `sqqr`, and `dxslgl`.
- `src/shared/` contains reusable utilities, qiankun adapters, types, request helpers, generic hooks, shared UI, and compatibility functions.
- `src/legacy/` is reserved for temporary compatibility shims only. Do not move new code there.
- `docs/migration.md` tracks migration order, incompatible dependencies, and verification notes.
- `docs/frontend-architecture.md` defines the required architecture, component encapsulation standards, dependency governance, internal npm package strategy, i18n standards, and route migration quality gates. Follow it before migrating business code.

### Development Commands

- `npm install` installs modern dependencies.
- `npm run dev` starts the Vite dev server for standalone access.
- `npm run build` runs TypeScript checking and produces the production bundle.
- `npm run preview` serves the built output locally.
- `npm run lint` checks TypeScript and React source files with ESLint.

### Coding Style And Naming Conventions

- Use TypeScript for new files. Prefer `.tsx` for React components and `.ts` for utilities.
- Use function components and hooks. Do not introduce new class components.
- Keep route page modules in PascalCase component files, for example `src/features/dk/dkjdcx/pages/DkjdcxPage.tsx`.
- Keep utilities in camelCase files, for example `src/shared/qiankun/runtime.ts`.
- Keep state close to the feature. Promote shared state only when multiple routes need the same data.
- User-facing text must not be hard-coded in components. Use i18n resource keys or already-localized display text.

### Testing Guidelines

- Add unit tests beside the implementation as `*.test.ts` or `*.test.tsx`.
- Prefer React Testing Library for component behavior and Vitest for test execution.
- Cover migrated compatibility code and high-risk business rules before deleting old implementations.
- i18n-aware components should verify that at least one non-Chinese language resource does not break layout or behavior.

### Migration Rules

- Migrate one route or one feature slice at a time from the legacy React 16 project.
- Before migrating a route, classify code according to `docs/frontend-architecture.md`: page, component, hook, API, model, shared candidate, or legacy adapter.
- Replace legacy globals and `window.parent.postMessage` with `src/shared/qiankun/runtime.ts` helpers.
- Replace `antd@3` APIs with `antd@6` equivalents during migration; do not add `antd@3` to this project.
- Avoid copying old webpack, CRA, UMD externals, or IE11 polyfills into this project.
- Do not promote a component to `src/shared` unless it satisfies the shared-component criteria in `docs/frontend-architecture.md`.
- When migrating business text, extract it into i18n resources instead of leaving scattered Chinese strings.

### Commit And Pull Request Guidelines

- Use concise, scoped commit messages such as `feat(qiankun): add sub-app lifecycle` or `migrate(dk): port loan progress route`.
- Pull requests should describe migrated routes, behavior changes, verification commands, i18n impact, and screenshots for UI changes.
