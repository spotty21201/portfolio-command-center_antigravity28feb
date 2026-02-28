import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row overflow-hidden flex-1 min-h-0">
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0">
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700">
              <User className="w-4 h-4 mr-3" /> Profile
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              <Bell className="w-4 h-4 mr-3" /> Notifications
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              <Shield className="w-4 h-4 mr-3" /> Security
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              <Database className="w-4 h-4 mr-3" /> Integrations
            </a>
          </nav>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Information</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
                U
              </div>
              <div>
                <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                  Change Avatar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-slate-700">First name</label>
                <div className="mt-1">
                  <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border" defaultValue="Admin" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-slate-700">Last name</label>
                <div className="mt-1">
                  <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border" defaultValue="User" />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border" defaultValue="admin@nusantara.co.id" />
                </div>
              </div>
            </div>
            
            <div className="pt-5 border-t border-slate-200 flex justify-end">
              <button type="button" className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
                Cancel
              </button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
