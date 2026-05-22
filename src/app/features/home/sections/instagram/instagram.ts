import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../../../core/constants/contact.constants';

@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [SectionHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './instagram.html',
  styleUrl: './instagram.scss',
})
export class InstagramComponent {
  readonly instagramUrl = INSTAGRAM_URL;
  readonly instagramHandle = INSTAGRAM_HANDLE;
}
