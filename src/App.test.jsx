import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// ─── Mock framer-motion (handles any motion.xxx element) ───────────────────
jest.mock('framer-motion', () => {
  const React = require('react');

  const createMotionComponent = (tag) =>
    React.forwardRef(function MotionComponent({ children, ...props }, ref) {
      const {
        initial, animate, exit, variants, transition,
        whileHover, whileTap, whileFocus, whileDrag, whileInView,
        drag, dragConstraints, dragElastic, dragMomentum,
        onHoverStart, onHoverEnd, onDragStart, onDragEnd,
        layout, layoutId,
        ...domProps
      } = props;
      return React.createElement(tag, { ...domProps, ref }, children);
    });

  const motion = new Proxy({}, { get: (_, prop) => createMotionComponent(prop) });

  return {
    motion,
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({ start: jest.fn().mockResolvedValue(undefined), stop: jest.fn(), set: jest.fn() }),
    useInView: () => [React.createRef(), true],
    useScroll: () => ({ scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } }),
  };
});

// ─── Mock next/link ────────────────────────────────────────────────────────
jest.mock('next/link', () => {
  const React = require('react');
  return React.forwardRef(function Link({ children, href, className, onClick, ...rest }, ref) {
    return React.createElement('a', { href, className, onClick, ref, ...rest }, children);
  });
});

// ─── Imports ──────────────────────────────────────────────────────────────
import App from './App';
import Header from './components/Header';
import About from './components/About';
import Article from './components/Article';
import ArticleList from './components/ArticleList';

// ═══════════════════════════════════════════════════════════════════════════
// Header
// ═══════════════════════════════════════════════════════════════════════════
describe('Header', () => {
  it('renders an <h1> with the name prop', () => {
    render(<Header name="Test Blog" navLinks={[]} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Blog');
  });

  it('renders nav links', () => {
    const links = [{ href: '/blog', label: 'Blog' }];
    render(<Header name="Ian Kinoti" navLinks={links} />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// About
// ═══════════════════════════════════════════════════════════════════════════
describe('About', () => {
  it('renders an <aside> element', () => {
    const { container } = render(<About image="/test.jpg" about="About text" />);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  it('renders an <img> with alt="blog logo"', () => {
    render(<About image="/test.jpg" about="About text" />);
    expect(screen.getByAltText('blog logo')).toBeInTheDocument();
  });

  it('renders the about text in a <p>', () => {
    render(<About image="/test.jpg" about="About text here" />);
    expect(screen.getByText('About text here')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Article
// ═══════════════════════════════════════════════════════════════════════════
describe('Article', () => {
  it('renders an <article> element', () => {
    const { container } = render(
      <Article title="My Post" date="2024-01-01" preview="This is a preview." />
    );
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders the title in an <h3>', () => {
    render(<Article title="My Post" date="2024-01-01" preview="Preview text" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('My Post');
  });

  it('renders the date in a <small>', () => {
    const { container } = render(
      <Article title="My Post" date="2024-01-01" preview="Preview text" />
    );
    expect(container.querySelector('small')).toHaveTextContent('2024-01-01');
  });

  it('renders the preview in a <p>', () => {
    render(<Article title="My Post" date="2024-01-01" preview="Preview text here" />);
    expect(screen.getByText('Preview text here')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// ArticleList
// ═══════════════════════════════════════════════════════════════════════════
describe('ArticleList', () => {
  const mockPosts = [
    { slug: 'post-1', title: 'Post One', date: '2024-01-01', preview: 'Preview one', excerpt: 'Preview one', tags: [], content: '' },
    { slug: 'post-2', title: 'Post Two', date: '2024-01-02', preview: 'Preview two', excerpt: 'Preview two', tags: [], content: '' },
  ];

  it('renders a <main> element', () => {
    const { container } = render(<ArticleList posts={mockPosts} />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('renders one <Article> per post', () => {
    render(<ArticleList posts={mockPosts} />);
    expect(screen.getAllByRole('article').length).toBe(2);
  });

  it('passes title, date, and preview to each Article', () => {
    render(<ArticleList posts={mockPosts} />);
    expect(screen.getByText('Post One')).toBeInTheDocument();
    expect(screen.getByText('Preview two')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// App (integration)
// ═══════════════════════════════════════════════════════════════════════════
describe('App', () => {
  it('renders a <header>', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders an <aside>', () => {
    render(<App />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('renders a <main>', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders at least one article', () => {
    render(<App />);
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  });

  it('renders the blog logo image', () => {
    render(<App />);
    expect(screen.getByAltText('blog logo')).toBeInTheDocument();
  });
});
