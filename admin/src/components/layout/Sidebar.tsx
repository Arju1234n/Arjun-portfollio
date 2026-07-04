'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, User, LogOut,
  ChevronRight, X, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const navSections = [
  {
    label: 'Project Management',
    items: [
      { href: '/',             label: 'Dashboard',      icon: LayoutDashboard },
      { href: '/projects',     label: 'Projects',       icon: FolderKanban    },
    ],
  },
];

interface SidebarProps { onClose?: () => void; }

export function Sidebar({ onClose }: SidebarProps) {
  const pathname  = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 60 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-1)', borderRight: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}>
                A
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-none" style={{ color: 'var(--text-1)' }}>ArjunOS</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-3)' }}>Admin Panel</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded-md hover:bg-[var(--bg-3)] transition-colors flex-shrink-0 ml-auto"
          style={{ color: 'var(--text-3)' }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--text-3)' }}
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    title={sidebarCollapsed ? label : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-all group relative',
                      active
                        ? 'text-[var(--accent-2)]'
                        : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                    )}
                    style={active ? { background: 'var(--accent-bg)', border: `1px solid var(--accent-border)` } : { border: '1px solid transparent' }}
                  >
                    <Icon size={15} className="flex-shrink-0" />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                          className="truncate"
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!sidebarCollapsed && !active && (
                      <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-2 py-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
        <Link href="/profile">
          <div className={cn(
            'flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[var(--bg-3)] transition-all cursor-pointer',
            !sidebarCollapsed && 'mb-1'
          )}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
              style={{ background: 'var(--accent-bg)', color: 'var(--accent-2)', border: '1px solid var(--accent-border)' }}>
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text-1)' }}>{user?.name ?? 'Admin'}</p>
                  <p className="text-[10px] truncate capitalize" style={{ color: 'var(--text-3)' }}>{user?.role?.replace('_', ' ')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-all',
            sidebarCollapsed && 'justify-center'
          )}
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          <LogOut size={14} className="flex-shrink-0" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}

/* Mobile overlay sidebar */
export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden"
          >
            <div className="h-full relative">
              <Sidebar onClose={() => setSidebarOpen(false)} />
              <button
                className="absolute top-3 right-3 p-1.5 rounded-md"
                style={{ color: 'var(--text-3)', background: 'var(--bg-3)' }}
                onClick={() => setSidebarOpen(false)}
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
