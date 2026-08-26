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
    title: 'Folio OS',
    description:
      'A macOS-inspired interactive portfolio dashboard built with React and Framer Motion. Drag, resize, and open app windows.',
    tags: ['React', 'Framer Motion', 'TypeScript'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    link: '#',
    accent: '#00c853',
  },
  {
    id: 'p2',
    title: 'Threadline',
    description:
      'A real-time collaborative design tool for building component libraries. Powered by WebSockets and a custom canvas renderer.',
    tags: ['Next.js', 'WebSockets', 'Canvas API'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    link: '#',
    accent: '#6c63ff',
  },
  {
    id: 'p3',
    title: 'Threadline',
    description:
      'A real-time collaborative design tool for building component libraries. Powered by WebSockets and a custom canvas renderer.',
    tags: ['Next.js', 'WebSockets', 'Canvas API'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    link: '#',
    accent: '#6c63ff',
  },
  {
    id: 'p4',
    title: 'Pulse Analytics',
    description:
      'A real-time product analytics dashboard with custom chart components, funnel visualization, and CSV export.',
    tags: ['React', 'D3.js', 'Tailwind CSS'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    link: '#',
    accent: '#ff6b6b',
  },
  {
    id: 'p5',
    title: 'Storekit',
    description:
      'A fully custom e-commerce storefront with animated product reveals, cart persistence, and Stripe checkout integration.',
    tags: ['Next.js', 'Stripe', 'GSAP'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80',
    link: '#',
    accent: '#00b4d8',
  },
  {
    id: 'p6',
    title: 'Storekit',
    description:
      'A fully custom e-commerce storefront with animated product reveals, cart persistence, and Stripe checkout integration.',
    tags: ['Next.js', 'Stripe', 'GSAP'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80',
    link: '#',
    accent: '#00b4d8',
  },
]
