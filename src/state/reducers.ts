interface ResourceState<T> {
  data: T[];
  isLoading: boolean;
  error: any;
}

export function reducerFactory<T>(resource: string) {
  const initialState: ResourceState<T> = {
    data: [],
    isLoading: false,
    error: null,
  };
  return (state: ResourceState<T> = initialState, action: any) => {
    switch (action.type) {
      case `FETCH_${resource.toUpperCase()}_REQUEST`:
        return { ...state, isLoading: true };
      case `FETCH_${resource.toUpperCase()}_SUCCESS`:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          error: null,
        };
      case `FETCH_${resource.toUpperCase()}_FAILURE`:
        return { ...state, isLoading: false, error: action.payload };
      case `UPDATE_${resource.toUpperCase()}_REQUEST`:
        return { ...state, isLoading: true };
      case `UPDATE_${resource.toUpperCase()}_SUCCESS`:
        return {
          ...state,
          isLoading: false,
          data: state.data.map((item: any) =>
            item.id === action.payload.id ? action.payload : item,
          ),
          error: null,
        };
      case `UPDATE_${resource.toUpperCase()}_FAILURE`:
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };
}
