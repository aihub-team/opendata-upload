const _sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const sleep = async (ms) => {
  await _sleep(ms);
};

export { sleep };
