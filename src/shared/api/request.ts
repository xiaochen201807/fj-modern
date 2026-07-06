import { httpClient } from './httpClient'
import { toApiError } from './errors'
import type { RequestConfig } from './types'
import { createGatewayHeaders } from '@shared/gateway'

export async function request<TResponse, TData = unknown>(config: RequestConfig<TData>) {
  try {
    const response = await httpClient.request<TResponse>({
      ...config,
      headers: {
        ...createGatewayHeaders(),
        ...config.headers
      }
    })
    return response.data
  } catch (error) {
    throw toApiError(error)
  }
}
