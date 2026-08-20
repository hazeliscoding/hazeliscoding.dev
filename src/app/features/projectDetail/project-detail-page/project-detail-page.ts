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
  lightboxOpen = false;
  lightboxZoomed = false;

  openLightbox() {
    this.lightboxOpen = true;
    this.lightboxZoomed = false;
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.lightboxZoomed = false;
  }

  toggleZoom() {
    this.lightboxZoomed = !this.lightboxZoomed;
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.lightboxOpen = false;
    this.lightboxZoomed = false;
  }

  get slides(): ProjectImage[] {
    if (!this.project) return [];
    return this.project.images?.length
      ? this.project.images
      : [{ src: this.project.image, caption: this.project.title }];
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.lightboxZoomed = false;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.lightboxZoomed = false;
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
