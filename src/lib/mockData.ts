export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  experience: string;
  category: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  postedDate: string;
  deadline: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isVerified: boolean;
  isFeatured: boolean;
  matchPercent?: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Sent' | 'Hired' | 'Rejected';
  lastUpdated: string;
  timeline: {
    stage: string;
    date: string;
    note?: string;
    completed: boolean;
    active: boolean;
  }[];
}

export interface Notification {
  id: string;
  type: 'job' | 'application' | 'interview' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  company?: string;
}

export const mockJobs: Job[] = [
  {
    id: 'job-001',
    title: 'Senior Frontend Developer',
    company: 'VNG Corporation',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '40 - 65 triệu VNĐ',
    salaryMin: 40000000,
    salaryMax: 65000000,
    workMode: 'Hybrid',
    experience: '3-5 năm',
    category: 'Software Development',
    employmentType: 'Full-time',
    postedDate: '2026-08-22',
    deadline: '2026-09-22',
    skills: ['React', 'TypeScript', 'Node.js', 'Redux', 'AWS'],
    isVerified: true,
    isFeatured: true,
    matchPercent: 92,
    description: 'VNG Corporation đang tìm kiếm Senior Frontend Developer có kinh nghiệm xây dựng các ứng dụng web hiệu suất cao.',
    responsibilities: [
      'Phát triển và duy trì các ứng dụng web sử dụng React/TypeScript',
      'Cộng tác với team Backend và Design',
      'Tối ưu hiệu suất ứng dụng',
      'Mentor các developer junior',
    ],
    requirements: [
      'Tối thiểu 3 năm kinh nghiệm với React',
      'Thành thạo TypeScript và ES6+',
      'Hiểu biết về RESTful APIs',
      'Kinh nghiệm với Git và CI/CD',
    ],
    benefits: [
      'Lương thưởng cạnh tranh',
      'Bảo hiểm sức khỏe toàn diện',
      'Làm việc hybrid linh hoạt',
      'Ngân sách học tập hàng năm',
    ],
  },
  {
    id: 'job-002',
    title: 'Full Stack Developer',
    company: 'Tiki Corporation',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '35 - 55 triệu VNĐ',
    salaryMin: 35000000,
    salaryMax: 55000000,
    workMode: 'On-site',
    experience: '2-4 năm',
    category: 'Software Development',
    employmentType: 'Full-time',
    postedDate: '2026-08-21',
    deadline: '2026-09-15',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    isVerified: true,
    isFeatured: true,
    matchPercent: 89,
    description: 'Tiki đang mở rộng team Engineering và cần Full Stack Developer tài năng.',
    responsibilities: [
      'Xây dựng tính năng mới cho nền tảng e-commerce',
      'Thiết kế và triển khai RESTful APIs',
      'Viết unit test và integration test',
    ],
    requirements: [
      'Kinh nghiệm với React và Node.js',
      'Hiểu biết về database relational',
      'Kỹ năng giải quyết vấn đề tốt',
    ],
    benefits: [
      'Cổ phiếu công ty',
      'Bữa trưa miễn phí',
      'Gym membership',
    ],
  },
  {
    id: 'job-003',
    title: 'UI/UX Designer',
    company: 'Shopee Vietnam',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '25 - 45 triệu VNĐ',
    salaryMin: 25000000,
    salaryMax: 45000000,
    workMode: 'Hybrid',
    experience: '2-3 năm',
    category: 'Design',
    employmentType: 'Full-time',
    postedDate: '2026-08-20',
    deadline: '2026-09-20',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    isVerified: true,
    isFeatured: true,
    matchPercent: 84,
    description: 'Shopee Vietnam tìm kiếm UI/UX Designer sáng tạo để nâng cao trải nghiệm người dùng.',
    responsibilities: [
      'Thiết kế giao diện người dùng cho app mobile và web',
      'Thực hiện user research và usability testing',
      'Xây dựng và duy trì design system',
    ],
    requirements: [
      'Portfolio mạnh với dự án UX thực tế',
      'Thành thạo Figma',
      'Hiểu biết về accessibility',
    ],
    benefits: ['Môi trường làm việc năng động', 'Cơ hội phát triển nhanh'],
  },
  {
    id: 'job-004',
    title: 'Product Manager',
    company: 'MoMo',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '45 - 80 triệu VNĐ',
    salaryMin: 45000000,
    salaryMax: 80000000,
    workMode: 'On-site',
    experience: '4-6 năm',
    category: 'Software Development',
    employmentType: 'Full-time',
    postedDate: '2026-08-19',
    deadline: '2026-09-10',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'SQL'],
    isVerified: true,
    isFeatured: false,
    matchPercent: 76,
    description: 'MoMo tìm kiếm Product Manager có kinh nghiệm trong lĩnh vực fintech.',
    responsibilities: [
      'Định nghĩa roadmap sản phẩm',
      'Làm việc với engineering và design teams',
      'Phân tích dữ liệu để ra quyết định',
    ],
    requirements: [
      'Kinh nghiệm PM trong fintech hoặc e-commerce',
      'Kỹ năng phân tích dữ liệu',
      'Tiếng Anh tốt',
    ],
    benefits: ['Lương thưởng top-tier', 'Cổ phiếu', 'Bảo hiểm toàn diện'],
  },
  {
    id: 'job-005',
    title: 'Backend Engineer (Python)',
    company: 'Grab Vietnam',
    companyLogo: '',
    location: 'Hà Nội',
    salary: '38 - 60 triệu VNĐ',
    salaryMin: 38000000,
    salaryMax: 60000000,
    workMode: 'Remote',
    experience: '3-5 năm',
    category: 'Software Development',
    employmentType: 'Full-time',
    postedDate: '2026-08-18',
    deadline: '2026-09-18',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Kubernetes'],
    isVerified: true,
    isFeatured: false,
    matchPercent: 81,
    description: 'Grab Vietnam cần Backend Engineer Python để xây dựng hệ thống microservices.',
    responsibilities: [
      'Phát triển và duy trì microservices',
      'Tối ưu database queries',
      'Thiết kế API scalable',
    ],
    requirements: [
      'Thành thạo Python',
      'Kinh nghiệm với microservices architecture',
      'Hiểu biết về distributed systems',
    ],
    benefits: ['Fully remote', 'Stock options', 'Learning budget'],
  },
  {
    id: 'job-006',
    title: 'Data Analyst',
    company: 'Lazada Vietnam',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '20 - 35 triệu VNĐ',
    salaryMin: 20000000,
    salaryMax: 35000000,
    workMode: 'Hybrid',
    experience: '1-3 năm',
    category: 'Finance',
    employmentType: 'Full-time',
    postedDate: '2026-08-17',
    deadline: '2026-09-05',
    skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics'],
    isVerified: true,
    isFeatured: false,
    matchPercent: 71,
    description: 'Lazada Vietnam tìm Data Analyst để phân tích dữ liệu kinh doanh.',
    responsibilities: [
      'Phân tích dữ liệu bán hàng và hành vi người dùng',
      'Xây dựng dashboard báo cáo',
      'Hỗ trợ ra quyết định dựa trên dữ liệu',
    ],
    requirements: [
      'Thành thạo SQL',
      'Kinh nghiệm với BI tools',
      'Kỹ năng trình bày tốt',
    ],
    benefits: ['Cơ hội học hỏi', 'Môi trường quốc tế'],
  },
  {
    id: 'job-007',
    title: 'DevOps Engineer',
    company: 'FPT Software',
    companyLogo: '',
    location: 'Hà Nội',
    salary: '30 - 50 triệu VNĐ',
    salaryMin: 30000000,
    salaryMax: 50000000,
    workMode: 'On-site',
    experience: '2-4 năm',
    category: 'Engineering',
    employmentType: 'Full-time',
    postedDate: '2026-08-16',
    deadline: '2026-09-12',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    isVerified: true,
    isFeatured: false,
    matchPercent: 68,
    description: 'FPT Software cần DevOps Engineer để quản lý infrastructure và CI/CD pipelines.',
    responsibilities: [
      'Quản lý và tối ưu cloud infrastructure',
      'Xây dựng CI/CD pipelines',
      'Đảm bảo uptime và security',
    ],
    requirements: [
      'Kinh nghiệm với AWS hoặc GCP',
      'Thành thạo Kubernetes',
      'Hiểu biết về security best practices',
    ],
    benefits: ['Training budget', 'Certification support'],
  },
  {
    id: 'job-008',
    title: 'React Native Developer',
    company: 'ZaloPay',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '35 - 55 triệu VNĐ',
    salaryMin: 35000000,
    salaryMax: 55000000,
    workMode: 'Hybrid',
    experience: '2-4 năm',
    category: 'Software Development',
    employmentType: 'Full-time',
    postedDate: '2026-08-15',
    deadline: '2026-09-08',
    skills: ['React Native', 'TypeScript', 'Redux', 'iOS', 'Android'],
    isVerified: true,
    isFeatured: false,
    matchPercent: 87,
    description: 'ZaloPay cần React Native Developer để phát triển ứng dụng thanh toán di động.',
    responsibilities: [
      'Phát triển tính năng mới cho app ZaloPay',
      'Tối ưu performance trên iOS và Android',
      'Code review và mentoring',
    ],
    requirements: [
      'Kinh nghiệm React Native ít nhất 2 năm',
      'Hiểu biết về native modules',
      'Kinh nghiệm với payment systems là lợi thế',
    ],
    benefits: ['Competitive salary', 'Stock options', 'Health insurance'],
  },
  {
    id: 'job-009',
    title: 'Marketing Manager',
    company: 'Sendo',
    companyLogo: '',
    location: 'Hà Nội',
    salary: '25 - 40 triệu VNĐ',
    salaryMin: 25000000,
    salaryMax: 40000000,
    workMode: 'On-site',
    experience: '3-5 năm',
    category: 'Marketing',
    employmentType: 'Full-time',
    postedDate: '2026-08-14',
    deadline: '2026-08-31',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    isVerified: false,
    isFeatured: false,
    matchPercent: 55,
    description: 'Sendo cần Marketing Manager để lãnh đạo chiến lược marketing số.',
    responsibilities: [
      'Lên kế hoạch và thực thi chiến dịch marketing',
      'Quản lý ngân sách marketing',
      'Phân tích hiệu quả các kênh marketing',
    ],
    requirements: [
      'Kinh nghiệm digital marketing',
      'Kỹ năng phân tích dữ liệu',
      'Tiếng Anh tốt',
    ],
    benefits: ['Môi trường startup năng động'],
  },
  {
    id: 'job-010',
    title: 'HR Business Partner',
    company: 'Vingroup',
    companyLogo: '',
    location: 'Hà Nội',
    salary: '20 - 35 triệu VNĐ',
    salaryMin: 20000000,
    salaryMax: 35000000,
    workMode: 'On-site',
    experience: '3-5 năm',
    category: 'Human Resources',
    employmentType: 'Full-time',
    postedDate: '2026-08-13',
    deadline: '2026-09-01',
    skills: ['HR Management', 'Recruitment', 'Labor Law', 'HRIS'],
    isVerified: true,
    isFeatured: false,
    matchPercent: 48,
    description: 'Vingroup cần HR Business Partner để hỗ trợ các đơn vị kinh doanh.',
    responsibilities: [
      'Tư vấn và hỗ trợ managers về HR',
      'Quản lý tuyển dụng và onboarding',
      'Phát triển chính sách nhân sự',
    ],
    requirements: [
      'Kinh nghiệm HR generalist',
      'Hiểu biết về luật lao động Việt Nam',
      'Kỹ năng giao tiếp xuất sắc',
    ],
    benefits: ['Benefits package tốt', 'Môi trường tập đoàn lớn'],
  },
];

