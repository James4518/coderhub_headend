import { useLocation, useMatch } from 'react-router-dom';

const useExtractedPath = (basePath: string, partsToExtract: number = 2) => {
  const location = useLocation();
  const match = useMatch(`${basePath}/*`);
  const currentPath = location.pathname;
  if (match) {
    const relativePath = currentPath.replace(match.pathnameBase + '/', '');
    return relativePath.split('/').slice(0, partsToExtract).join('/');
  }
  return '';
};

export default useExtractedPath;
