'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

const FILTERS = [
  { id: 'all', label: 'All Works' },
  { id: 'live', label: 'Live Sites' },
  { id: 'coming_soon', label: 'Coming Soon' },
  { id: 'ecom', label: 'E-Commerce & Retail' },
  { id: 'media', label: 'Media & Experiential' },
  { id: 'saas', label: 'SaaS & Fitness' },
];

export default function ProjectsShowcase({ projects, showHeader = true, limit }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'live') return project.status === 'live';
    if (activeFilter === 'coming_soon') return project.status === 'coming_soon';
    if (activeFilter === 'ecom') {
      return (
        project.category.toLowerCase().includes('e-commerce') ||
        project.category.toLowerCase().includes('fashion') ||
        project.category.toLowerCase().includes('goods')
      );
    }
    if (activeFilter === 'media') {
      return (
        project.category.toLowerCase().includes('experiential') ||
        project.category.toLowerCase().includes('media') ||
        project.category.toLowerCase().includes('luxury') ||
        project.category.toLowerCase().includes('agency')
      );
    }
    if (activeFilter === 'saas') {
      return (
        project.category.toLowerCase().includes('saas') ||
        project.category.toLowerCase().includes('fitness') ||
        project.category.toLowerCase().includes('enterprise')
      );
    }
    return true;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div className="showcase-container">
      {/* Category & Status Filter Tabs */}
      <div className="showcase-filter-bar" role="tablist" aria-label="Filter client projects">
        <div className="showcase-filters">
          {FILTERS.map((f) => {
            const count = projects.filter((p) => {
              if (f.id === 'all') return true;
              if (f.id === 'live') return p.status === 'live';
              if (f.id === 'coming_soon') return p.status === 'coming_soon';
              if (f.id === 'ecom') {
                return (
                  p.category.toLowerCase().includes('e-commerce') ||
                  p.category.toLowerCase().includes('fashion') ||
                  p.category.toLowerCase().includes('goods')
                );
              }
              if (f.id === 'media') {
                return (
                  p.category.toLowerCase().includes('experiential') ||
                  p.category.toLowerCase().includes('media') ||
                  p.category.toLowerCase().includes('luxury') ||
                  p.category.toLowerCase().includes('agency')
                );
              }
              if (f.id === 'saas') {
                return (
                  p.category.toLowerCase().includes('saas') ||
                  p.category.toLowerCase().includes('fitness') ||
                  p.category.toLowerCase().includes('enterprise')
                );
              }
              return true;
            }).length;

            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === f.id}
                aria-controls="projects-grid"
                className={`showcase-filter-btn ${activeFilter === f.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                <span>{f.label}</span>
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="showcase-live-indicator" aria-hidden="true">
          <span className="live-pulse-dot" />
          <span className="live-indicator-text">8 verified client builds</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid" id="projects-grid" role="tabpanel">
        {displayedProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} priority={idx < 2} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="showcase-empty">
          <p>No projects match the selected filter.</p>
          <button 
            type="button" 
            className="btn btn-ghost"
            onClick={() => setActiveFilter('all')}
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