export const mockApplications: Application[] = [
  {
    id: 'app-001',
    jobId: 'job-001',
    jobTitle: 'Senior Frontend Developer',
    company: 'VNG Corporation',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '40 - 65 triệu VNĐ',
    appliedDate: '2026-08-10',
    status: 'Interview Scheduled',
    lastUpdated: '2026-08-20',
    timeline: [
      { stage: 'Applied', date: '2026-08-10', completed: true, active: false },
      { stage: 'Under Review', date: '2026-08-13', completed: true, active: false },
      { stage: 'Shortlisted', date: '2026-08-16', completed: true, active: false },
      { stage: 'Interview Scheduled', date: '2026-08-20', note: 'Phỏng vấn kỹ thuật ngày 28/08/2026, 14:00', completed: true, active: true },
      { stage: 'Offer Sent', date: '', completed: false, active: false },
      { stage: 'Hired', date: '', completed: false, active: false },
    ],
  },
  {
    id: 'app-002',
    jobId: 'job-002',
    jobTitle: 'Full Stack Developer',
    company: 'Tiki Corporation',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '35 - 55 triệu VNĐ',
    appliedDate: '2026-08-08',
    status: 'Under Review',
    lastUpdated: '2026-08-15',
    timeline: [
      { stage: 'Applied', date: '2026-08-08', completed: true, active: false },
      { stage: 'Under Review', date: '2026-08-15', completed: true, active: true },
      { stage: 'Shortlisted', date: '', completed: false, active: false },
      { stage: 'Interview Scheduled', date: '', completed: false, active: false },
      { stage: 'Offer Sent', date: '', completed: false, active: false },
      { stage: 'Hired', date: '', completed: false, active: false },
    ],
  },
  {
    id: 'app-003',
    jobId: 'job-003',
    jobTitle: 'UI/UX Designer',
    company: 'Shopee Vietnam',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '25 - 45 triệu VNĐ',
    appliedDate: '2026-08-05',
    status: 'Shortlisted',
    lastUpdated: '2026-08-18',
    timeline: [
      { stage: 'Applied', date: '2026-08-05', completed: true, active: false },
      { stage: 'Under Review', date: '2026-08-09', completed: true, active: false },
      { stage: 'Shortlisted', date: '2026-08-18', note: 'Hồ sơ của bạn đã được chọn vào vòng tiếp theo', completed: true, active: true },
      { stage: 'Interview Scheduled', date: '', completed: false, active: false },
      { stage: 'Offer Sent', date: '', completed: false, active: false },
      { stage: 'Hired', date: '', completed: false, active: false },
    ],
  },
  {
    id: 'app-004',
    jobId: 'job-005',
    jobTitle: 'Backend Engineer (Python)',
    company: 'Grab Vietnam',
    companyLogo: '',
    location: 'Hà Nội',
    salary: '38 - 60 triệu VNĐ',
    appliedDate: '2026-07-28',
    status: 'Rejected',
    lastUpdated: '2026-08-12',
    timeline: [
      { stage: 'Applied', date: '2026-07-28', completed: true, active: false },
      { stage: 'Under Review', date: '2026-08-02', completed: true, active: false },
      { stage: 'Rejected', date: '2026-08-12', note: 'Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ liên hệ lại khi có vị trí phù hợp.', completed: true, active: true },
    ],
  },
  {
    id: 'app-005',
    jobId: 'job-004',
    jobTitle: 'Product Manager',
    company: 'MoMo',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '45 - 80 triệu VNĐ',
    appliedDate: '2026-08-15',
    status: 'Applied',
    lastUpdated: '2026-08-15',
    timeline: [
      { stage: 'Applied', date: '2026-08-15', completed: true, active: true },
      { stage: 'Under Review', date: '', completed: false, active: false },
      { stage: 'Shortlisted', date: '', completed: false, active: false },
      { stage: 'Interview Scheduled', date: '', completed: false, active: false },
      { stage: 'Offer Sent', date: '', completed: false, active: false },
      { stage: 'Hired', date: '', completed: false, active: false },
    ],
  },
  {
    id: 'app-006',
    jobId: 'job-008',
    jobTitle: 'React Native Developer',
    company: 'ZaloPay',
    companyLogo: '',
    location: 'Hồ Chí Minh',
    salary: '35 - 55 triệu VNĐ',
    appliedDate: '2026-08-18',
    status: 'Offer Sent',
    lastUpdated: '2026-08-23',
    timeline: [
      { stage: 'Applied', date: '2026-08-18', completed: true, active: false },
      { stage: 'Under Review', date: '2026-08-19', completed: true, active: false },
      { stage: 'Shortlisted', date: '2026-08-20', completed: true, active: false },
      { stage: 'Interview Scheduled', date: '2026-08-21', completed: true, active: false },
      { stage: 'Offer Sent', date: '2026-08-23', note: 'Mức lương đề xuất: 50 triệu VNĐ/tháng', completed: true, active: true },
      { stage: 'Hired', date: '', completed: false, active: false },
    ],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'interview',
    title: 'Lịch phỏng vấn đã được xác nhận',
    message: 'VNG Corporation đã xác nhận lịch phỏng vấn kỹ thuật cho vị trí Senior Frontend Developer vào ngày 28/08/2026 lúc 14:00.',
    timestamp: '2026-08-20T10:30:00',
    isRead: false,
    company: 'VNG Corporation',
    actionUrl: '/my-applications',
  },
  {
    id: 'notif-002',
    type: 'application',
    title: 'Đơn ứng tuyển được chọn vào vòng tiếp theo',
    message: 'Chúc mừng! Hồ sơ của bạn cho vị trí UI/UX Designer tại Shopee Vietnam đã được shortlist.',
    timestamp: '2026-08-18T14:15:00',
    isRead: false,
    company: 'Shopee Vietnam',
    actionUrl: '/my-applications',
  },
  {
    id: 'notif-003',
    type: 'application',
    title: 'Offer letter từ ZaloPay',
    message: 'ZaloPay đã gửi offer letter cho vị trí React Native Developer. Vui lòng xem và phản hồi trước ngày 30/08/2026.',
    timestamp: '2026-08-23T09:00:00',
    isRead: false,
    company: 'ZaloPay',
    actionUrl: '/my-applications',
  },
  {
    id: 'notif-004',
    type: 'job',
    title: '5 việc làm mới phù hợp với hồ sơ của bạn',
    message: 'Có 5 cơ hội việc làm mới trong lĩnh vực Frontend Development tại Hồ Chí Minh phù hợp với kỹ năng của bạn.',
    timestamp: '2026-08-24T08:00:00',
    isRead: true,
    actionUrl: '/find-jobs-page',
  },
  {
    id: 'notif-005',
    type: 'system',
    title: 'Hoàn thiện hồ sơ để tăng cơ hội',
    message: 'Hồ sơ của bạn đang hoàn thiện được 85%. Thêm kinh nghiệm làm việc để tăng khả năng được nhà tuyển dụng chú ý.',
    timestamp: '2026-08-23T16:00:00',
    isRead: true,
    actionUrl: '/job-seeker-dashboard',
  },
];

export const jobCategories = [
  { id: 'cat-software', name: 'Software Development', icon: 'code', count: 2847 },
  { id: 'cat-design', name: 'Design', icon: 'palette', count: 634 },
  { id: 'cat-marketing', name: 'Marketing', icon: 'megaphone', count: 891 },
  { id: 'cat-sales', name: 'Sales', icon: 'trending-up', count: 1203 },
  { id: 'cat-finance', name: 'Finance', icon: 'bar-chart', count: 567 },
  { id: 'cat-hr', name: 'Human Resources', icon: 'users', count: 423 },
  { id: 'cat-engineering', name: 'Engineering', icon: 'settings', count: 789 },
  { id: 'cat-support', name: 'Customer Support', icon: 'headphones', count: 456 },
];

export const popularLocations = [
  { id: 'loc-hcm', name: 'Hồ Chí Minh', count: 4521 },
  { id: 'loc-hn', name: 'Hà Nội', count: 3214 },
  { id: 'loc-dn', name: 'Đà Nẵng', count: 876 },
  { id: 'loc-hp', name: 'Hải Phòng', count: 432 },
  { id: 'loc-ct', name: 'Cần Thơ', count: 287 },
  { id: 'loc-remote', name: 'Remote', count: 1245 },
];