import React, { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Briefcase,
  Download,
  Filter as FilterIcon,
  Search,
  User,
  Wallet,
} from 'lucide-react';
import FreelanceTable from '../Components/Freelancer/FreelanceTable';
import FreelanceFilter from '../Components/Freelancer/FreelanceFilter';
import FreelanceExportData from '../Components/Freelancer/FreelanceExportData';
import {
  ProjectDetailsModal,
  MilestonesModal,
  EscrowBreakdownModal,
  DisputeResolutionModal,
  PaymentOverrideModal,
  AdminNoteModal,
  ProjectActivityTimelineModal,
  ProjectChatModal,
} from '../Components/Freelancer/FreelanceModals';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation';

const Freelancer = () => {
  const headerRef = useRef(null);
  const exportButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRowRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, exportButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRowRef);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All',
    freelancer: 'All',
    client: 'All',
    budgetMin: '',
    budgetMax: '',
    escrowMin: '',
    escrowMax: '',
    progressMin: '',
    progressMax: '',
  });

  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [isPaymentOverrideOpen, setIsPaymentOverrideOpen] = useState(false);
  const [isAdminNoteOpen, setIsAdminNoteOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const projects = useMemo(
    () => [
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'On hold',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Completed',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Disputed',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p1',
        name: 'Multi-tenant Admin Dashboard Revamp',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        totalBudget: 450000,
        currency: '₹',
        status: 'Active',
        progressPercent: 68,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrow: {
          total: 320000,
          released: 180000,
          pending: 140000,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 1,
          delayedMilestones: 1,
        },
        performance: {
          averageApprovalTime: '2.3 days',
          onTimeDeliveryRate: '92%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Information Architecture and Wireframes',
            amount: 60000,
            status: 'Released',
            dueDate: '2026-01-15',
          },
          {
            id: 'm2',
            title: 'Design System and Visual Language',
            amount: 80000,
            status: 'Released',
            dueDate: '2026-01-30',
          },
          {
            id: 'm3',
            title: 'Frontend Implementation – Phase 1',
            amount: 90000,
            status: 'In Review',
            dueDate: '2026-02-20',
          },
          {
            id: 'm4',
            title: 'Frontend Implementation – Phase 2',
            amount: 90000,
            status: 'Pending',
            dueDate: '2026-03-05',
          },
          {
            id: 'm5',
            title: 'QA, UAT and Production Handover',
            amount: 110000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'Redesign and rebuild the SkillPort admin panel as a responsive, multi-tenant dashboard focused on hiring and freelance workflows.',
          scopeOfWork: [
            'Revamp navigation, layout and information architecture.',
            'Implement reusable UI components with Tailwind CSS.',
            'Integrate real-time project and escrow metrics.',
          ],
          requiredSkills: [
            'React',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'GSAP',
          ],
          contractTerms: {
            billingType: 'Milestone-based',
            revisionRounds: 'Up to 3 per milestone',
            cancellationPolicy: 'Pro-rated based on accepted work',
          },
          timeline: {
            startDate: '2025-12-20',
            endDate: '2026-03-25',
          },
        },
        communication: {
          lastMessageAt: '2026-02-21',
          unreadCount: 3,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Anita Sharma',
              role: 'Freelancer',
              content: 'Pushed the updated analytics widgets for review.',
              at: '2026-02-21 11:40',
            },
            {
              id: 'msg2',
              author: 'Rohit Singh',
              role: 'Client',
              content: 'Please prioritize the disputes dashboard in this sprint.',
              at: '2026-02-21 12:15',
            },
          ],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: TechCorp Inc.',
            meta: '2025-12-18',
          },
          {
            id: 'a2',
            title: 'Escrow funded – Milestones 1-3',
            subtitle: '₹2,30,000 secured in escrow',
            meta: '2025-12-22',
          },
          {
            id: 'a3',
            title: 'Milestone 2 approved',
            subtitle: 'Design system locked in',
            meta: '2026-01-28',
          },
        ],
      },
      {
        id: 'p2',
        name: 'AI-powered Candidate Matching Engine',
        client: 'BrightPath Learning Solutions',
        freelancer: 'Rahul Verma',
        totalBudget: 750000,
        currency: '₹',
        status: 'Disputed',
        progressPercent: 54,
        milestonesCompleted: 2,
        milestonesTotal: 5,
        escrow: {
          total: 500000,
          released: 150000,
          pending: 260000,
          onHold: 90000,
        },
        dispute: {
          reason: 'Delay in delivering ML integration milestone',
          raisedBy: 'Client',
          openedOn: '2026-02-05',
          summary:
            'Client reports repeated slippages on agreed milestone dates and incomplete integration tests.',
          evidence: [
            'Screenshots of failing test cases.',
            'Chat logs where new dates were negotiated.',
            'Email confirming revised deadline.',
          ],
        },
        risk: {
          freelancerDisputeRate: 'Medium',
          clientDisputes: 2,
          delayedMilestones: 2,
        },
        performance: {
          averageApprovalTime: '4.8 days',
          onTimeDeliveryRate: '71%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Requirement finalisation and data schema',
            amount: 120000,
            status: 'Released',
            dueDate: '2026-01-10',
          },
          {
            id: 'm2',
            title: 'Baseline matching algorithm and dashboard',
            amount: 130000,
            status: 'Released',
            dueDate: '2026-01-25',
          },
          {
            id: 'm3',
            title: 'ML model integration with feedback loop',
            amount: 120000,
            status: 'Disputed',
            dueDate: '2026-02-10',
          },
          {
            id: 'm4',
            title: 'Performance optimisation and A/B testing',
            amount: 140000,
            status: 'Pending',
            dueDate: '2026-02-28',
          },
          {
            id: 'm5',
            title: 'Final deployment and documentation',
            amount: 240000,
            status: 'Pending',
            dueDate: '2026-03-20',
          },
        ],
        summary: {
          description:
            'End-to-end ML-powered matching engine to rank candidates on SkillPort based on skills, activity and performance.',
          scopeOfWork: [
            'Ingest SkillPort profile and activity data.',
            'Prototype ranking and explainability dashboards.',
            'Implement feedback-based learning loop.',
          ],
          requiredSkills: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
          contractTerms: {
            billingType: 'Milestone-based with bonus',
            revisionRounds: 'Unlimited within 30 days of go-live',
            cancellationPolicy: 'Escrow-based with dispute resolution',
          },
          timeline: {
            startDate: '2026-01-02',
            endDate: '2026-04-05',
          },
        },
        communication: {
          lastMessageAt: '2026-02-19',
          unreadCount: 6,
          previewMessages: [
            {
              id: 'msg1',
              author: 'Dispute Team',
              role: 'Admin',
              content:
                'Requested both parties to upload detailed milestone-wise evidence.',
              at: '2026-02-19 15:05',
            },
          ],
        },
        disputesHistory: [
          {
            id: 'd1',
            title: 'Escrow hold on ML milestone',
            subtitle: 'Admin placed partial hold on payment',
            meta: '2026-02-08',
          },
        ],
        activityTimeline: [
          {
            id: 'a1',
            title: 'Project created',
            subtitle: 'Client: BrightPath Learning Solutions',
            meta: '2026-01-02',
          },
          {
            id: 'a2',
            title: 'Dispute opened on milestone 3',
            subtitle: 'Escrow put on hold pending review',
            meta: '2026-02-05',
          },
        ],
      },
      {
        id: 'p3',
        name: 'Brand and Design System for Startup Collective',
        client: 'UrbanWorks Studio',
        freelancer: 'Priya Nair',
        totalBudget: 280000,
        currency: '₹',
        status: 'Completed',
        progressPercent: 100,
        milestonesCompleted: 4,
        milestonesTotal: 4,
        escrow: {
          total: 280000,
          released: 280000,
          pending: 0,
          onHold: 0,
        },
        dispute: null,
        risk: {
          freelancerDisputeRate: 'Low',
          clientDisputes: 0,
          delayedMilestones: 0,
        },
        performance: {
          averageApprovalTime: '1.8 days',
          onTimeDeliveryRate: '100%',
        },
        milestones: [
          {
            id: 'm1',
            title: 'Discovery workshop and brand audit',
            amount: 60000,
            status: 'Released',
            dueDate: '2025-10-10',
          },
          {
            id: 'm2',
            title: 'Visual identity exploration',
            amount: 70000,
            status: 'Released',
            dueDate: '2025-10-25',
          },
          {
            id: 'm3',
            title: 'Component library and tokens',
            amount: 80000,
            status: 'Released',
            dueDate: '2025-11-10',
          },
          {
            id: 'm4',
            title: 'Handover, guidelines and QA',
            amount: 70000,
            status: 'Released',
            dueDate: '2025-11-25',
          },
        ],
        summary: {
          description:
            'Visual identity and design system for new SkillPort-aligned recruitment tools.',
          scopeOfWork: [
            'Brand positioning and tone of voice.',
            'UI library for marketing and product surfaces.',
          ],
          requiredSkills: ['Figma', 'Design Systems', 'Branding'],
          contractTerms: {
            billingType: 'Fixed price',
            revisionRounds: '2 per milestone',
            cancellationPolicy: 'Non-refundable once design is approved',
          },
          timeline: {
            startDate: '2025-09-25',
            endDate: '2025-11-30',
          },
        },
        communication: {
          lastMessageAt: '2025-11-30',
          unreadCount: 0,
          previewMessages: [],
        },
        disputesHistory: [],
        activityTimeline: [
          {
            id: 'a1',
            title: 'All milestones approved',
            subtitle: 'Final brand pack delivered',
            meta: '2025-11-28',
          },
        ],
      },
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      if (term) {
        const matchesSearch =
          project.name.toLowerCase().includes(term) ||
          project.client.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }

      if (filters.status !== 'All' && project.status !== filters.status) {
        return false;
      }

      if (filters.freelancer !== 'All' && project.freelancer !== filters.freelancer) {
        return false;
      }

      if (filters.client !== 'All' && project.client !== filters.client) {
        return false;
      }

      if (filters.budgetMin) {
        const value = Number(filters.budgetMin);
        if (!Number.isNaN(value) && project.totalBudget < value) {
          return false;
        }
      }

      if (filters.budgetMax) {
        const value = Number(filters.budgetMax);
        if (!Number.isNaN(value) && project.totalBudget > value) {
          return false;
        }
      }

      if (filters.escrowMin) {
        const value = Number(filters.escrowMin);
        if (!Number.isNaN(value) && project.escrow.total < value) {
          return false;
        }
      }

      if (filters.escrowMax) {
        const value = Number(filters.escrowMax);
        if (!Number.isNaN(value) && project.escrow.total > value) {
          return false;
        }
      }

      if (filters.progressMin) {
        const value = Number(filters.progressMin);
        if (!Number.isNaN(value) && project.progressPercent < value) {
          return false;
        }
      }

      if (filters.progressMax) {
        const value = Number(filters.progressMax);
        if (!Number.isNaN(value) && project.progressPercent > value) {
          return false;
        }
      }

      return true;
    });
  }, [projects, searchTerm, filters]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter((project) => project.status === 'Active').length;
    const disputed = projects.filter(
      (project) => project.status === 'Disputed',
    ).length;
    const escrowTotal = projects.reduce(
      (sum, project) => sum + project.escrow.total,
      0,
    );

    return {
      total,
      active,
      disputed,
      escrowTotal,
    };
  }, [projects]);

  const allSelected =
    filteredProjects.length > 0 &&
    filteredProjects.every((project) => selectedProjectIds.includes(project.id));

  const appliedFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'All') count += 1;
    if (filters.freelancer !== 'All') count += 1;
    if (filters.client !== 'All') count += 1;
    if (filters.budgetMin || filters.budgetMax) count += 1;
    if (filters.escrowMin || filters.escrowMax) count += 1;
    if (filters.progressMin || filters.progressMax) count += 1;
    return count;
  }, [filters]);

  const handleToggleProjectSelect = (projectId) => {
    setSelectedProjectIds((previous) =>
      previous.includes(projectId)
        ? previous.filter((id) => id !== projectId)
        : [...previous, projectId],
    );
  };

  const handleToggleAll = () => {
    setSelectedProjectIds((previous) => {
      if (allSelected) {
        const visibleIds = new Set(filteredProjects.map((project) => project.id));
        return previous.filter((id) => !visibleIds.has(id));
      }

      const idsToAdd = filteredProjects
        .map((project) => project.id)
        .filter((id) => !previous.includes(id));

      return [...previous, ...idsToAdd];
    });
  };

  const handleClearSelection = () => {
    setSelectedProjectIds([]);
  };

  const openForProject = (project, setter) => {
    setActiveProject(project);
    setter(true);
  };

  const totalProjectsInView = filteredProjects.length;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div ref={headerRef}>
            <h1 className="text-3xl font-bold text-slate-900">
              Freelance Projects
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor freelance projects, escrow, milestones, and disputes across SkillPort.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-700">
              <AlertTriangle className="h-3 w-3" />
              <span>{stats.disputed} disputed project(s)</span>
            </div>
            <button
              type="button"
              ref={exportButtonRef}
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              <span>Export Projects</span>
            </button>
          </div>
        </header>

        <div
          ref={statsCardsRef}
          className="grid gap-4 md:grid-cols-4"
        >
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total Projects
              </div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {stats.total}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <Briefcase className="h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                Active Projects
              </div>
              <div className="mt-1 text-xl font-semibold text-emerald-900">
                {stats.active}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <User className="h-4 w-4 text-emerald-600" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                Amount In Escrow
              </div>
              <div className="mt-1 text-xl font-semibold text-sky-900">
                ₹{stats.escrowTotal.toLocaleString()}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <Wallet className="h-4 w-4 text-sky-600" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                Disputed Projects
              </div>
              <div className="mt-1 text-xl font-semibold text-rose-900">
                {stats.disputed}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
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
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects by name or client"
                className="h-10 w-full rounded-full border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FilterIcon className="h-4 w-4 text-slate-500" />
              <span>Filters</span>
              <span className="ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                {appliedFilterCount}
              </span>
            </button>
          </div>
        </div>

        <FreelanceTable
          projects={filteredProjects}
          totalCount={projects.length}
          selectedProjectIds={selectedProjectIds}
          allSelected={allSelected}
          onToggleAll={handleToggleAll}
          onToggleProjectSelect={handleToggleProjectSelect}
          onClearSelection={handleClearSelection}
          onViewDetails={(project) => openForProject(project, setIsDetailsOpen)}
          onViewMilestones={(project) =>
            openForProject(project, setIsMilestonesOpen)
          }
          onViewEscrow={(project) => openForProject(project, setIsEscrowOpen)}
          onResolveDispute={(project) =>
            openForProject(project, setIsDisputeOpen)
          }
          onPaymentOverride={(project) =>
            openForProject(project, setIsPaymentOverrideOpen)
          }
          onAddAdminNote={(project) =>
            openForProject(project, setIsAdminNoteOpen)
          }
          onViewTimeline={(project) =>
            openForProject(project, setIsTimelineOpen)
          }
          onViewChat={(project) => openForProject(project, setIsChatOpen)}
        />

        <FreelanceExportData
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          projects={filteredProjects}
          totalProjects={totalProjectsInView}
        />

        <FreelanceFilter
          isOpen={isFilterOpen}
          selectedFilters={filters}
          onChange={setFilters}
          onClose={() => setIsFilterOpen(false)}
        />

        <ProjectDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          project={activeProject}
        />
        <MilestonesModal
          isOpen={isMilestonesOpen}
          onClose={() => setIsMilestonesOpen(false)}
          project={activeProject}
        />
        <EscrowBreakdownModal
          isOpen={isEscrowOpen}
          onClose={() => setIsEscrowOpen(false)}
          project={activeProject}
        />
        <DisputeResolutionModal
          isOpen={isDisputeOpen}
          onClose={() => setIsDisputeOpen(false)}
          project={activeProject}
        />
        <PaymentOverrideModal
          isOpen={isPaymentOverrideOpen}
          onClose={() => setIsPaymentOverrideOpen(false)}
          project={activeProject}
        />
        <AdminNoteModal
          isOpen={isAdminNoteOpen}
          onClose={() => setIsAdminNoteOpen(false)}
          project={activeProject}
        />
        <ProjectActivityTimelineModal
          isOpen={isTimelineOpen}
          onClose={() => setIsTimelineOpen(false)}
          project={activeProject}
        />
        <ProjectChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          project={activeProject}
        />
      </div>
    </div>
  );
};

export default Freelancer;
