import { currentYear } from '@/app/common/constants'

export type UserType = {
  name: string
  avatar: string
}

export type TodoType = {
  taskName: string
  createDate: string
  time: string
  dueDate: string
  assigned: UserType
  status: string
  priority: string
  checked: boolean
}

export const TodoData: TodoType[] = [
  {
    taskName: 'Review system logs for any reported errors',
    createDate: '23 April, ' + currentYear,
    time: '05:09 PM',
    dueDate: '30 April, ' + currentYear,
    assigned: {
      name: 'Sean Kemper',
      avatar: 'assets/images/users/avatar-2.jpg',
    },
    status: 'In-progress',
    priority: 'High',
    checked: false,
  },
  {
    taskName: 'Conduct user testing to identify potential bugs',
    createDate: '14 May, ' + currentYear,
    time: '10:51 AM',
    dueDate: '25 Aug, ' + currentYear,
    assigned: {
      name: 'Victoria Sullivan',
      avatar: 'assets/images/users/avatar-3.jpg',
    },
    status: 'Pending',
    priority: 'Low',
    checked: true,
  },
  {
    taskName: 'Gather feedback from stakeholders regarding any issues',
    createDate: '12 April, ' + currentYear,
    time: '12:09 PM',
    dueDate: '28 April, ' + currentYear,
    assigned: {
      name: 'Liam Martinez',
      avatar: 'assets/images/users/avatar-4.jpg',
    },
    status: 'In-progress',
    priority: 'High',
    checked: false,
  },
  {
    taskName: 'Prioritize bugs based on severity and impact',
    createDate: '10 April, ' + currentYear,
    time: '10:09 PM',
    dueDate: '15 April, ' + currentYear,
    assigned: {
      name: 'Emma Johnson',
      avatar: 'assets/images/users/avatar-5.jpg',
    },
    status: 'Completed',
    priority: 'Medium',
    checked: false,
  },
  {
    taskName: 'Investigate and analyze the root cause of each bug',
    createDate: '22 May, ' + currentYear,
    time: '03:41 PM',
    dueDate: '05 July, ' + currentYear,
    assigned: {
      name: 'Olivia Thompson',
      avatar: 'assets/images/users/avatar-1.jpg',
    },
    status: 'Pending',
    priority: 'Low',
    checked: false,
  },
  {
    taskName: 'Develop and implement fixes for the identified bugs',
    createDate: '18 May, ' + currentYear,
    time: '09:09 AM',
    dueDate: '30 April, ' + currentYear,
    assigned: {
      name: 'Noah Garcia',
      avatar: 'assets/images/users/avatar-6.jpg',
    },
    status: 'Completed',
    priority: 'Low',
    checked: false,
  },
  {
    taskName: 'Complete any recurring tasks',
    createDate: '05 April, ' + currentYear,
    time: '08:50 AM',
    dueDate: '22 April, ' + currentYear,
    assigned: {
      name: 'Sophia Davis',
      avatar: 'assets/images/users/avatar-7.jpg',
    },
    status: 'New',
    priority: 'High',
    checked: false,
  },
  {
    taskName: 'Check emails and respond',
    createDate: '15 Jun, ' + currentYear,
    time: '11:09 PM',
    dueDate: '01 Aug, ' + currentYear,
    assigned: {
      name: 'Isabella Lopez',
      avatar: 'assets/images/users/avatar-8.jpg',
    },
    status: 'Pending',
    priority: 'Low',
    checked: false,
  },
  {
    taskName: 'Review schedule for the day',
    createDate: '22 April, ' + currentYear,
    time: '05:09 PM',
    dueDate: '30 April, ' + currentYear,
    assigned: {
      name: 'Ava Wilson',
      avatar: 'assets/images/users/avatar-9.jpg',
    },
    status: 'In-progress',
    priority: 'Medium',
    checked: true,
  },
  {
    taskName: 'Daily stand-up meeting',
    createDate: '23 April, ' + currentYear,
    time: '12:09 PM',
    dueDate: '30 April, ' + currentYear,
    assigned: {
      name: 'Oliver Lee',
      avatar: 'assets/images/users/avatar-10.jpg',
    },
    status: 'In-progress',
    priority: 'High',
    checked: false,
  },
]
