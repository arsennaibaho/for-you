
export interface SectionContent {
  id: number;
  title: string;
  description: string;
  pose: 'initial' | 'smiling' | 'walking' | 'sorry' | 'holding' | 'hugging';
  accentColor: string;
}

export interface SnowParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}
