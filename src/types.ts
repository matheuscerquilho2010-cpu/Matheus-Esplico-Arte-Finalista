export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ArtPack {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  images?: string[];
  observation?: string;
}

export interface CloudFile {
  id: string;
  projectName: string;
  date: string;
  client: string;
  status: 'Concluído' | 'Em Andamento' | 'Aguardando Aprovação';
  size: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}
