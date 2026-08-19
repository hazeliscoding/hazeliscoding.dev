import { Component } from '@angular/core';

@Component({
  selector: 'tech-stack-section',
  imports: [],
  templateUrl: './tech-stack-section.html',
  styleUrl: './tech-stack-section.scss',
})
export class TechStackSection {
  stack = [
    { label: 'C# / .NET 8', core: true },
    { label: 'ASP.NET Core', core: true },
    { label: 'Angular', core: true },
    { label: 'EF Core + PostgreSQL', core: false },
    { label: 'CQRS / MediatR', core: false },
    { label: 'AWS SQS/SNS', core: false },
    { label: 'Terraform', core: false },
    { label: 'AWS Parameter Store', core: false },
    { label: 'Docker', core: false },
    { label: 'xUnit + Testcontainers', core: false },
  ];
}
