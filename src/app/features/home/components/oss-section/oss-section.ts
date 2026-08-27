import { Component } from '@angular/core';
import { ossStats } from '../../../../data/oss-stats.generated';

@Component({
  selector: 'oss-section',
  imports: [],
  templateUrl: './oss-section.html',
  styleUrl: './oss-section.scss',
})
export class OssSection {
  stats = ossStats;

  formatStars(stars: number): string {
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : `${stars}`;
  }

  shortName(repo: string): string {
    return repo.split('/')[1];
  }
}
