import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Essence` : 'Essence, fragrance and skincare';
  }, [title]);
}
