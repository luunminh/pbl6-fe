import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import {
  DeleteProductPayload,
  ExportFileParams,
  ImportPayload,
  ProductListParams,
  ProductPayload,
} from '@queries';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //
  const token = AuthService.getTokenFromStorage();
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const getProductList = (params: ProductListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`/admin/products?${queryString}`, {});
  };

  const getProductById = (params: { id: string }) => api.get(`/admin/products/${params.id}`, {});

  const addNewProduct = (body: ProductPayload) => {
    const { id: _id, ...payload } = body;
    return api.post('/admin/products', payload);
  };

  const updateProduct = (body: ProductPayload) => {
    const { id, ...payload } = body;
    return api.patch(`/admin/products/${id}`, payload);
  };

  const deleteProduct = (body: DeleteProductPayload) => {
    const { id } = body;
    return api.delete(`/admin/products/${id}`, {});
  };

  const getProductStoreExportFile = (exportParams: ExportFileParams) => {
    const { id, ...params } = exportParams;
    const queryString = stringify(params);
    return api.get(`/admin/products/stores/${id}?${queryString}`, {});
  };

  const importProduct = (body: ImportPayload) => {
    return api.post('/admin/import-order/', body);
  };

  return {
    getProductList,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct,
    getProductStoreExportFile,
    importProduct,
  };
};

export default {
  create,
};
