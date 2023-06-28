export function actionCreatorFactory(resource: string) {
  const RESOURCE = resource.toUpperCase();
  return {
    fetchRequest: () => ({ type: `FETCH_${RESOURCE}_REQUEST` }),
    fetchSuccess: (data: any) => ({
      type: `FETCH_${RESOURCE}_SUCCESS`,
      payload: data,
    }),
    fetchFailure: (error: any) => ({
      type: `FETCH_${RESOURCE}_FAILURE`,
      payload: error,
    }),
    updateRequest: (data: any) => ({
      type: `UPDATE_${RESOURCE}_REQUEST`,
      payload: data,
    }),
    updateSuccess: (data: any) => ({
      type: `UPDATE_${RESOURCE}_SUCCESS`,
      payload: data,
    }),
    updateFailure: (error: any) => ({
      type: `UPDATE_${RESOURCE}_FAILURE`,
      payload: error,
    }),
  };
}
