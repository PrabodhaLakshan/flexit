import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../../api/adminApi';

function StatCard({ label, value, loading, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {loading ? (
          <div className="mt-3 h-9 w-20 rounded-lg bg-gray-100 animate-pulse" />
        ) : (
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        )}
      </div>
      <div className={`h-12 w-12 rounded-full ${iconBg} flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load stats. Please refresh the page.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#61CE70] text-[#0a192f] font-bold rounded-lg hover:bg-[#52ba60] shadow-md transition-colors">
            Quick Action
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex-shrink-0 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 flex-shrink-0">
        <StatCard
          label="Total Resources"
          value={stats?.totalResources ?? 0}
          loading={loading}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <StatCard
          label="Active Users"
          value={stats?.activeUsers ?? 0}
          loading={loading}
          iconBg="bg-[#61CE70]/10"
          iconColor="text-[#61CE70]"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />

        <StatCard
          label="System Alerts"
          value={stats?.systemAlerts ?? 0}
          loading={loading}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* Dashboard Content area placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Detailed Analytics Coming Soon</h3>
          <p className="mt-1 text-gray-500">The primary metrics overview is currently in development.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
