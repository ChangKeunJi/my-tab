export const showTime = () => {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  time.innerHTML = `<div>${hour}</div><div id="middle">:</div><div>${addZero(
    min
  )}</div> `;

  setTimeout(showTime, 1000);
};

// Add Zeros / ex) 8 => 08

const addZero = n => {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
};
