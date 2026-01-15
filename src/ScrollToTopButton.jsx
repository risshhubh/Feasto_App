// src/components/ScrollToTopButton.jsx
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-[#FF6B35] hover:bg-[#FF8C42] text-white rounded-full shadow-lg z-50 transition duration-300"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  ) : null;

  
};

export default ScrollToTopButton;
