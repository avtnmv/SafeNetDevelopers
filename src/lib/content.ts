import 'server-only';
import data from '@/content/site.json';

export type ContentBlock = { type: string; text?: string; items?: string[] };
export type Project = (typeof data.projects)[number];
export const { projects, legal, team, assets } = data;
