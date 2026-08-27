export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
  image: string
  link: string
  accent: string
  private?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'KidsPhonics',
    description:
      'An interactive phonics learning app that helps young children learn letters, sounds, and early reading skills through fun games, guided lessons, progress tracking, and offline-friendly activities.',
    tags: ['Flutter', 'Dart', 'SQL'],
    year: '2024',
    image: 'KidsPhonics.jpg',
    link: 'https://github.com/jmdev-git/Kidsphonics',
    accent: '#00c853',
  },
  {
    id: 'p2',
    title: "Domino's Self-Order Kiosk",
    description:
      'A responsive Flutter web app that lets customers browse, customize, and place pizza orders, manage their cart, choose payment and delivery options, and track orders in real time.',
    tags: ['Flutter', 'Dart', 'SQL'],
    year: '2024',
    image: "Domino's Self-Order Kiosk.jpg",
    link: '#',
    accent: '#6c63ff',
    private: true,
  },
  {
    id: 'p3',
    title: 'Barangay Management Information System',
    description:
      'A centralized barangay management system that digitizes resident records, blotter reports, clearance requests, census data, announcements, and document generation through an easy-to-manage admin dashboard and resident portal.',
    tags: ['Laravel', 'WebSockets', 'Canvas API'],
    year: '2024',
    image: 'BMIS.jpg',
    link: 'https://github.com/jmdev-git/barangay-information-system',
    accent: '#6c63ff',
  },
  {
    id: 'p4',
    title: 'CNT CloudSpace',
    description:
      'An internal communication and management platform that centralizes company announcements, memo acknowledgments, event registration and attendance, team chat, IT support tickets, and administrative management in one organized system.',
    tags: ['React', 'D3.js', 'Tailwind CSS'],
    year: '2023',
    image: 'CNT Cloudspace.jpg',
    link: '#',
    accent: '#ff6b6b',
    private: true,
  },
  {
    id: 'p5',
    title: 'Prism',
    description:
      'A collaborative Kanban project management tool that enables teams to organize tasks, share boards, collaborate in real time, add rich-text notes, and track project activity in one visual workspace.',
    tags: ['Next.js', 'Stripe', 'GSAP'],
    year: '2023',
    image: 'Prism.jpg',
    link: 'https://github.com/jmdev-git/Prism',
    accent: '#00b4d8',
  },
  {
    id: 'p6',
    title: 'Laksikap',
    description:
      'A digital DTR time-tracking app that helps OJT students monitor completed hours, track remaining requirements, estimate completion dates, export records to Excel, and compare progress with classmates.',
    tags: ['Next.js', 'Stripe', 'GSAP'],
    year: '2023',
    image: 'Laksikap.jpg',
    link: 'https://github.com/jmdev-git/Laksikap',
    accent: '#00b4d8',
  },
]
