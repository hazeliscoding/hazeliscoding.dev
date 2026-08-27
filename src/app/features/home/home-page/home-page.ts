import { Component } from '@angular/core';
import { PresentationSection } from '../components/presentation-section/presentation-section';
import { ServicesSection } from '../components/services-section/services-section';
import { TechStackSection } from '../components/tech-stack-section/tech-stack-section';
import { ContactSection } from '../components/contact-section/contact-section';
import { OssSection } from '../components/oss-section/oss-section';
import { FeaturedProjectsSection } from '../components/featured-projects-section/featured-projects-section';
import { Footer } from '../../../core/layout/footer/footer';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    PresentationSection,
    ServicesSection,
    TechStackSection,
    OssSection,
    ContactSection,
    FeaturedProjectsSection,
    Footer,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  lastUpdate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Hazel Granados - Home Page');
    this.meta.updateTag({
      name: 'description',
      content:
        "Hello, I'm Hazel Granados (she/they) — software developer/architect. I build full-stack apps with care and scalability.",
    });
  }
}
