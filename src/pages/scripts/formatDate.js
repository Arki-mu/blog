function formatDate(timeStr) {
  function addZ(num) {
    return num < 10 ? "0" + num : num;
  }
  let time = new Date(Number(timeStr));
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let min = time.getMinutes();
  let s = time.getSeconds();
  // return y + '-' + addZ(m) + '-' + addZ(d) + ' ' + addZ(h) + ':' + addZ(m) + ':' + addZ(s);
  return (
    y +
    "-" +
    addZ(m) +
    "-" +
    addZ(d) +
    " " +
    addZ(h) +
    ":" +
    addZ(min) +
    ":" +
    addZ(s)
  );
}

export { formatDate };
