import React, { useState } from 'react';
import { MoreHorizontal, Clock } from 'lucide-react';
import ActivityOfData from './ActivityOfData';

const getInitials = (name) => {
  if (!name) return '';
  const [first = '', second = ''] = name.split(' ');
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
};

const formatDate = (isoDateString) => {
  if (!isoDateString) return '-';
  const date = new Date(isoDateString);
  if (Number.isNaN(date.getTime())) return isoDateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const UserTable = ({
  users,
  totalCount,
  selectedUserIds,
  allSelected,
  onToggleAll,
  onToggleUserSelect,
  onClearSelection,
  onOpenProfile,
  onOpenActivityLog,
  onOpenRevokeVerification,
  onOpenBlockUser,
  onOpenSoftDeleteUser,
  onOpenUserVerification,
}) => {
  const [activeMenuState, setActiveMenuState] = useState(null); // { user, top, right }
  const selectedCount = selectedUserIds.length;

  const handleMenuClick = (event, user) => {
    event.stopPropagation();
    if (activeMenuState && activeMenuState.user.id === user.id) {
      setActiveMenuState(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      // Calculate position relative to viewport
      const top = rect.bottom + window.scrollY;
      const right = window.innerWidth - rect.right;
      
      // Check if near bottom of screen
      const isNearBottom = rect.bottom > window.innerHeight - 250;
      
      setActiveMenuState({
        user,
        top: isNearBottom ? 'auto' : top,
        bottom: isNearBottom ? window.innerHeight - rect.top : 'auto',
        right,
        placement: isNearBottom ? 'top' : 'bottom',
      });
    }
  };

  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenuState(null);
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleClickOutside);
    window.addEventListener('scroll', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleClickOutside);
      window.removeEventListener('scroll', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="w-12 px-4 py-3">
                <button
                  type="button"
                  onClick={onToggleAll}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    allSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                  }`}
                >
                  {allSelected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Roles</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Verification</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Last Active</th>
              <th className="px-4 py-3 text-right">Reports</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const isSelected = selectedUserIds.includes(user.id);
              const isNearBottom = index >= users.length - 5;

              const statusColorClasses =
                user.accountStatus === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : user.accountStatus === 'Pending'
                  ? 'bg-amber-50 text-amber-700 border-amber-100'
                  : user.accountStatus === 'Blocked'
                  ? 'bg-rose-50 text-rose-700 border-rose-100'
                  : 'bg-slate-50 text-slate-600 border-slate-100';

              const verificationColorClasses =
                user.verificationStatus === 'Verified'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : user.verificationStatus === 'Rejected'
                  ? 'bg-rose-50 text-rose-700 border-rose-100'
                  : 'bg-slate-50 text-slate-600 border-slate-100';

              return (
                <tr
                  key={`${user.id}-${index}`}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onToggleUserSelect(user.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">
                            {user.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                        {user.roles}
                      </span>
                      {user.secondaryRole && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                          {user.secondaryRole}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColorClasses}`}
                    >
                      {user.accountStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${verificationColorClasses}`}
                    >
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {formatDate(user.joinedDate)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{formatDate(user.lastActive)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-slate-600">
                    {user.reportsCount > 0 ? (
                      <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border border-amber-300 bg-amber-50 px-1 text-[11px] font-semibold text-amber-700">
                        {user.reportsCount}
                      </span>
                    ) : (
                      <span>0</span>
                    )}
                  </td>
                  <td className="relative px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => handleMenuClick(e, user)}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                        activeMenuState?.user?.id === user.id
                          ? 'bg-slate-100 text-slate-600'
                          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                      }`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {activeMenuState && (
        <div
          style={{
            position: 'fixed',
            top: activeMenuState.top !== 'auto' ? activeMenuState.top : 'auto',
            bottom: activeMenuState.bottom !== 'auto' ? activeMenuState.bottom : 'auto',
            right: activeMenuState.right,
            zIndex: 50,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ActivityOfData
            accountStatus={activeMenuState.user.accountStatus}
            verificationStatus={activeMenuState.user.verificationStatus}
            reportsCount={activeMenuState.user.reportsCount}
            placement={activeMenuState.placement}
            className="!absolute !right-0 !top-0 !bottom-auto" // Override positioning
            style={{ marginTop: '0.5rem' }}
            onViewProfile={() => {
              if (onOpenProfile) onOpenProfile(activeMenuState.user);
              setActiveMenuState(null);
            }}
            onViewActivity={() => {
              if (onOpenActivityLog) onOpenActivityLog(activeMenuState.user);
              setActiveMenuState(null);
            }}
            onRevokeVerification={() => {
              if (onOpenRevokeVerification) onOpenRevokeVerification(activeMenuState.user);
              setActiveMenuState(null);
            }}
            onBlockUser={() => {
              if (onOpenBlockUser) onOpenBlockUser(activeMenuState.user);
              setActiveMenuState(null);
            }}
            onSoftDeleteUser={() => {
              if (onOpenSoftDeleteUser) onOpenSoftDeleteUser(activeMenuState.user);
              setActiveMenuState(null);
            }}
            onUserVerification={() => {
              if (onOpenUserVerification) onOpenUserVerification(activeMenuState.user);
              setActiveMenuState(null);
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold">{users.length}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> users
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40  ml-56 flex justify-center">
          <div className="pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-4 rounded-2xl border border-slate-200  bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 px-6 py-3 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                {selectedCount}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">Users Selected</span>
                <span className="text-xs text-slate-500">Choose an action</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                Verify All
              </button>
              <button
                type="button"
                className="rounded-full border border-rose-500 bg-white px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                Block All
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-500 bg-white px-4 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50"
              >
                Delete All
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Export
              </button>
              <button
                type="button"
                onClick={onClearSelection}
                className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
