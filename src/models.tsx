export interface Entry {
  id: string;
  date: string;
  title: string;
  description: string;
}

export const toEntry = (doc): Entry => {
  return { id: doc.id, ...doc.data() };
};
