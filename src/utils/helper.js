const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const checkObjectWindow = (object, retry = 4) => new Promise(async (resolve) => {
  const objectDefined = typeof window[object] !== 'undefined'
  if (retry <= 0) {
    return resolve('', 0)
  }
  if (objectDefined) {
    return resolve(objectDefined, 0)
  }
  await sleep(500)
  retry--
  return checkObjectWindow(object, retry).then(resolve)
})

export const isEmpty = (value) => (
  value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0)
);

export const objectHasKeys = (keys = [], object = {}) => {
  if (isEmpty(object) || Array.isArray(object) || Object.keys(object).length !== keys.length) {
    return false;
  }

  return Object.keys(object).every(i => keys.includes(i))
};

export const checkObjectValuesType = (object, type = 'string') => {
  if (isEmpty(object) || Array.isArray(object)) {
    return false;
  }

  return Object.values(object).every(i => typeof i === type)
}
