export interface Review {
  readonly author: string;
  readonly text: string;
  readonly rating: number;
  readonly role?: string;
  readonly date?: string;
}
