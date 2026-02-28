import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  Target, 
  ShieldAlert, 
  FileText, 
  Settings,
  Search,
  Bell,
  RefreshCw,
  Database
} from 'lucide-react';
import { useAppStore, Role } from '../store/appStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Home', path: '/', icon: LayoutDashboard },
  { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { name: 'Company Detail', path: '/company/c1', icon: Building2 }, // Default to c1 for prototype
  { name: 'Initiatives', path: '/initiatives', icon: Target },
  { name: 'Risk & Compliance', path: '/risk', icon: ShieldAlert },
  { name: 'Reports', path: '/reports', icon: FileText },
];

export function Layout() {
  const location = useLocation();
  const { currency, setCurrency, role, setRole } = useAppStore();

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0 relative flex-shrink-0 border-r border-slate-800 shadow-xl z-20">
        {/* Nano Banana Wireframe Batik Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg stroke='%23FFDE59' stroke-width='0.5' fill='none'%3E%3Ccircle cx='20' cy='20' r='20' /%3E%3Ccircle cx='0' cy='0' r='20' /%3E%3Ccircle cx='40' cy='0' r='20' /%3E%3Ccircle cx='0' cy='40' r='20' /%3E%3Ccircle cx='40' cy='40' r='20' /%3E%3Ccircle cx='20' cy='20' r='10' /%3E%3Ccircle cx='0' cy='0' r='10' /%3E%3Ccircle cx='40' cy='0' r='10' /%3E%3Ccircle cx='0' cy='40' r='10' /%3E%3Ccircle cx='40' cy='40' r='10' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="h-20 flex items-center px-6 border-b border-white/5 relative z-10">
          <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center mr-3 bg-amber-600/20 text-amber-500 border border-amber-500/30">
            <span className="font-serif font-bold text-xl italic">N</span>
          </div>
          <span className="text-white font-serif font-semibold text-lg leading-tight tracking-wider">NUSANTARA<br/>GROUP</span>
        </div>
        
        <div className="flex-1 py-8 overflow-y-auto relative z-10">
          <div className="px-6 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Command Center
          </div>
          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-amber-500/10 text-amber-500 rounded-md border border-amber-500/20 shadow-sm" 
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-md border border-transparent"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-4 w-4 transition-colors duration-200", 
                    isActive ? "text-amber-500" : "text-slate-500 group-hover:text-amber-500/60"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5 relative z-10">
          <Link to="/settings" className="flex items-center px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors rounded-md hover:bg-white/5">
            <Settings className="mr-3 h-4 w-4 text-slate-500" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#F8F9FA]">
        {/* Topbar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search portfolio, companies, or alerts..."
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 bg-white/50 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 focus:bg-white transition-all shadow-sm"
              />
            </div>
            
            <div className="ml-8 flex items-center space-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center px-2.5 py-1 rounded-md bg-white border border-slate-200/60 shadow-sm">
                <RefreshCw className="h-3.5 w-3.5 mr-2 text-slate-400" />
                <span>Last refresh: <span className="text-slate-700 font-semibold">10 mins ago</span></span>
              </div>
              <div className="flex items-center px-2.5 py-1 rounded-md bg-emerald-50/80 text-emerald-800 border border-emerald-100 shadow-sm">
                <Database className="h-3.5 w-3.5 mr-2 text-emerald-600" />
                <span>Data validity: <span className="font-semibold">98%</span></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200/60 shadow-inner">
              <button 
                onClick={() => setCurrency('IDR')}
                className={cn("px-3 py-1 text-[11px] font-bold rounded shadow-sm transition-all uppercase tracking-wider", currency === 'IDR' ? "bg-white text-slate-900 border border-slate-200/50" : "text-slate-500 hover:text-slate-700 shadow-none")}
              >
                IDR
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={cn("px-3 py-1 text-[11px] font-bold rounded shadow-sm transition-all uppercase tracking-wider", currency === 'USD' ? "bg-white text-slate-900 border border-slate-200/50" : "text-slate-500 hover:text-slate-700 shadow-none")}
              >
                USD
              </button>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Viewing As</span>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="text-sm border border-slate-200 bg-white rounded-md font-semibold text-slate-700 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 cursor-pointer py-1.5 pl-3 pr-8 shadow-sm"
              >
                <option value="CEO">Group CEO</option>
                <option value="Risk Officer">Risk Officer</option>
                <option value="BU CEO">BU CEO</option>
              </select>
            </div>

            <div className="flex items-center space-x-5 border-l border-slate-200 pl-6">
              <button className="text-slate-400 hover:text-slate-600 relative transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white shadow-sm" />
              </button>
              <button className="flex items-center rounded-full ring-2 ring-slate-100 hover:ring-amber-500/30 transition-all p-0.5 bg-white">
                <img 
                  src="https://picsum.photos/seed/ceo/100/100" 
                  alt="Profile" 
                  className="h-8 w-8 object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
