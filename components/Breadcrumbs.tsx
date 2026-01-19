
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { navConfig, NavItem } from '../nav.config';
import { motion } from 'framer-motion';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Don't show breadcrumbs on the home page
  if (path === '/') return null;

  const breadcrumbs = useMemo(() => {
    const findPath = (items: NavItem[], target: string, parents: { label: string; path: string }[] = []): { label: string; path: string }[] | null => {
      for (const item of items) {
        const currentPath = [...parents, { label: item.label, path: item.path }];
        if (item.path === target) return currentPath;
        if (item.children) {
          const found = findPath(item.children, target, currentPath);
          if (found) return found;
        }
      }
      return null;
    };

    const result = findPath(navConfig, path);
    // Always start with Home if not already there
    if (result && result[0].path !== '/') {
        return [{ label: 'Command', path: '/' }, ...result];
    }
    return result;
  }, [path]);

  if (!breadcrumbs) return null;

  return (
    <nav aria-label="Breadcrumb" className="section-container pt-8 lg:pt-12 pb-4">
      <motion.ol 
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center flex-wrap gap-y-2"
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight size={12} className="mx-3 text-slate-200 flex-shrink-0" />
              )}
              
              {isLast ? (
                <span className="text-ui-caps text-[#0a0f1a] font-black pointer-events-none">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path}
                  className="text-ui-caps text-slate-400 hover:text-[#0a0f1a] transition-colors duration-500 flex items-center"
                >
                  {index === 0 && <Home size={12} className="mr-2 mb-0.5" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default Breadcrumbs;
