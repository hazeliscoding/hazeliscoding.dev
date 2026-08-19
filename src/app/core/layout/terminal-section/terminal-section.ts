import { Component, input } from '@angular/core';

@Component({
  selector: 'app-terminal-section',
  imports: [],
  templateUrl: './terminal-section.html',
  styleUrl: './terminal-section.scss',
})
export class TerminalSection {
  customTitle = input('Who am I');
  isFirstTitle = input(false);

  shortTerminalLine = input(false);
  customCommand = input('whoami');
  errorCommand = input(false);
}
