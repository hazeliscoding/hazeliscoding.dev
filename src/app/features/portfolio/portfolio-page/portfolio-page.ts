import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../data/projects.data';
import { ProjectCard } from '../../../core/shared/project-card/project-card';
import { ProjectsDataService } from '../../../services/projects-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'portfolio-page',
  standalone: true,
  imports: [ProjectCard, RouterLink],
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.scss',
})
export class PortfolioPage {
  projectsData: Project[];

  constructor(
    private projectsService: ProjectsDataService,
    private title: Title,
    private meta: Meta,
  ) {
    this.projectsData = this.projectsService.getAllProjects();
  }

  ngOnInit(): void {
    this.title.setTitle('Portfolio - Hazel Granados');
    this.meta.updateTag({
      name: 'description',
      content: 'Explore selected projects by Hazel Granados.',
    });
  }
}
