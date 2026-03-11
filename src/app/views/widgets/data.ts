import { currency, currentYear } from '@/app/common/constants'
import type { UserType } from '@views/apps/todo/data'

export type ProjectType = {
  project: string
  client: string
  team: string[]
  deadline: string
  progressValue: number
  progressType: string
}

export type TransactionType = {
  id: string
  date: string
  amount: string
  status: string
  description: string
}

export type FriendRequestType = {
  profile: string
  name: string
  mutual: number
}

export type ScheduleType = {
  time: string
  title: string
  type: string
  duration: string
}

export type StateType = {
  icon: string
  iconColor: string
  title: string
  amount: string
  badge: string
  badgeColor: string
}



export const stat3Data: StateType[] = [
  {
    title: 'Campaign Sent',
    icon: 'solar:leaf-bold-duotone',
    amount: '13, 647',
    badge: '2.3%',
    badgeColor: 'success',
    iconColor:"primary",
  },
  {
    title: 'New Leads',
    icon: 'solar:cpu-bolt-line-duotone',
    amount: '9, 526',
    badge: '8.1%',
    badgeColor: 'success',
    iconColor:"secondary",

  },
  {
    title: 'Deals',
    icon: 'solar:layers-bold-duotone',
    amount: '976',
    badge: '0.3%',
    badgeColor: 'danger',
    iconColor:"success",
  },
  {
    title: 'Booked Revenue',
    icon: 'solar:shield-bold-duotone',
    amount: `${currency}123.6k`,
    badge: '10.6%',
    badgeColor: 'danger',
    iconColor:"info"
  },
]


export const RecentProject: ProjectType[] = [
  {
    project: 'Zelogy',
    client: 'Daniel Olsen',
    team: [
      'assets/images/users/avatar-2.jpg',
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-4.jpg',
    ],
    deadline: '12 April ' + currentYear,
    progressValue: 33,
    progressType: 'primary',
  },
  {
    project: 'Shiaz',
    client: 'Jack Roldan',
    team: [
      'assets/images/users/avatar-1.jpg',
      'assets/images/users/avatar-5.jpg',
    ],
    deadline: '10 April ' + currentYear,
    progressValue: 74,
    progressType: 'success',
  },
  {
    project: 'Holderick',
    client: 'Betty Cox',
    team: [
      'assets/images/users/avatar-5.jpg',
      'assets/images/users/avatar-2.jpg',
      'assets/images/users/avatar-3.jpg',
    ],
    deadline: '31 March ' + currentYear,
    progressValue: 50,
    progressType: 'warning',
  },
  {
    project: 'Feyvux',
    client: 'Carlos Johnson',
    team: [
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-7.jpg',
      'assets/images/users/avatar-6.jpg',
    ],
    deadline: '25 March ' + currentYear,
    progressValue: 92,
    progressType: 'primary',
  },
  {
    project: 'Xavlox',
    client: 'Lorraine Cox',
    team: ['assets/images/users/avatar-7.jpg'],
    deadline: '22 March ' + currentYear,
    progressValue: 48,
    progressType: 'danger',
  },
  {
    project: 'Mozacav',
    client: 'Delores Young',
    team: [
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-4.jpg',
      'assets/images/users/avatar-2.jpg',
    ],
    deadline: '15 March ' + currentYear,
    progressValue: 21,
    progressType: 'primary',
  },
]

export const ScheduleData: ScheduleType[] = [
  {
    time: '09:00',
    title: 'Setup Github Repository',
    type: 'primary',
    duration: '09:00 - 10:00',
  },
  {
    time: '10:00',
    title: 'Design Review - Reback Admin',
    type: 'success',
    duration: '10:00 - 10:30',
  },
  {
    time: '11:00',
    title: 'Meeting with BD Team',
    type: 'info',
    duration: '11:00 - 12:30',
  },
  {
    time: '01:00',
    title: 'Meeting with Design Studio',
    type: 'warning',
    duration: '01:00 - 02:00',
  },
]

