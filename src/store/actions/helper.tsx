export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const setCurrentTab = (currentTab: unknown) => ({
  type: SET_CURRENT_TAB,
  currentTab,
});

export const requestCreate = (type: string) => (id: unknown, url: unknown, params: unknown, cacheResponse: unknown, responseModifier: unknown) => ({
  type,
  id,
  url,
  params,
  cacheResponse,
  responseModifier,
});

export const setCreateData = (type: string) => (id: unknown, data: unknown) => ({
  type,
  id,
  data,
});

export const setCreateError = (type: string) => (id: unknown, error: unknown) => ({
  type,
  id,
  error,
});

export const setCreateLoading = (type: string) => (id: unknown, loading: unknown) => ({
  type,
  id,
  loading,
});

export const requestDelete = (type: string) => (id: unknown, url: unknown, params: unknown) => ({
  type,
  id,
  url,
  params,
});

export const setDeleteData = setCreateData;

export const setDeleteError = setCreateError;

export const setDeleteLoading = setCreateLoading;

export const requestUpdate = requestCreate;

export const setUpdateData = setCreateData;

export const setUpdateError = setCreateError;

export const setUpdateLoading = setCreateLoading;

export const clearData = (type: string) => (id: unknown) => ({
  type,
  id,
});

export const clearReadData = clearData;
