import { Component, inject, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../../../core/constants/contact.constants';
import { InstagramServico } from '../../../../core/servicos/instagram.servico';

@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './instagram.html',
  styleUrl: './instagram.scss',
})
export class InstagramComponent implements OnInit {
  readonly instagram = inject(InstagramServico);
  readonly instagramUrl = INSTAGRAM_URL;
  readonly instagramHandle = INSTAGRAM_HANDLE;

  readonly POSTS_PLACEHOLDER = Array.from({ length: 6 }, (_, i) => i);

  ngOnInit(): void {
    this.instagram.carregar();
  }
}
