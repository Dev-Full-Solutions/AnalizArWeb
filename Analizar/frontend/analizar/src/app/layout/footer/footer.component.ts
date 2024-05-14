import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

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
