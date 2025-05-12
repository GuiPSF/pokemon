
const icons = import.meta.glob('/src/assets/icons/*.png', { eager: true });

export function getIconByName(name) {
  for (const path in icons) {
    if (path.includes(name)) {
      return icons[path].default;
    }
  }
  return null;
}
