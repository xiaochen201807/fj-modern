export type BridgeHandler = (method: string, payload?: unknown) => unknown

export interface QiankunBaseInfo {
  isSubapp: boolean
  moduleKey?: string
  instanceId?: string
  fromId?: string
  url?: string
  tabKey?: string
  userInfo?: unknown
}

export interface QiankunMountProps {
  container?: Element | DocumentFragment
  baseInfo?: Partial<QiankunBaseInfo>
  bridgeHandler?: BridgeHandler
  BRIDGE_METHODS_NAMES?: Record<string, string>
  eventBus?: {
    emit?: (eventName: string, payload?: unknown) => void
    on?: (eventName: string, handler: (...args: unknown[]) => void) => void
    off?: (eventName: string, handler: (...args: unknown[]) => void) => void
  }
  loadSubApp?: (...args: unknown[]) => unknown
  unloadSubApp?: (...args: unknown[]) => unknown
  customParams?: Record<string, unknown>
  [key: string]: unknown
}

export interface NormalizedQiankunProps extends QiankunMountProps {
  baseInfo: QiankunBaseInfo
}

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string
    IS_SY_QIANKUN?: boolean
    SY_QIANKUN?: NormalizedQiankunProps & { props?: QiankunMountProps; PROPS?: QiankunMountProps }
  }
}

function hasSubAppQuery() {
  return new URLSearchParams(window.location.search).get('isSubApp') === 'true'
}

export function isQiankunRuntime() {
  return Boolean(window.__POWERED_BY_QIANKUN__ || window.IS_SY_QIANKUN || hasSubAppQuery())
}

export function normalizeQiankunProps(props: QiankunMountProps = {}): NormalizedQiankunProps {
  const previous = window.SY_QIANKUN
  const baseInfo: QiankunBaseInfo = {
    isSubapp: isQiankunRuntime(),
    moduleKey: props.baseInfo?.moduleKey ?? previous?.baseInfo.moduleKey,
    instanceId: props.baseInfo?.instanceId ?? previous?.baseInfo.instanceId,
    fromId: props.baseInfo?.fromId ?? previous?.baseInfo.fromId,
    url: props.baseInfo?.url ?? previous?.baseInfo.url ?? window.location.href,
    tabKey: props.baseInfo?.tabKey ?? previous?.baseInfo.tabKey,
    userInfo: props.baseInfo?.userInfo ?? previous?.baseInfo.userInfo
  }

  const normalized: NormalizedQiankunProps = {
    ...previous,
    ...props,
    baseInfo,
    bridgeHandler: props.bridgeHandler ?? previous?.bridgeHandler,
    BRIDGE_METHODS_NAMES: props.BRIDGE_METHODS_NAMES ?? previous?.BRIDGE_METHODS_NAMES ?? {},
    eventBus: props.eventBus ?? previous?.eventBus,
    loadSubApp: props.loadSubApp ?? previous?.loadSubApp,
    unloadSubApp: props.unloadSubApp ?? previous?.unloadSubApp,
    customParams: props.customParams ?? previous?.customParams ?? {}
  }

  window.IS_SY_QIANKUN = normalized.baseInfo.isSubapp
  window.SY_QIANKUN = {
    ...normalized,
    props,
    PROPS: props
  }

  return normalized
}

export function getQiankunUrl(props = window.SY_QIANKUN) {
  return props?.baseInfo?.url || window.location.href
}

export function getInitialPath(props = window.SY_QIANKUN) {
  const url = getQiankunUrl(props)

  try {
    const parsed = new URL(url, window.location.origin)
    const hashPath = parsed.hash.replace(/^#/, '')
    return hashPath || `${parsed.pathname}${parsed.search}` || '/'
  } catch {
    return window.location.pathname || '/'
  }
}

export function getUrlParam(name: string) {
  const url = getQiankunUrl()

  try {
    const parsed = new URL(url, window.location.origin)
    const hashQuery = parsed.hash.includes('?') ? parsed.hash.split('?')[1] : ''
    return new URLSearchParams(hashQuery || parsed.search).get(name)
  } catch {
    return new URLSearchParams(window.location.search).get(name)
  }
}

export function emitToParent(type: string, payload?: unknown) {
  const qiankun = window.SY_QIANKUN
  const bridgeName = qiankun?.BRIDGE_METHODS_NAMES?.[type] ?? type

  qiankun?.eventBus?.emit?.(type, payload)
  if (qiankun?.bridgeHandler) {
    return qiankun.bridgeHandler(bridgeName, payload)
  }

  window.parent?.postMessage?.({ type, payload }, '*')
  return undefined
}
