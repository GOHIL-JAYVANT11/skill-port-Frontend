import React, { useState } from 'react';
import {
  X,
  ShieldX,
  Ban,
  Trash2,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';

const getInitials = (name) => {
  if (!name) return '';
  const [first = '', second = ''] = name.split(' ');
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
};

const UserSummary = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
        {getInitials(user.name)}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900">{user.name}</div>
        <div className="text-xs text-slate-500">{user.email}</div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {user.roles && (
            <span className="inline-flex items-center rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
              {user.roles}
            </span>
          )}
          {user.secondaryRole && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
              {user.secondaryRole}
            </span>
          )}
          {user.accountStatus && (
            <span className="inline-flex items-center rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
              {user.accountStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const RevokeVerificationModal = ({ isOpen, onClose, user }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldX className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-slate-900">
                Revoke Verification
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Are you sure you want to revoke this user&apos;s verification status?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-5 pt-2">
          <UserSummary user={user} />

          <div className="mt-5">
            <div className="text-xs font-semibold text-slate-700">
              Reason for Revocation *
            </div>
            <div className="mt-2 rounded-2xl border border-emerald-500/70 bg-emerald-50/20 px-3 py-2">
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explain why the verification is being revoked..."
                rows={3}
                className="w-full resize-none border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-400"
            >
              <ShieldX className="h-3.5 w-3.5" />
              Revoke Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlockUserModal = ({ isOpen, onClose, user }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-rose-500" />
              <h2 className="text-lg font-semibold text-slate-900">Block User</h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              This will prevent the user from accessing the platform.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-5 pt-2">
          <UserSummary user={user} />

          <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-3 py-2.5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-rose-500" />
              <div>
                <div className="text-xs font-semibold text-rose-700">Warning</div>
                <div className="mt-1 text-xs text-rose-600">
                  Blocking this user will immediately revoke their access. They will be
                  logged out and unable to log in.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold text-slate-700">
              Reason for Blocking *
            </div>
            <div className="mt-2 rounded-2xl border border-rose-200 bg-rose-50/40 px-3 py-2">
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Provide a reason for blocking (e.g., policy violation, spam activity...)"
                rows={3}
                className="w-full resize-none border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              This reason will be logged for audit purposes.
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-400"
            >
              <Ban className="h-3.5 w-3.5" />
              Block User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SoftDeleteUserModal = ({ isOpen, onClose, user }) => {
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen || !user) {
    return null;
  }

  const confirmValid = confirmText.trim().toUpperCase() === 'DELETE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-rose-500" />
              <h2 className="text-lg font-semibold text-slate-900">
                Soft Delete User
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              This action will mark the user as deleted. The data will be retained but
              the user will lose access.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-5 pt-2">
          <UserSummary user={user} />

          <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-3 py-2.5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-rose-500" />
              <div>
                <div className="text-xs font-semibold text-rose-700">
                  Soft Delete Warning
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-rose-600">
                  <li>User will be logged out immediately</li>
                  <li>User cannot log in or access the platform</li>
                  <li>All data will be retained for audit purposes</li>
                  <li>This action can be reversed by an admin</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold text-slate-700">
              Type DELETE to confirm
            </div>
            <div className="mt-2 rounded-2xl border border-emerald-500/70 bg-emerald-50/20 px-3 py-2">
              <input
                type="text"
                value={confirmText}
                onChange={(event) => setConfirmText(event.target.value)}
                placeholder="Type DELETE"
                className="w-full border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!confirmValid}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white ${
                confirmValid
                  ? 'bg-rose-500 hover:bg-rose-400'
                  : 'cursor-not-allowed bg-rose-300'
              }`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Soft Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserVerificationModal = ({ isOpen, onClose, user }) => {
  const [decision, setDecision] = useState('approve');
  const [rejectionReason, setRejectionReason] = useState('');

  if (!isOpen || !user) {
    return null;
  }

  const isApprove = decision === 'approve';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-slate-900">
                User Verification
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Review and verify or reject this user&apos;s verification request.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-5 pt-2">
          <UserSummary user={user} />

          <div className="mt-5">
            <div className="text-xs font-semibold text-slate-700">
              Verification Decision
            </div>
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => setDecision('approve')}
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs ${
                  isApprove
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      isApprove ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                    }`}
                  >
                    {isApprove && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="font-semibold text-slate-800">
                    Approve Verification
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Grant verified status to this user
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('reject')}
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs ${
                  !isApprove
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      !isApprove ? 'border-rose-500 bg-rose-500' : 'border-slate-300'
                    }`}
                  >
                    {!isApprove && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="font-semibold text-slate-800">
                    Reject Verification
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Decline with a reason
                </span>
              </button>
            </div>
          </div>

          {!isApprove && (
            <div className="mt-5">
              <div className="text-xs font-semibold text-slate-700">
                Rejection Reason *
              </div>
              <div className="mt-2 rounded-2xl border border-rose-200 bg-rose-50/40 px-3 py-2">
                <textarea
                  value={rejectionReason}
                  onChange={(event) => setRejectionReason(event.target.value)}
                  placeholder="Provide a reason for rejection (e.g., incomplete documentation, invalid ID...)"
                  rows={3}
                  className="w-full resize-none border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                This reason will be visible to the user.
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white ${
                isApprove
                  ? 'bg-emerald-500 hover:bg-emerald-400'
                  : 'bg-rose-500 hover:bg-rose-400'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              {isApprove ? 'Approve' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OthersActivity = () => {
  return null;
};

export default OthersActivity;
