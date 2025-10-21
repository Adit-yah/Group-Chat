
export function setData({key , data}) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

export function clearLocalStorage(){
    localStorage.clear()
}