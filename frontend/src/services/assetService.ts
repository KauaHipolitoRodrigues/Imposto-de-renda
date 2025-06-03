import api from './api';

export interface Asset {
  id: string;
  name: string;
  type: 'property' | 'vehicle' | 'investment' | 'other';
  value: number;
  description?: string;
  acquisitionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetData {
  name: string;
  type: Asset['type'];
  value: number;
  description?: string;
  acquisitionDate: string;
}

export const assetService = {
  createAsset: async (data: CreateAssetData) => {
    const response = await api.post<Asset>('/assets', data);
    return response.data;
  },

  getAssets: async () => {
    const response = await api.get<Asset[]>('/assets');
    return response.data;
  },

  getAssetById: async (id: string) => {
    const response = await api.get<Asset>(`/assets/${id}`);
    return response.data;
  },

  updateAsset: async (id: string, data: CreateAssetData) => {
    const response = await api.put<Asset>(`/assets/${id}`, data);
    return response.data;
  },

  deleteAsset: async (id: string) => {
    await api.delete(`/assets/${id}`);
  },
};