function wrapPromise(promise) {
  let status = 'pending';
  let result;
  const suspender = (params) =>
    promise(params).then(
      (r) => {
        status = 'success';
        result = r;
      },
      (e) => {
        status = 'error';
        result = e;
      }
    );
  return {
    read(params) {
      if (status === 'pending') {
        throw suspender(params);
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

export const fetchData = (api) => {
  const promise = api;
  return () => wrapPromise(promise);
};
