# Roadmap / 路线图

## 中文

### v0.1.0 - 工程初始化与治理基线

- 初始化 GitHub 仓库和默认分支。
- 添加 Issue templates、PR template、Dependabot 和 CI。
- 建立中英双语文档规范。
- 建立前端架构治理文档、迁移计划和 i18n 标准。
- 确认 Vite / React / TypeScript 基础构建链路。

### v0.2.0 - 第一条真实迁移路由

- 以 `/dkjdcx` 作为参考路由完成真实业务迁移。
- 建立 `shared/api` 请求层和错误处理标准。
- 建立 `shared/i18n` 基础设施。
- 建立第一批必要的 `shared/ui` 组件。
- 完成 standalone 和 qiankun smoke test。

### v0.3.0 - 用户确认流程迁移

- 迁移 `/sqqr` 主流程。
- 抽取文件预览、PDF 预览、上传和签章相关边界。
- 补充高风险业务逻辑测试。
- 完成中英文语言资源验证。

### v0.4.0 - 对象实例流程迁移

- 迁移 `dxslglComp` 发起、审批、退回相关入口。
- 抽取 workflow model、form schema、upload、preview 等复用边界。
- 评估是否具备内部 npm 包沉淀条件。

---

## English

### v0.1.0 - Repository Initialization And Governance Baseline

- Initialize the GitHub repository and default branch.
- Add Issue templates, PR template, Dependabot, and CI.
- Establish bilingual documentation standards.
- Establish frontend architecture governance, migration planning, and i18n standards.
- Verify the Vite / React / TypeScript baseline build chain.

### v0.2.0 - First Real Migrated Route

- Migrate `/dkjdcx` as the reference business route.
- Establish `shared/api` request and error handling standards.
- Establish `shared/i18n` infrastructure.
- Create the first necessary `shared/ui` components.
- Complete standalone and qiankun smoke tests.

### v0.3.0 - User Confirmation Flow Migration

- Migrate the main `/sqqr` flow.
- Extract file preview, PDF preview, upload, and signing boundaries.
- Add tests for high-risk business logic.
- Verify Chinese and English language resources.

### v0.4.0 - Object Workflow Migration

- Migrate `dxslglComp` initiation, approval, and return entries.
- Extract reusable workflow model, form schema, upload, and preview boundaries.
- Evaluate whether internal npm packages are mature enough to publish.
