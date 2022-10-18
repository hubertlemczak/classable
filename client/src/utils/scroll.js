import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function scrollToById(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: 'smooth' });
}
