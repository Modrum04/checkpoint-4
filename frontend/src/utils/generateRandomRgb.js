export function generateRandomRGBA(data, opacity) {
  const colors = [];
  for (let i = 0; i < data.length; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    colors.push(rgba);
  }

  return colors;
}
