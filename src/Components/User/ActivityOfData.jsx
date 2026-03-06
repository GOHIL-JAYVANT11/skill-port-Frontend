import React from 'react';
import {
  Eye,
  Activity,
  FilePlus2,
  Mail,
  ShieldCheck,
  ShieldX,
  Ban,
  Trash2,
  Undo2,
  AlertTriangle,
} from 'lucide-react';

const ActivityOfData = ({
  accountStatus,
  verificationStatus,
  reportsCount = 0,
  placement = 'bottom',
  className = '',
  style = {},
  onViewProfile,
  onViewActivity,
  onRevokeVerification,
  onBlockUser,
  onSoftDeleteUser,
  onUserVerification,
}) => {
  const hasReports = reportsCount > 0;
  const isActive = accountStatus === 'Active';
  const isBlocked = accountStatus === 'Blocked';
  const isPendingStatus = accountStatus === 'Pending';
  const isVerified = verificationStatus === 'Verified';
  const isPendingVerification = verificationStatus === 'Pending';
  const isNotApplied = verificationStatus === 'Not Applied';
  const isRejected = verificationStatus === 'Rejected';
  const isDeleted = accountStatus === 'Deleted';

  const containerPositionClasses =
    placement === 'top'
      ? 'bottom-9'
      : 'top-9';

  return (
    <div
      className={`absolute right-0 ${containerPositionClasses} z-30 w-64 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-200 ${className}`}
      style={style}
    >
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          User Actions
        </span>
      </div>
      <div className="flex flex-col px-1 text-sm text-slate-700">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
          onClick={onViewProfile}
        >
          <Eye className="h-4 w-4 text-slate-400" />
          View Full Profile
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left hover:bg-amber-500 hover:text-white"
          onClick={onViewActivity}
        >
          <Activity className="h-4 w-4 text-slate-400" />
          View Activity Log
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
        >
          <FilePlus2 className="h-4 w-4 text-slate-400" />
          Add Admin Note
        </button>
        {/* <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
        >
          <Mail className="h-4 w-4 text-slate-400" />
          Send Email
        </button> */}
      </div>

      <div className="my-2 h-px bg-slate-100" />

      <div className="flex flex-col px-1 text-sm">
        {isActive && isVerified && !isDeleted && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-600 hover:bg-amber-50"
              onClick={onRevokeVerification}
            >
              <ShieldX className="h-4 w-4" />
              Revoke Verification
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onBlockUser}
            >
              <Ban className="h-4 w-4" />
              Block User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onSoftDeleteUser}
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {((isPendingStatus && isPendingVerification) || (isActive && isPendingVerification)) && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-600 hover:bg-emerald-50"
              onClick={onUserVerification}
            >
              <ShieldCheck className="h-4 w-4" />
              Approve Verification
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onUserVerification}
            >
              <ShieldX className="h-4 w-4" />
              Reject Verification
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onBlockUser}
            >
              <Ban className="h-4 w-4" />
              Block User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onSoftDeleteUser}
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {isBlocked && isVerified && !isDeleted && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-600 hover:bg-amber-50"
              onClick={onRevokeVerification}
            >
              <ShieldX className="h-4 w-4" />
              Revoke Verification
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-600 hover:bg-emerald-50"
              onClick={onBlockUser}
            >
              <Undo2 className="h-4 w-4" />
              Unblock User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onSoftDeleteUser}
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {isDeleted && isVerified && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-600 hover:bg-amber-50"
              onClick={onRevokeVerification}
            >
              <ShieldX className="h-4 w-4" />
              Revoke Verification
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-600 hover:bg-emerald-50"
              onClick={onBlockUser}
            >
              <Undo2 className="h-4 w-4" />
              Unblock User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onSoftDeleteUser}
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {isActive && isNotApplied && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-600 hover:bg-emerald-50"
              onClick={onUserVerification}
            >
              <ShieldCheck className="h-4 w-4" />
              Verify User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onBlockUser}
            >
              <Ban className="h-4 w-4" />
              Block User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
              onClick={onSoftDeleteUser}
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {isActive && isRejected && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-600 hover:bg-emerald-50"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
            >
              <Ban className="h-4 w-4" />
              Block User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {!((isActive && isVerified) || ((isPendingStatus && isPendingVerification) || (isActive && isPendingVerification)) || (isBlocked && isVerified) || (isDeleted && isVerified) || (isActive && isNotApplied) || (isActive && isRejected)) && (
          <>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
            >
              <Ban className="h-4 w-4" />
              Block User
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </>
        )}

        {hasReports && (
          <button
            type="button"
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-600 hover:bg-amber-50"
          >
            <AlertTriangle className="h-4 w-4" />
            View Reports ({reportsCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityOfData;
