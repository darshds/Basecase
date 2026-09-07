'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

const FILTERS = [
  { id: 'all', label: 'All Works' },
  { id: 'live', label: 'Live' },
  { id: 'coming_soon', label: 'Coming Soon' },
  { id: 'ecom', label: 'E-Commerce' },
  { id: 'media', label: 'Media & Experiential' },
  { id: 'saas', label: 'SaaS & Fitness' },
];

function matchFilter(project, filterId) {
  if (filterId === 'all') return true;
  if (filterId === 'live') return project.status === 'live';
  if (filterId === 'coming_soon') return project.status === 'coming_soon';
  if (filterId === 'ecom') {
    const c = project.category.toLowerCase();
    return c.includes('e-commerce') || c.includes('fashion') || c.includes('goods') || c.includes('retail') || c.includes('streetwear');
  }
  if (filterId === 'media') {
    const c = project.category.toLowerCase();
    return c.includes('experiential') || c.includes('media') || c.includes('luxury') || c.includes('agency') || c.includes('aesthetics') || c.includes('growth');
  }
  if (filterId === 'saas') {
    const c = project.category.toLowerCase();
    return c.includes('saas') || c.includes('fitness') || c.includes('enterprise');
  }
  return true;
}

export default function ProjectsShowcase({ projects, showHeader = true, limit, featuredOnly = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const baseProjects = featuredOnly ? projects.filter((p) => p.featured) : projects;
  const filteredProjects = featuredOnly ? baseProjects : baseProjects.filter((p) => matchFilter(p, activeFilter));
  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  // Reset carousel position when filter changes
  useEffect(() => {
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [activeFilter]);

  // Track active slide from scroll position
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 16 : 1;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveSlide(Math.min(idx, displayedProjects.length - 1));
  }, [displayedProjects.length]);

  function scrollToSlide(idx) {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 16 : 0;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveSlide(idx);
  }

  // Count helper (same filter logic for badge counts)
  function countFor(filterId) {
    return projects.filter((p) => matchFilter(p, filterId)).length;
  }

  return (
    <div className="showcase-container">
      {/* Featured Header Strip OR Full Filter Bar */}
      {featuredOnly ? (
        <div className="showcase-featured-bar">
          <div className="showcase-live-indicator">
            <span className="live-pulse-dot" />
            <span className="live-indicator-text">
              Featured Showcase · {displayedProjects.length} Flagship Productions
            </span>
          </div>
          <Link className="btn btn-ghost btn-sm showcase-featured-jump-btn" href="/work">
            <span>Explore All {projects.length} Builds &amp; Filter by Category</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="showcase-filter-bar" role="tablist" aria-label="Filter client projects by category">
          <div className="showcase-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === f.id}
                aria-controls="projects-grid"
                className={`showcase-filter-btn${activeFilter === f.id ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                <span>{f.label}</span>
                <span className="filter-count" aria-label={`${countFor(f.id)} projects`}>
                  {countFor(f.id)}
                </span>
              </button>
            ))}
          </div>

          <div className="showcase-live-indicator" aria-label="Verified client builds">
            <span className="live-pulse-dot" />
            <span className="live-indicator-text">
              {projects.filter((p) => p.status === 'live').length} verified client builds
            </span>
          </div>
        </div>
      )}

      {displayedProjects.length === 0 ? (
        <div className="showcase-empty" role="status">
          <p>No projects match the selected filter.</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setActiveFilter('all')}
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <>
          {/* Desktop grid */}
          <div className="projects-grid" id="projects-grid" role="tabpanel" aria-label="Filtered projects">
            {displayedProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx < 2} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="projects-carousel-wrap" aria-label="Projects carousel">
            <div
              className="projects-carousel"
              ref={carouselRef}
              onScroll={handleScroll}
              aria-label={`${displayedProjects.length} projects, swipe to browse`}
              tabIndex={0}
            >
              {displayedProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} priority={idx === 0} />
              ))}
            </div>

            {/* Pagination dots */}
            {displayedProjects.length > 1 && (
              <div className="carousel-pagination" role="tablist" aria-label="Project carousel navigation">
                {displayedProjects.map((project, idx) => (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={activeSlide === idx}
                    aria-label={`Go to project ${idx + 1}: ${project.title}`}
                    className={`carousel-dot${activeSlide === idx ? ' is-active' : ''}`}
                    onClick={() => scrollToSlide(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
