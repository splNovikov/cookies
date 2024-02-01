export function fakeApi<TResponse, K>(response: TResponse, params?: K): Promise<TResponse> {
  return new Promise((res) => {
    if (params) {
      // eslint-disable-next-line no-console
      console.log('Running fake API with params: ', params);
    }
    setTimeout(() => res(response), 450);
  });
}