export const State2Data: StateType[] = [
  {
    icon: 'bx-layer',
    iconColor: 'primary',
    title: 'Campaign Sent',
    amount: '13, 647',
    badge: '2.3',
    badgeColor: 'success',
  },
  {
    icon: 'bx-award',
    iconColor: 'success',
    title: 'New Leads',
    amount: '9, 526',
    badge: '8.1',
    badgeColor: 'success',
  },
  {
    icon: 'bxs-backpack',
    iconColor: 'danger',
    title: 'Deals',
    amount: '976',
    badge: '0.3',
    badgeColor: 'danger',
  },
  {
    icon: 'bx-dollar-circle',
    iconColor: 'warning',
    title: 'Booked Revenue',
    amount: '$123',
    badge: '10.6',
    badgeColor: 'danger',
  },
]

export const FriendRequest: FriendRequestType[] = [
  {
    profile: 'assets/images/users/avatar-5.jpg',
    name: 'Victoria P. Miller',
    mutual: 0,
  },
  {
    profile: 'assets/images/users/avatar-6.jpg',
    name: 'Dallas C. Payne',
    mutual: 856,
  },
  {
    profile: 'assets/images/users/avatar-7.jpg',
    name: 'Florence A. Lopez',
    mutual: 52,
  },
  {
    profile: 'assets/images/users/avatar-8.jpg',
    name: 'Gail A. Nix',
    mutual: 12,
  },
  {
    profile: 'assets/images/users/avatar-9.jpg',
    name: 'Lynne J. Petty',
    mutual: 0,
  },
  {
    profile: 'assets/images/users/avatar-5.jpg',
    name: 'Victoria P. Miller',
    mutual: 0,
  },
  {
    profile: 'assets/images/users/avatar-6.jpg',
    name: 'Dallas C. Payne',
    mutual: 856,
  },
  {
    profile: 'assets/images/users/avatar-7.jpg',
    name: 'Florence A. Lopez',
    mutual: 52,
  },
  {
    profile: 'assets/images/users/avatar-8.jpg',
    name: 'Gail A. Nix',
    mutual: 12,
  },
  {
    profile: 'assets/images/users/avatar-9.jpg',
    name: 'Lynne J. Petty',
    mutual: 0,
  },
]


export const TransactionsList: TransactionType[] = [
  {
    id: '#98521',
    date: '24 April, ' + currentYear,
    amount: '120.55',
    status: 'Cr',
    description: 'Commisions',
  },
  {
    id: '#20158',
    date: '24 April, ' + currentYear,
    amount: '9.68',
    status: 'Cr',
    description: 'Affiliates',
  },
  {
    id: '#36589',
    date: '20 April, ' + currentYear,
    amount: '105.22',
    status: 'Dr',
    description: 'Grocery',
  },
  {
    id: '#95362',
    date: '18 April, ' + currentYear,
    amount: '80.59',
    status: 'Cr',
    description: 'Refunds',
  },
  {
    id: '#75214',
    date: '18 April, ' + currentYear,
    amount: '750.95',
    status: 'Dr',
    description: 'Bill Payments',
  },

  {
    id: '#75215',
    date: '17 April, ' + currentYear,
    amount: '455.62',
    status: 'Dr',
    description: 'Electricity',
  },
  {
    id: '#75216',
    date: '17 April, ' + currentYear,
    amount: '102.77',
    status: 'Cr',
    description: 'Interest',
  },
  {
    id: '#75217',
    date: '16 April, ' + currentYear,
    amount: '79.49',
    status: 'Cr',
    description: 'Refunds',
  },
  {
    id: '#75218',
    date: '05 April, ' + currentYear,
    amount: '980.00',
    status: 'Dr',
    description: 'Shopping',
  },
]

export type TodoType = {
  task_name: string
  create_date: string
  time: string
  due_date: string
  assigned: UserType
  status: string
  priority: string
  checked: boolean
}

