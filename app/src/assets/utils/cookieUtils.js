export const getCookie = (cookieName) => {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

export const resetCookie = () => {
  document.cookie = "localizaCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

// useEffect(() => {
//   const cookie = document.cookie;
//   if(cookie){
//     navigate("/");
//   }
// }, []);