export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
  image: string
  link: string
  accent: string // accent color for hover
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Coming Soon',
    description:
      'A macOS-inspired interactive portfolio dashboard built with React and Framer Motion. Drag, resize, and open app windows.',
    tags: ['React', 'Framer Motion', 'TypeScript'],
    year: '2024',
    image: 'T1.jpg',
    link: '#',
    accent: '#00c853',
  },
  {
    id: 'p2',
    title: 'Coming Soon',
    description:
      'A real-time collaborative design tool for building component libraries. Powered by WebSockets and a custom canvas renderer.',
    tags: ['Next.js', 'WebSockets', 'Canvas API'],
    year: '2024',
    image: 'T2.jpg',
    link: '#',
    accent: '#6c63ff',
  },
  {
    id: 'p3',
    title: 'Coming Soon',
    description:
      'A real-time collaborative design tool for building component libraries. Powered by WebSockets and a custom canvas renderer.',
    tags: ['Next.js', 'WebSockets', 'Canvas API'],
    year: '2024',
    image: 'T3.jpg',
    link: '#',
    accent: '#6c63ff',
  },
  {
    id: 'p4',
    title: 'Coming Soon',
    description:
      'A real-time product analytics dashboard with custom chart components, funnel visualization, and CSV export.',
    tags: ['React', 'D3.js', 'Tailwind CSS'],
    year: '2023',
    image: 'T4.jpg',
    link: '#',
    accent: '#ff6b6b',
  },
  {
    id: 'p5',
    title: 'Coming Soon',
    description:
      'A fully custom e-commerce storefront with animated product reveals, cart persistence, and Stripe checkout integration.',
    tags: ['Next.js', 'Stripe', 'GSAP'],
    year: '2023',
    image: 'T5.jpg',
    link: '#',
    accent: '#00b4d8',
  },
  {
    id: 'p6',
    title: 'Coming Soon',
    description:
      'A fully custom e-commerce storefront with animated product reveals, cart persistence, and Stripe checkout integration.',
    tags: ['Next.js', 'Stripe', 'GSAP'],
    year: '2023',
    image: 'T6.jpg',
    link: '#',
    accent: '#00b4d8',
  },
]
