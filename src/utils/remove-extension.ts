export const removeExtension = (path: string, extension: string) => {
  const escapedExtension = extension.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\.${escapedExtension}$`, 'i');

  return path.replace(pattern, '');
};
