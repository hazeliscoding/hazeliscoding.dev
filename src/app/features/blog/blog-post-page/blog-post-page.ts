import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { Footer } from '../../../core/layout/footer/footer';
import { BlogService, type BlogPost } from '../../../services/blog.service';

type MermaidApi = (typeof import('mermaid'))['default'];

// Light mode uses a custom, muted palette (white fills, medium-grey borders,
// black text) instead of mermaid's default lavender, which reads as harsh on a
// white page. Dark mode uses the built-in dark theme.
const LIGHT_THEME_VARIABLES = {
  background: 'transparent',
  primaryColor: '#ffffff',
  primaryTextColor: '#111111',
  primaryBorderColor: '#8c8c8c',
  secondaryColor: '#f2f2f2',
  tertiaryColor: '#f2f2f2',
  mainBkg: '#ffffff',
  lineColor: '#595959',
  textColor: '#111111',
  actorBkg: '#ffffff',
  actorBorder: '#8c8c8c',
  actorTextColor: '#111111',
  actorLineColor: '#8c8c8c',
  signalColor: '#595959',
  signalTextColor: '#111111',
  labelBoxBkgColor: '#f2f2f2',
  labelBoxBorderColor: '#8c8c8c',
  labelTextColor: '#111111',
  noteBkgColor: '#f2f2f2',
  noteTextColor: '#111111',
  noteBorderColor: '#8c8c8c',
  sequenceNumberColor: '#ffffff',
};

@Component({
  selector: 'blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './blog-post-page.html',
  styleUrl: './blog-post-page.scss',
})
export class BlogPostPage implements OnDestroy {
  post: BlogPost | null = null;

  private diagramSeq = 0;
  private mermaid: MermaidApi | null = null;
  private diagrams: { source: string; figure: HTMLElement }[] = [];
  private themeObserver: MutationObserver | null = null;

  constructor(
    private route: ActivatedRoute,
    private blog: BlogService,
    private title: Title,
    private meta: Meta,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      this.post = this.blog.getPostBySlug(slug);

      if (!this.post) {
        this.title.setTitle('Post not found - Hazel Granados');
        this.meta.updateTag({
          name: 'description',
          content: 'This blog post could not be found.',
        });
        return;
      }

      this.title.setTitle(`${this.post.title} - Hazel Granados`);

      this.meta.updateTag({
        name: 'description',
        content: this.post.description || `Blog post: ${this.post.title}`,
      });

      // The Markdown is injected via [innerHTML]; wait a tick for it to land,
      // then upgrade any ```mermaid blocks into rendered diagrams. Browser only.
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => this.setupDiagrams(), 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
    this.themeObserver = null;
  }

  private async setupDiagrams(): Promise<void> {
    this.diagrams = [];

    const blocks = this.host.nativeElement.querySelectorAll<HTMLElement>(
      'code.language-mermaid',
    );
    if (blocks.length === 0) return;

    if (!this.mermaid) {
      this.mermaid = (await import('mermaid')).default;
    }

    // Swap each source block for an empty figure we can (re)render into.
    for (const code of Array.from(blocks)) {
      const source = code.textContent ?? '';
      const pre = code.closest('pre') ?? code;
      const figure = document.createElement('figure');
      figure.className = 'mermaid-diagram';
      pre.replaceWith(figure);
      this.diagrams.push({ source, figure });
    }

    await this.renderDiagrams();

    // Re-render when the site theme toggles so diagrams never look washed out
    // in the mode they weren't first rendered in.
    if (!this.themeObserver) {
      this.themeObserver = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.attributeName === 'data-theme')) {
          this.renderDiagrams();
        }
      });
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }
  }

  private async renderDiagrams(): Promise<void> {
    if (!this.mermaid || this.diagrams.length === 0) return;

    const dark =
      document.documentElement.getAttribute('data-theme') !== 'light';

    this.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      fontFamily: 'inherit',
      ...(dark
        ? { theme: 'dark' }
        : { theme: 'base', themeVariables: LIGHT_THEME_VARIABLES }),
    });

    for (const { source, figure } of this.diagrams) {
      try {
        const id = `mmd-${this.diagramSeq++}`;
        const { svg } = await this.mermaid.render(id, source);
        figure.innerHTML = svg;
      } catch {
        // Leave whatever is there if a diagram fails to parse.
      }
    }
  }
}
