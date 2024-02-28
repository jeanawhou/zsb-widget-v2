export const isHexColor = (hexString) => {
  if (!hexString || typeof hexString !== 'string') {
    return false;
  }
  const hex = getHexString(hexString);
  return /^#(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3})$/.test(hex);
};

export const convertRGBA = (hex) => {
  const result = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return r + ',' + g + ',' + b;
  }
};

export const getHexString = (hex) => {
  return !hex.startsWith('#') ? `#${hex}` : hex;
};
