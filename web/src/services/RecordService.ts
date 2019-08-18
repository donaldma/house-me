import { API, resetAxiosInstance } from './constants'
import { IUserLogInResponse, User } from '../models/User'
import { formatRequestPrice } from '../utils/Helpers'

export interface IRecordEntity {
  id: number
  item: string
  owner: string
  price: number
  isDeleted: boolean
  createDate: Date
}

export interface IRecordCreateRequest {
  item: string
  owner: string
  price: string
}

export interface IRecordUpdateRequest {
  item: string
  owner: string
  price: string
}

export const RecordService = {
  async getAll(): Promise<IRecordEntity[]> {
    const { data } = await API.get('/records')
    return data
  },

  async create(request: IRecordCreateRequest): Promise<IRecordEntity[]> {
    const { data } = await API.post('/records', { ...request, price: formatRequestPrice(request.price) })
    return data
  },

  async update(request: IRecordUpdateRequest, recordId: string): Promise<IRecordEntity[]> {
    const { data } = await API.patch(`/records/${recordId}`, {
      ...request,
      price: formatRequestPrice(request.price)
    })
    return data
  },

  async delete(recordId: string): Promise<IRecordEntity[]> {
    const { data } = await API.patch(`/records/${recordId}`, { isDeleted: true })
    return data
  }
}
