import site from '../content/site.json';
import ui from '../content/ui.json';

export type Section = { id: string; visible: boolean; note?: string; f: Record<string, any> };

export const brand = site.brand;
export const sections = site.sections as Section[];
export { ui };
export const TODO = ui.todo;

export const section = (id: string) => sections.find((s) => s.id === id);
export const isVisible = (id: string) => section(id)?.visible === true;
export const f = (id: string): Record<string, any> => section(id)?.f ?? {};

// Lien de prise de rendez-vous (rdv.cal), utilisé par tous les boutons rdv.
export const calUrl: string = f('rdv').cal || '#rdv';

/** Champ à compléter : vide → laissé en blanc ; séparateur « · » final retiré. */
export function fill(value: string | undefined): string {
  return (value ?? '').trim().replace(/\s*·$/, '');
}

/** Découpe une chaîne en éléments non vides. */
export const split = (value: string | undefined, sep: string | RegExp) =>
  (value ?? '').split(sep).map((s) => s.trim()).filter(Boolean);

/** Remplace {brand}, {email}, {phone} dans les textes des pages légales. */
export function vars(text: string): string {
  const foot = f('footer');
  return text
    .replaceAll('{brand}', brand.name)
    .replaceAll('{email}', foot.email || '')
    .replaceAll('{phone}', foot.phone || '');
}
