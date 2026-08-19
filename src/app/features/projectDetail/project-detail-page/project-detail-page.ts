import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsDataService } from '../../../services/projects-data.service';
import { ProjectImage } from '../../../data/projects.data';

@Component({
  selector: 'project-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
})
export class ProjectDetailPage {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsDataService);

  project = this.projectsService.getProjectById(
    this.route.snapshot.paramMap.get('id') || '',
  );

  currentSlide = 0;

  get slides(): ProjectImage[] {
    if (!this.project) return [];
    return this.project.images?.length
      ? this.project.images
      : [{ src: this.project.image, caption: this.project.title }];
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  @HostListener('window:keydown.arrowLeft')
  onArrowLeft() {
    if (this.slides.length > 1) this.prevSlide();
  }

  @HostListener('window:keydown.arrowRight')
  onArrowRight() {
    if (this.slides.length > 1) this.nextSlide();
  }
}