export const TodoData: TodoType[] = [
  {
    task_name: 'Review system logs for any reported errors',
    create_date: '23 April, ' + currentYear,
    time: '05:09 PM',
    due_date: '30 April, ' + currentYear,
    assigned: {
      name: 'Sean Kemper',
      avatar: 'assets/images/users/avatar-2.jpg',
    },
    status: 'In-progress',
    priority: 'High',
    checked: false,
  },
  {
    task_name: 'Conduct user testing to identify potential bugs',
    create_date: '14 May, ' + currentYear,
    time: '10:51 AM',
    due_date: '25 Aug, ' + currentYear,
    assigned: {
      name: 'Victoria Sullivan',
      avatar: 'assets/images/users/avatar-3.jpg',
    },
    status: 'Pending',
    priority: 'Low',
    checked: true,
  },
  {
    task_name: 'Gather feedback from stakeholders regarding any issues',
    create_date: '12 April, ' + currentYear,
    time: '12:09 PM',
    due_date: '28 April, ' + currentYear,
    assigned: {
      name: 'Liam Martinez',
      avatar: 'assets/images/users/avatar-4.jpg',
    },
    status: 'In-progress',
    priority: 'High',
    checked: false,
  },
  {
    task_name: 'Prioritize bugs based on severity and impact',
    create_date: '10 April, ' + currentYear,
    time: '10:09 PM',
    due_date: '15 April, ' + currentYear,
    assigned: {
      name: 'Emma Johnson',
      avatar: 'assets/images/users/avatar-5.jpg',
    },
    status: 'Completed',
    priority: 'Medium',
    checked: false,
  },
  {
    task_name: 'Investigate and analyze the root cause of each bug',
    create_date: '22 May, ' + currentYear,
    time: '03:41 PM',
    due_date: '05 July, ' + currentYear,
    assigned: {
      name: 'Olivia Thompson',
      avatar: 'assets/images/users/avatar-1.jpg',
    },
    status: 'Pending',
    priority: 'Low',
    checked: false,
  },
  {
    task_name: 'Develop and implement fixes for the identified bugs',
    create_date: '18 May, ' + currentYear,
    time: '09:09 AM',
    due_date: '30 April, ' + currentYear,
    assigned: {
      name: 'Noah Garcia',
      avatar: 'assets/images/users/avatar-6.jpg',
    },
    status: 'Completed',
    priority: 'Low',
    checked: false,
  },
  {
    task_name: 'Complete any recurring tasks',
    create_date: '05 April, ' + currentYear,
    time: '08:50 AM',
    due_date: '22 April, ' + currentYear,
    assigned: {
      name: 'Sophia Davis',
      avatar: 'assets/images/users/avatar-7.jpg',
    },
    status: 'New',
    priority: 'High',
    checked: false,
  },
  {
    task_name: 'Check emails and respond',
    create_date: '15 Jun, ' + currentYear,
    time: '11:09 PM',
    due_date: '01 Aug, ' + currentYear,
    assigned: {
      name: 'Isabella Lopez',
      avatar: 'assets/images/users/avatar-8.jpg',
    },
    status: 'Pending',
    priority: 'Low',
    checked: false,
  },
  {
    task_name: 'Review schedule for the day',
    create_date: '22 April, ' + currentYear,
    time: '05:09 PM',
    due_date: '30 April, ' + currentYear,
    assigned: {
      name: 'Ava Wilson',
      avatar: 'assets/images/users/avatar-9.jpg',
    },
    status: 'In-progress',
    priority: 'Medium',
    checked: true,
  },
  {
    task_name: 'Daily stand-up meeting',
    create_date: '23 April, ' + currentYear,
    time: '12:09 PM',
    due_date: '30 April, ' + currentYear,
    assigned: {
      name: 'Oliver Lee',
      avatar: 'assets/images/users/avatar-10.jpg',
    },
    status: 'In-progress',
    priority: 'High',
    checked: false,
  },
]


