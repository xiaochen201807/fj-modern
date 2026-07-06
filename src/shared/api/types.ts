import type { AxiosRequestConfig } from 'axios'

export type RequestConfig<TData = unknown> = Omit<AxiosRequestConfig<TData>, 'baseURL'>

export interface ApiEnvelope<TData> {
  data: TData
  message?: string
  success?: boolean
}
