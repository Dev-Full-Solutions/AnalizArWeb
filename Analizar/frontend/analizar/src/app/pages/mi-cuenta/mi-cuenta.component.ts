import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent {
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    const footer = document.querySelector('footer');
    this.renderer.removeClass(footer, 'fixed');
    this.renderer.removeClass(footer, 'fixed-bottom');
  }

  handleEnterKey(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const targetElement = event.target as HTMLElement;
      if (targetElement.tagName === 'A' && targetElement.classList.contains('nav-link')) {
        const linkText = targetElement.textContent?.trim();
        console.log(`Se presionó Enter en el enlace: ${linkText}`);
      }
    }
  }

}
