export const totalArticles = () => useState<number>('totalArticles', () => 0);
export const totalDesigns = () => useState<number>('totalDesigns', () => 0);
export const perPage = () => useState<number>('perPage', () => 6);
