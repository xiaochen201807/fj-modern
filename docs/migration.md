# Migration Plan / 迁移计划

## 中文

### 当前目标

在旧仓库旁边创建一个干净的 React 19 / Vite 8 项目，并按业务路由逐步迁移模块。新项目从一开始就必须同时支持独立访问和 qiankun 子应用挂载。

本次迁移同时包含工程治理升级。所有新增页面、组件和文档都应按中英文双语和未来多国语言能力设计，避免继续硬编码中文文案。

### npm 上确认的版本

- React: 19.2.7
- Vite: 8.1.3
- React Router: 8.1.0
- Ant Design: 6.5.0

### 迁移顺序

1. 建立应用壳和 qiankun 生命周期兼容能力。
2. 迁移 `/dkjdcx`，因为它相对独立，适合作为第一条参考路由。
3. 迁移 `/sqqr`，这是关键用户确认流程，但依赖更多，应在基础架构稳定后处理。
4. 抽取共享流程工具后迁移 `dxslgl` 路由。
5. 每个功能验证完成后移除临时兼容层。

### 兼容边界

- 不复制 CRA4 webpack 配置。
- 不依赖 `public/index.html` 中的 React UMD 全局变量。
- 除非确认运行目标需要，否则不添加 IE11 polyfill。
- 不添加 `antd@3`；迁移时同步升级到 `antd@6` API。
- 除非迁移包强依赖 `moment`，否则使用 `dayjs`。
- 将 MobX 4 class/decorator 状态替换为 feature-local hooks 或小型显式 store。
- 不在业务代码中硬编码用户可见文案；需要为 i18n 资源预留结构。

### qiankun 契约

入口导出 `bootstrap`、`mount` 和 `unmount`。qiankun 模式下，应用根据注入的 `baseInfo.url` 使用 memory routing；独立模式下使用 browser routing。共享通信必须通过 `src/shared/qiankun/runtime.ts`。

### 国际化契约

- 用户可见文案必须从 i18n 资源读取。
- 业务状态值和后端枚举应先映射为稳定语义 key，再映射为语言文案。
- 日期、时间、数字、金额、百分比和文件大小必须通过统一格式化工具处理。
- 组件 props 不应只接受中文 label；应接受语义 key 或调用方已经国际化后的展示文本。
- 新增文档默认提供中文和英文版本。

### 验证清单

- `npm run lint`
- `npm run build`
- Vite dev server 下独立访问路由。
- 从主应用执行 qiankun mount/unmount smoke test。
- 对比已迁移页面与旧路由的主流程行为。
- 切换至少两种语言资源，确认页面没有硬编码文案。

---

## English

### Current Target

Create a clean React 19 / Vite 8 project beside the legacy repository and migrate business modules route by route. The new project must support both standalone access and qiankun sub-application mounting from the beginning.

This migration also upgrades engineering governance. All new pages, components, and documents should be designed for bilingual documentation and future multilingual product support, avoiding hard-coded Chinese text.

### Versions Confirmed On npm

- React: 19.2.7
- Vite: 8.1.3
- React Router: 8.1.0
- Ant Design: 6.5.0

### Migration Order

1. Build the app shell and qiankun lifecycle compatibility.
2. Migrate `/dkjdcx` first because it is relatively isolated and suitable as the reference route.
3. Migrate `/sqqr`; it is a key user confirmation flow but has more dependencies, so it should follow the architecture baseline.
4. Migrate `dxslgl` routes after extracting shared workflow utilities.
5. Remove temporary compatibility shims after each migrated feature is verified.

### Compatibility Boundaries

- Do not copy CRA4 webpack config into this project.
- Do not depend on React UMD globals from `public/index.html`.
- Do not add IE11 polyfills unless a confirmed runtime target requires them.
- Do not add `antd@3`; upgrade component usage to `antd@6` during migration.
- Replace `moment` with `dayjs` unless a migrated package strictly requires `moment`.
- Replace MobX 4 class/decorator state with feature-local hooks or a small explicit store.
- Do not hard-code user-facing text in business code; reserve structure for i18n resources.

### qiankun Contract

The entry exports `bootstrap`, `mount`, and `unmount`. In qiankun mode the app uses memory routing from the injected `baseInfo.url`; in standalone mode it uses browser routing. Shared communication must go through `src/shared/qiankun/runtime.ts`.

### Internationalization Contract

- User-facing text must be read from i18n resources.
- Business status values and backend enums should first be mapped to stable semantic keys, then mapped to localized text.
- Dates, times, numbers, money, percentages, and file sizes must be formatted through shared formatting utilities.
- Component props should not only accept Chinese labels; they should accept semantic keys or already-localized display text.
- New documentation should provide both Chinese and English versions by default.

### Verification Checklist

- `npm run lint`
- `npm run build`
- Standalone route access through Vite dev server.
- qiankun mount/unmount smoke test from the main app.
- Compare migrated page behavior with the legacy route before marking complete.
- Switch at least two language resources and confirm that the page has no hard-coded text.
