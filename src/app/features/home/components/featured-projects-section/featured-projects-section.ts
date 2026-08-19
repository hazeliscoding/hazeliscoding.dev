import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectsDataService } from '../../../../services/projects-data.service';
import { Project } from '../../../../data/projects.data';

@Component({
  selector: 'featured-projects-section',
  imports: [RouterLink],
  templateUrl: './featured-projects-section.html',
  styleUrl: './featured-projects-section.scss',
})
export class FeaturedProjectsSection {
  projectsData: Project[];

  constructor(
    private projectsService: ProjectsDataService,
    private router: Router,
  ) {
    this.projectsData = this.projectsService.getFeaturedProjects();
  }

  openProject(id: string) {
    this.router.navigate(['/portfolio', id]);
  }
}
