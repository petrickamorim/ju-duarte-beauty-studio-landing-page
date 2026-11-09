import { IconeNome } from '../../../shared/components/icone/icone';

export interface ServiceItem {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly icon: IconeNome;
}
