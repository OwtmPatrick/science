export const generateID = () =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

export const generateToken = length => {
  const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  const b = [];  
  for (var i=0; i<length; i++) {
    let j = (Math.random() * (a.length-1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}