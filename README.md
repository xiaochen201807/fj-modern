# fj-modern

## 中文

`fj-modern` 是旧项目 `dm-pc-new` 的现代化迁移目标，用于将 React 16 / CRA4 / webpack 应用迁移到稳定的 React / Vite 技术栈。

这个项目的目标不只是升级构建工具和 React 版本，还要重建前端工程治理能力，支撑后续多国语言版本、微前端集成、组件复用、私有 npm 包沉淀和长期可维护演进。

### 技术栈

- React 19.2.7
- Vite 8.1.3
- TypeScript 5
- React Router 8.1.0
- Ant Design 6.5.0
- qiankun 兼容生命周期导出

### 命令

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

### 迁移方式

本项目不会完整复制旧仓库。它提供一个干净的现代化应用壳、qiankun 兼容适配层和架构治理标准，业务模块按路由逐步迁移。

迁移真实业务代码前，必须遵循 [`docs/frontend-architecture.md`](docs/frontend-architecture.md) 中的架构与治理规划。迁移目标不是简单跑通新版 React/Vite，而是建立清晰的 feature、shared component、API、state、qiankun、i18n 和内部 npm 包边界。

优先迁移旧项目中的高价值入口：

- `/sqqr`
- `/dkjdcx`
- `/dxslglComp/dxslglfq/index`
- `/dxslglComp/dxslglsp/index`
- `/dxslglComp/dxslglth/index`

迁移进度记录在 [`docs/migration.md`](docs/migration.md)。

### 文档入口

- GitHub Pages: [https://xiaochen201807.github.io/fj-modern/](https://xiaochen201807.github.io/fj-modern/)
- Wiki: [https://github.com/xiaochen201807/fj-modern/wiki](https://github.com/xiaochen201807/fj-modern/wiki)
- Roadmap Project: [fj-modern Roadmap](https://github.com/users/xiaochen201807/projects/3)

### 国际化目标

未来版本需要支撑多国语言，因此新增业务页面不得硬编码用户可见文案。页面标题、按钮、表单校验、提示信息、错误信息、表格列名和状态文本都应通过统一 i18n 资源管理。

---

## English

`fj-modern` is the modernization target for the legacy `dm-pc-new` application. It migrates the React 16 / CRA4 / webpack application to a stable React / Vite stack.

The goal is not only to upgrade build tooling and React. The project also rebuilds frontend engineering governance so the application can support future multilingual releases, micro-frontend integration, component reuse, private npm packages, and long-term maintainability.

### Stack

- React 19.2.7
- Vite 8.1.3
- TypeScript 5
- React Router 8.1.0
- Ant Design 6.5.0
- qiankun-compatible lifecycle exports

### Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

### Migration Approach

This project is intentionally not a full copy of the legacy repository. It provides a clean modern app shell, qiankun compatibility adapters, and architecture governance standards so business modules can be migrated route by route.

Before migrating real business code, follow the architecture and governance plan in [`docs/frontend-architecture.md`](docs/frontend-architecture.md). The migration target is not just newer React/Vite tooling; it is a maintainable feature architecture with explicit boundaries for features, shared components, APIs, state, qiankun, i18n, and internal npm packages.

Start with high-value entry routes from the old project:

- `/sqqr`
- `/dkjdcx`
- `/dxslglComp/dxslglfq/index`
- `/dxslglComp/dxslglsp/index`
- `/dxslglComp/dxslglth/index`

Track progress in [`docs/migration.md`](docs/migration.md).

### Documentation Entry Points

- GitHub Pages: [https://xiaochen201807.github.io/fj-modern/](https://xiaochen201807.github.io/fj-modern/)
- Wiki: [https://github.com/xiaochen201807/fj-modern/wiki](https://github.com/xiaochen201807/fj-modern/wiki)
- Roadmap Project: [fj-modern Roadmap](https://github.com/users/xiaochen201807/projects/3)

### Internationalization Goal

Future releases must support multiple languages. New business pages must not hard-code user-facing text. Page titles, buttons, form validation messages, notifications, errors, table column names, and status labels should be managed through a unified i18n resource system.
