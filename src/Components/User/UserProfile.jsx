import React, { useState } from 'react';
import {
    X,
    FileText,
    Globe2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Briefcase,
    GraduationCap,
    Activity as ActivityIcon,
    StickyNote,
} from 'lucide-react';

const getInitials = (name) => {
    if (!name) return '';
    const [first = '', second = ''] = name.split(' ');
    return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
};

export const UserActivityLogModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) {
        return null;
    }

    const activityLog = [
        {
            id: 'act1',
            title: 'Login',
            description: 'Logged in from Chrome on Windows',
            meta: '192.168.1.1 • Chrome / Windows',
            date: 'Jan 25, 2024 7:52 PM',
            badge: 'Login',
            badgeColor: 'bg-sky-50 text-sky-700 border-sky-100',
        },
        {
            id: 'act2',
            title: 'Profile Update',
            description: 'Updated portfolio link',
            meta: '192.168.1.1 • Chrome / Windows',
            date: 'Jan 24, 2024 2:45 PM',
            badge: 'Profile Update',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        },
        {
            id: 'act3',
            title: 'Job Application',
            description: 'Applied for Senior React Developer at TechCo',
            meta: '10.0.0.5 • Safari / macOS',
            date: 'Jan 23, 2024 5:00 PM',
            badge: 'Job Application',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-100',
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
            <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 pb-4 pt-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <ActivityIcon className="h-5 w-5 text-emerald-500" />
                            <h2 className="text-lg font-semibold text-slate-900">Activity Log</h2>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            Complete activity history for {user.name}
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

                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
                            {getInitials(user.name)}
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                        <div className="text-[11px] uppercase tracking-wide text-slate-400">
                            Last Active
                        </div>
                        <div className="mt-0.5 font-semibold text-slate-800">{user.lastActive}</div>
                    </div>
                </div>

                <div className="max-h-[420px] space-y-3 overflow-y-auto px-6 pb-5 pt-1">
                    {activityLog.map((item) => (
                        <div
                            key={item.id}
                            className="relative rounded-2xl bg-slate-50 p-0.5"
                        >
                            <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${item.badgeColor}`}
                                            >
                                                {item.badge}
                                            </span>
                                            <span className="text-[11px] text-slate-400">{item.date}</span>
                                        </div>
                                        <div className="mt-2 text-sm font-semibold text-slate-900">
                                            {item.title}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">{item.description}</div>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                                    <Globe2 className="h-3.5 w-3.5" />
                                    <span>{item.meta}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const UserProfile = ({ isOpen, onClose, user, onOpenActivityLog }) => {
    const [activeTab, setActiveTab] = useState('skills');

    if (!isOpen || !user) {
        return null;
    }

    const skills = user.skills || [];

    const experience = [
        {
            id: 'exp1',
            title: 'Senior Frontend Developer',
            company: 'Tech Corp',
            period: '2021 - Present',
            location: user.location || 'Remote',
            current: true,
            description: 'Leading frontend development team and building modern web applications.',
        },
        {
            id: 'exp2',
            title: 'Frontend Developer',
            company: 'StartupXYZ',
            period: '2019 - 2021',
            location: user.location || 'Remote',
            current: false,
            description: 'Built React applications and collaborated with cross-functional teams.',
        },
    ];

    const education = [
        {
            id: 'edu1',
            degree: 'B.S. Computer Science',
            institution: 'Stanford University',
            field: 'Computer Science',
            year: '2019',
        },
    ];

    const adminNotes = [
        {
            id: 'note1',
            author: 'Admin Sarah',
            date: '2024-01-20 15:30',
            content: 'Excellent track record, top performer.',
        },
    ];

    const activityLog = [
        {
            id: 'act1',
            title: 'Login',
            description: 'Logged in from Chrome on Windows',
            meta: 'IP: 192.168.1.1 • Chrome / Windows',
            date: 'Jan 25, 7:52 PM',
        },
        {
            id: 'act2',
            title: 'Profile Update',
            description: 'Updated portfolio link',
            meta: 'IP: 192.168.1.1 • Chrome / Windows',
            date: 'Jan 24, 2:45 PM',
        },
        {
            id: 'act3',
            title: 'Job Application',
            description: 'Applied for Senior React Developer at TechCo',
            meta: 'IP: 10.0.0.5 • Safari / macOS',
            date: 'Jan 23, 5:00 PM',
        },
    ];

    const tabs = [
        { id: 'skills', label: 'Skills', icon: ActivityIcon },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'notes', label: 'Admin Notes (1)', icon: StickyNote },
        { id: 'activity', label: 'Activity Log', icon: ActivityIcon },
    ];

    const renderTabContent = () => {
        if (activeTab === 'skills') {
            return (
                <div className="space-y-3">
                    {skills.length === 0 && (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                            No skills added yet.
                        </div>
                    )}
                    {skills.map((skill, index) => (
                        <div
                            key={`${skill}-${index}`}
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                            <div>
                                <div className="text-sm font-semibold text-slate-900">{skill}</div>
                                <div className="text-xs text-slate-500">Skill detail</div>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                Expert
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'experience') {
            return (
                <div className="space-y-4">
                    {experience.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                                {item.current && (
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                                        Current
                                    </span>
                                )}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                                {item.company} • {item.location}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{item.period}</div>
                            <div className="mt-2 text-sm text-slate-600">{item.description}</div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'education') {
            return (
                <div className="space-y-3">
                    {education.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                            <div className="text-sm font-semibold text-slate-900">{item.degree}</div>
                            <div className="mt-1 text-xs text-slate-500">
                                {item.institution} • {item.field}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">Class of {item.year}</div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'notes') {
            return (
                <div className="space-y-3">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
                    >
                        <StickyNote className="h-4 w-4" />
                        Add Admin Note
                    </button>
                    {adminNotes.map((note) => (
                        <div
                            key={note.id}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                            <div className="text-sm text-slate-700">{note.content}</div>
                            <div className="mt-2 text-xs text-slate-500">
                                {note.author} • {note.date}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'activity') {
            return (
                <div className="space-y-3">
                    {activityLog.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <ActivityIcon className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm font-semibold text-slate-900">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="mt-1 text-xs text-slate-500">{item.description}</div>
                                <div className="mt-1 text-[11px] text-slate-400">{item.meta}</div>
                            </div>
                            <div className="ml-4 text-xs text-slate-500">{item.date}</div>
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
            <div className="relative flex w-full max-w-5xl flex-col rounded-3xl bg-white shadow-2xl">
                <div className="rounded-t-3xl bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-400 px-8 pb-6 pt-6 text-white">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold">
                                {getInitials(user.name)}
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                                    {user.verificationStatus === 'Verified' && (
                                        <span className="inline-flex items-center rounded-full bg-emerald-50/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-50 ring-1 ring-emerald-200/40">
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-sky-50">
                                    Passionate professional with experience building modern web applications.
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-sky-50/90 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                                        {user.roles}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-emerald-50/90 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                        {user.accountStatus}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-emerald-50/90 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                        {user.verificationStatus}
                                    </span>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-sky-50/90">
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="h-3.5 w-3.5" />
                                        <span>{user.email}</span>
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="h-3.5 w-3.5" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                    {user.location && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span>{user.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>Joined {user.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>Last active {user.lastActive}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm"
                                >
                                    <FileText className="h-4 w-4" />
                                    Resume
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm"
                                >
                                    <Globe2 className="h-4 w-4" />
                                    Portfolio
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 px-8 pb-6 pt-4">
                    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-3">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${isActive
                                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                            : 'bg-transparent text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="max-h-[420px] overflow-y-auto pb-2">{renderTabContent()}</div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">

                        <div className="flex items-center   justify-end gap-3">

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                onClick={() => {
                                    if (onOpenActivityLog) {
                                        onOpenActivityLog(user);
                                    }
                                }}
                            >
                                <ActivityIcon className="h-4 w-4 text-slate-400" />
                                Full Activity Log
                            </button>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                <StickyNote className="h-3.5 w-3.5" />
                                Add Note
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-400"
                            >
                                Block User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
