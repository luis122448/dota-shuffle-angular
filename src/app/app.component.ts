import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Dota Shuffle MMR');
    this.metaService.addTags([
      { name: 'description', content: 'Application to balance Dota 2 teams, according to the MMR' },
      { name: 'keywords', content: 'Dota 2, MMR, team balance, gaming' },
      { name: 'author', content: 'luis122448' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ff6600' },

      // Open Graph tags for social media
      { property: 'og:title', content: 'Dota Shuffle MMR' },
      { property: 'og:description', content: 'Application to balance Dota 2 teams, according to the MMR' },
      { property: 'og:image', content: '/assets/image/icon/tama-icon.png' },
      { property: 'og:url', content: 'https://dota-shuffle.luis122448.com/' },
      { property: 'og:type', content: 'website' },
      // Metadatos para Discord
      { property: 'og:site_name', content: 'Dota Shuffle MMR' }, // Nombre del sitio
      { property: 'og:locale', content: 'en_US' }, // Configuración regional
      { property: 'og:image:width', content: '1200' }, // Ancho de la imagen
      { property: 'og:image:height', content: '630' }, // Alto de la imagen
      { property: 'og:image:type', content: 'image/png' }, // Tipo de la imagen

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Dota Shuffle MMR' },
      { name: 'twitter:description', content: 'Application to balance Dota 2 teams, according to the MMR' },
      { name: 'twitter:image', content: '/assets/image/icon/tama-icon.png' },
      { name: 'twitter:site', content: '@luis122448' },

      // Additional meta tags
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'application-name', content: 'Dota Shuffle MMR' },
      { name: 'msapplication-TileColor', content: '#ff6600' },
      { name: 'msapplication-TileImage', content: '/assets/image/icon/tama-icon.png' },
    ]);
  }
  ngOnInit(): void {
    initFlowbite();
  }
  title = 'dota-shuffle';
}
