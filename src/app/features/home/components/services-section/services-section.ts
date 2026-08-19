import { Component } from '@angular/core';
import { AppButton } from '../../../../core/shared/app-button/app-button';

@Component({
  selector: 'services-section',
  imports: [AppButton],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
})
export class ServicesSection {
  services = [
    'Full-stack web application development',
    'Backend/API engineering',
    'Background processing & scheduled jobs',
    'Event-driven integrations',
    'Database design & optimization',
    'Cloud deployment & DevOps automation',
    'Observability & monitoring setup',
    'Automated testing & CI/CD pipelines',
  ];
}
