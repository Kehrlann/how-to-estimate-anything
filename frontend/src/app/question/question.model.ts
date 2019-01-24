export interface Question {
  id: number;
  text: string;
  min?: number;
  max?: number;
  answered?: boolean;
}
