function setInfo(info: object, key: string) {
  localStorage.setItem(key, JSON.stringify(info));
}
function getInfo(key: string) {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
}

function removeInfo(key: string) {
  localStorage.removeItem(key);
}

const authLocal = {
  setInfo,
  getInfo,
  removeInfo,
};

export default authLocal;
