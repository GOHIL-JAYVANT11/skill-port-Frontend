import React, { useMemo, useRef, useState } from 'react';
import {
  Plus,
  Search,
  Filter as FilterIcon,
  Building2,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import CompaniesTable from '../Components/Companies/CompaniesTable';
import CompaniesFilter from '../Components/Companies/CompaniesFilter';
import CompaniesExportData from '../Components/Companies/CompaniesExportData';
import {
  CompanyDetailsModal,
  AddCompanyModal,
  VerifyCompanyModal,
  RejectVerificationModal,
  AccountStatusModal,
  AdminNoteModal,
  PaymentsModal,
  DisputesModal,
  ActivityTimelineModal,
} from '../Components/Companies/CompaniesModals';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation';
import { toast } from 'sonner';

const Companies = () => {
  const headerRef = useRef(null);
  const exportButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRowRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, exportButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRowRef);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All Industries',
    verificationStatus: 'All',
    accountStatus: 'All',
    commissionMin: '',
    commissionMax: '',
    joinedFrom: '',
    joinedTo: '',
    disputeMin: '',
    disputeMax: '',
    onlyHighRisk: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);

  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [addedCompanies, setAddedCompanies] = useState([]);
  const [activeCompany, setActiveCompany] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [accountStatusMode, setAccountStatusMode] = useState(null);
  const [isAccountStatusOpen, setIsAccountStatusOpen] = useState(false);
  const [isAdminNoteOpen, setIsAdminNoteOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isDisputesOpen, setIsDisputesOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  const companies = useMemo(
    () => [
      {
        id: 'c1',
        name: 'TechCorp Inc.',
        logoUrl: '',
        primaryRecruiter: 'Sarah Johnson',
        primaryRole: 'Head of Talent',
        email: 'sarah@techcorp.com',
        phone: '+1 (555) 123-4567',
        industry: 'Technology',
        location: '500 Market Street, San Francisco, CA',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Sep 15, 2023',
        website: 'https://techcorp.com',
        description:
          'Scaling digital products and cloud-native platforms for global enterprises.',
        verificationReviewedAt: 'Sep 18, 2023',
        riskTag: '',
        stats: {
          totalJobs: 42,
          totalProjects: 8,
          openJobs: 9,
          closedJobs: 33,
          activeProjects: 3,
          completedProjects: 5,
          activeHires: 12,
          completedHires: 36,
        },
        jobsPosted: [
          {
            id: 'j1',
            title: 'Senior Frontend Engineer',
            type: 'Job',
            date: 'Jan 5, 2024',
            applicants: 45,
            status: 'Approved',
          },
          {
            id: 'j2',
            title: 'Product Manager',
            type: 'Job',
            date: 'Jan 20, 2024',
            applicants: 18,
            status: 'Pending',
          },
        ],
        projectsPosted: [
          {
            id: 'p1',
            title: 'Design System Revamp',
            status: 'Active',
            budget: 'USD 85,000',
            escrow: 'Escrow USD 60,000',
          },
        ],
        verificationDocuments: [
          {
            id: 'vd1',
            name: 'Business Registration',
            uploadedOn: 'Sep 10, 2023',
            status: 'Approved',
          },
          {
            id: 'vd2',
            name: 'Tax Certificate',
            uploadedOn: 'Sep 11, 2023',
            status: 'Approved',
          },
        ],
        financials: {
          totalCommission: 12850,
          totalPaid: 420000,
          pendingCommission: 2450,
          escrowIn: 96000,
          escrowOut: 72000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 1,
          lastIncident: 'Minor payment delay reported Oct 2025',
          lastDispute: 'Jan 18, 2024',
          frequency: 'LOW',
          level: 'Low',
        },
        adminNotes: [
          {
            id: 'n1',
            author: 'Platform Admin',
            note: 'Strong hiring volume with low dispute rate. Good payment behaviour.',
            createdAt: 'Oct 10, 2024',
          },
        ],
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Active',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c1',
        name: 'Acme Technologies Pvt Ltd',
        logoUrl: '',
        primaryRecruiter: 'Rohit Sharma',
        primaryRole: 'Senior Talent Partner',
        email: 'rohit.sharma@acmetech.com',
        phone: '+91 98765 43210',
        industry: 'Technology',
        location: 'Bengaluru, India',
        verificationStatus: 'Verified',
        accountStatus: 'Suspended',
        isVerified: true,
        joinedDate: 'Jan 08, 2025',
        website: 'acmetech.com',
        description:
          'Product-led SaaS company focused on developer tooling and cloud-native infrastructure.',
        verificationReviewedAt: 'Feb 12, 2025',
        riskTag: 'Low risk',
        stats: {
          totalJobs: 48,
          totalProjects: 12,
          openJobs: 9,
          closedJobs: 39,
          activeProjects: 4,
          completedProjects: 8,
          activeHires: 16,
        },
        financials: {
          totalCommission: 720000,
          totalPaid: 5200000,
          pendingCommission: 85000,
          activeEscrows: 3,
          disputedEscrows: 1,
          payoutTime: '5-7 working days',
          lastPayout: 'Feb 10, 2026',
        },
        risk: {
          reports: 2,
          disputes: 1,
          warnings: 0,
          lastIncident: 'Minor payment delay reported Oct 2025',
          level: 'Low',
        },
        paymentsHistory: [
          {
            id: 'p1',
            title: 'Commission payout – Full-time hire',
            subtitle: '₹32,000 • Backend Engineer • Jan 2026',
            meta: 'Processed • 06 Feb 2026',
          },
          {
            id: 'p2',
            title: 'Commission payout – Freelance project',
            subtitle: '₹18,000 • React dashboard revamp • Dec 2025',
            meta: 'Processed • 08 Jan 2026',
          },
        ],
        disputesHistory: [
          {
            id: 'd1',
            title: 'Payment dispute – Short-term contract',
            subtitle: 'Raised by freelancer • Resolved in favour of company',
            meta: 'Closed • Nov 2025',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Company verified by admin',
            subtitle: 'Documents reviewed and approved',
            meta: '12 Feb 2025',
          },
          {
            id: 'a2',
            title: 'Posted Senior React Developer role',
            subtitle: 'Full-time • Bengaluru or Remote',
            meta: '04 Jan 2026',
          },
        ],
      },
      {
        id: 'c2',
        name: 'BrightPath Learning Solutions',
        logoUrl: '',
        primaryRecruiter: 'Neha Verma',
        primaryRole: 'HR Manager',
        email: 'neha@brightpath.edu',
        phone: '+91 98200 11223',
        industry: 'Education',
        location: 'Pune, India',
        verificationStatus: 'Pending',
        accountStatus: 'Active',
        isVerified: false,
        joinedDate: 'Mar 22, 2025',
        website: 'brightpath.edu',
        description:
          'EdTech organisation building hybrid learning products and upskilling solutions for colleges.',
        verificationReviewedAt: null,
        riskTag: '',
        stats: {
          totalJobs: 18,
          totalProjects: 6,
          openJobs: 3,
          closedJobs: 15,
          activeProjects: 2,
          completedProjects: 4,
          activeHires: 7,
        },
        financials: {
          totalCommission: 210000,
          totalPaid: 1200000,
          pendingCommission: 30000,
          activeEscrows: 1,
          disputedEscrows: 0,
          payoutTime: '7-9 working days',
          lastPayout: 'Jan 18, 2026',
        },
        risk: {
          reports: 0,
          disputes: 0,
          warnings: 0,
          lastIncident: '',
          level: 'Low',
        },
        paymentsHistory: [],
        disputesHistory: [],
        activityTimeline: [],
      },
      {
        id: 'c3',
        name: 'UrbanWorks Studio',
        logoUrl: '',
        primaryRecruiter: 'Arjun Mehta',
        primaryRole: 'Founder & Recruiter',
        email: 'arjun@urbanworks.studio',
        phone: '+91 98191 22114',
        industry: 'Design & Creative',
        location: 'Remote, India',
        verificationStatus: 'Verified',
        accountStatus: 'Suspended',
        isVerified: true,
        joinedDate: 'Aug 14, 2024',
        website: 'urbanworks.studio',
        description:
          'Design collective working with startups for brand, product and motion design projects.',
        verificationReviewedAt: 'Sep 02, 2024',
        riskTag: 'Under review',
        stats: {
          totalJobs: 9,
          totalProjects: 26,
          openJobs: 1,
          closedJobs: 8,
          activeProjects: 5,
          completedProjects: 21,
          activeHires: 4,
        },
        financials: {
          totalCommission: 340000,
          totalPaid: 1750000,
          pendingCommission: 120000,
          activeEscrows: 2,
          disputedEscrows: 2,
          payoutTime: '10-12 working days',
          lastPayout: 'Dec 22, 2025',
        },
        risk: {
          reports: 5,
          disputes: 3,
          warnings: 2,
          lastIncident: 'Multiple disputes on delayed milestone approvals',
          level: 'High',
        },
        paymentsHistory: [],
        disputesHistory: [],
        activityTimeline: [],
      },
    ],
    [],
  );

  const allCompanies = useMemo(
    () => [...addedCompanies, ...companies],
    [addedCompanies, companies],
  );

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      const term = searchTerm.trim().toLowerCase();
      if (term) {
        const matchesSearch =
          company.name.toLowerCase().includes(term) ||
          company.email.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }

      if (
        filters.industry !== 'All Industries' &&
        company.industry !== filters.industry
      ) {
        return false;
      }

      if (
        filters.verificationStatus !== 'All' &&
        company.verificationStatus !== filters.verificationStatus
      ) {
        return false;
      }

      if (
        filters.accountStatus !== 'All' &&
        company.accountStatus !== filters.accountStatus
      ) {
        return false;
      }

      if (filters.onlyHighRisk && company.risk.level !== 'High') {
        return false;
      }

      return true;
    });
  }, [allCompanies, searchTerm, filters]);

  const stats = useMemo(() => {
    const total = allCompanies.length;
    const verified = allCompanies.filter(
      (c) => c.verificationStatus === 'Verified',
    ).length;
    const pending = allCompanies.filter(
      (c) => c.verificationStatus === 'Pending',
    ).length;
    const suspendedOrBlacklisted = allCompanies.filter(
      (c) => c.accountStatus === 'Suspended' || c.accountStatus === 'Blacklisted',
    ).length;

    return {
      total,
      verified,
      pending,
      suspendedOrBlacklisted,
    };
  }, [allCompanies]);

  const handleToggleSelectCompany = (companyId) => {
    setSelectedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId],
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedCompanyIds((prev) =>
      prev.length === filteredCompanies.length
        ? []
        : filteredCompanies.map((c) => c.id),
    );
  };

  const handleAddCompanySave = (newCompany, options) => {
    setAddedCompanies((prev) => [newCompany, ...prev]);
    const verified = options && options.verified;
    toast.success(
      verified
        ? 'Company added and verified successfully'
        : 'Company added successfully. Verification pending.',
    );
  };

  const openForCompany = (company, setter) => {
    setActiveCompany(company);
    setter(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div ref={headerRef}>
          <h1 className="text-xl font-semibold text-slate-900">
            Company Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, verify and monitor all companies and recruiters on SkillPort.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => setIsExportOpen(true)}
            ref={exportButtonRef}
          >
            <ShieldCheck className="h-4 w-4 text-sky-600" />
            Export Companies
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
            onClick={() => setIsAddCompanyOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Company
          </button>
        </div>
      </div>

      <div
        ref={statsCardsRef}
        className="grid gap-3 md:grid-cols-4"
      >
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total Companies
              </div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {stats.total}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <Building2 className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                Verified Companies
              </div>
              <div className="mt-1 text-xl font-semibold text-emerald-800">
                {stats.verified}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                Pending Verification
              </div>
              <div className="mt-1 text-xl font-semibold text-amber-900">
                {stats.pending}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                Suspended / Blacklisted
              </div>
              <div className="mt-1 text-xl font-semibold text-rose-900">
                {stats.suspendedOrBlacklisted}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={filtersRowRef}
        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies by name or email"
              className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => setIsFilterOpen(true)}
          >
            <FilterIcon className="h-4 w-4 text-slate-500" />
            Filters
          </button>
        </div>
      </div>

      <CompaniesTable
        companies={filteredCompanies}
        selectedCompanyIds={selectedCompanyIds}
        onToggleSelectCompany={handleToggleSelectCompany}
        onToggleSelectAll={handleToggleSelectAll}
        onOpenDetails={(company) => openForCompany(company, setIsDetailsOpen)}
        onVerify={(company) => openForCompany(company, setIsVerifyOpen)}
        onRejectVerification={(company) =>
          openForCompany(company, setIsRejectOpen)
        }
        onSuspend={(company) => {
          setAccountStatusMode('suspend');
          openForCompany(company, setIsAccountStatusOpen);
        }}
        onBlacklist={(company) => {
          setAccountStatusMode('blacklist');
          openForCompany(company, setIsAccountStatusOpen);
        }}
        onReactivate={(company) => {
          setAccountStatusMode('reactivate');
          openForCompany(company, setIsAccountStatusOpen);
        }}
        onViewJobs={(company) =>
          openForCompany(company, setIsDetailsOpen)
        }
        onViewProjects={(company) =>
          openForCompany(company, setIsDetailsOpen)
        }
        onViewPayments={(company) =>
          openForCompany(company, setIsPaymentsOpen)
        }
        onViewDisputes={(company) =>
          openForCompany(company, setIsDisputesOpen)
        }
        onAddAdminNote={(company) =>
          openForCompany(company, setIsAdminNoteOpen)
        }
        onViewTimeline={(company) =>
          openForCompany(company, setIsActivityOpen)
        }
      />

      {isFilterOpen && (
        <CompaniesFilter
          selectedFilters={filters}
          onChange={setFilters}
          onClose={() => setIsFilterOpen(false)}
          onApply={() => setIsFilterOpen(false)}
        />
      )}

      <CompaniesExportData
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        companies={allCompanies}
        filteredCompanies={filteredCompanies}
      />

      <AddCompanyModal
        isOpen={isAddCompanyOpen}
        onClose={() => setIsAddCompanyOpen(false)}
        onSave={handleAddCompanySave}
      />

      <CompanyDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        company={activeCompany}
      />
      <VerifyCompanyModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        company={activeCompany}
      />
      <RejectVerificationModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        company={activeCompany}
      />
      <AccountStatusModal
        isOpen={isAccountStatusOpen}
        onClose={() => setIsAccountStatusOpen(false)}
        company={activeCompany}
        mode={accountStatusMode}
      />
      <AdminNoteModal
        isOpen={isAdminNoteOpen}
        onClose={() => setIsAdminNoteOpen(false)}
        company={activeCompany}
      />
      <PaymentsModal
        isOpen={isPaymentsOpen}
        onClose={() => setIsPaymentsOpen(false)}
        company={activeCompany}
        items={activeCompany?.paymentsHistory || []}
      />
      <DisputesModal
        isOpen={isDisputesOpen}
        onClose={() => setIsDisputesOpen(false)}
        company={activeCompany}
        items={activeCompany?.disputesHistory || []}
      />
      <ActivityTimelineModal
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        company={activeCompany}
        items={activeCompany?.activityTimeline || []}
      />
    </div>
  );
};

export default Companies;
