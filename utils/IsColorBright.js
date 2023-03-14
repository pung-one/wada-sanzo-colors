export function IsColorBright(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const brightness = Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
  if (brightness > 130) {
    return true;
  } else {
    return false;
  }
}
