# Soline System — site vitrine

Site statique [Astro](https://astro.build) : une page d'accueil et deux pages légales.

## Démarrer en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/ en local
```

## Modifier le contenu

Tout le texte du site est dans `src/content/`. Aucun composant ne contient de texte en dur.

| Fichier | Contenu |
| --- | --- |
| `site.json` | Tout le contenu de la page d'accueil (copie de `contenu-site.json`) |
| `ui.json` | Petits textes d'interface : libellés des liens légaux, « Menu », « SIRET », marqueur `[À compléter]`, ancres de la navigation |
| `legal.json` | Textes des pages `/mentions-legales` et `/confidentialite` |

### site.json

- `brand.accent` et `brand.pop` : les deux couleurs du site (appliquées partout).
- `sections` : une entrée par section. **L'ordre du tableau est l'ordre d'affichage.** Mettez `"visible": false` pour masquer une section (les liens de nav vers une section masquée disparaissent aussi).
- Chaque section a ses textes dans `f`.

Règles d'affichage :

- Un champ vide (ex. `engagements.items[1].text`, `footer.siret`) reste en blanc ; `footer.address` vide est masqué.
- Tout texte entre crochets `[ ]` (dans `legal.json` notamment) sert de repère dans le fichier mais **n'est pas affiché** sur le site : il reste en blanc. Remplacez-le par la vraie information.
- Le « · » final de `hero.eyebrow` est retiré tant que la ville n'est pas renseignée.
- `hero.badge` vide : la pastille ronde est masquée.
- `price` vide dans une formule : le prix est masqué.
- Éléments vides dans `outils.items` : ignorés.
- Logos de la barre défilante des outils : dans `ui.json > toolLogos`, chaque nom d'outil (identique à `outils.items`) est associé à un ou plusieurs logos [Simple Icons](https://simpleicons.org) (ex. `"Notion": ["notion"]`). `"mail"` affiche une icône d'enveloppe générique. Un outil sans logo s'affiche avec son nom seul.
- `formules.plans[].items` : une ligne par avantage (séparées par `\n`).
- `cas.cards[].tags` et `fondateur.stack` : séparés par `,` et `·`.
- `formules.plans[].rec: true` : formule mise en avant (fond clair, ombre jaune).
- Liens : tous les boutons de rendez-vous pointent vers `rdv.cal`. Le bouton de l'audit pointe vers `#rdv`. Le bouton « Calculer mes heures perdues » du haut de page pointe vers `#audit`.
- Navigation : le n-ième libellé de `nav.links` pointe vers le n-ième id de `ui.json > navTargets`.
- Les champs `note` et `globalNote` sont des notes internes : ils ne s'affichent pas.

### Pages légales

Dans `legal.json`, chaque page a des `sections` avec un `title` et des `items` (un paragraphe chacun). Remplacez les passages `[entre crochets]` par les vraies informations (ils sont masqués sur le site en attendant). `{brand}`, `{email}` et `{phone}` sont remplacés automatiquement par les valeurs de `site.json`.

## JavaScript côté client

Le site n'utilise qu'un seul petit script (dans `Nav.astro`) : il repère la section visible pour allumer le nœud correspondant de la navigation et remplir la ligne jusqu'à lui. Sans JavaScript, la navigation reste entièrement fonctionnelle. La FAQ et le menu mobile utilisent `<details>` natif.

## Structure

```
src/
  content/      site.json, ui.json, legal.json
  components/   une section = un composant (Nav, Hero, Outils, Services, Cas,
                Engagements, Formules, Methode, Fondateur, Audit, Faq, Rdv, Footer)
                + Txt (surlignage des [champs]) + LegalPage
  layouts/      Layout.astro (balises <head>, polices, couleurs)
  lib/          content.ts (lecture du JSON et règles d'affichage)
  pages/        index, mentions-legales, confidentialite
  styles/       global.css (couleurs, bordures, ombres, boutons, fonds)
```

Les polices Bricolage Grotesque et Instrument Sans (Google Fonts) sont **auto-hébergées** via Fontsource : aucune requête vers les serveurs de Google, ce qui évite un transfert de données des visiteurs (RGPD).

## Déployer sur Vercel

1. Poussez le dossier sur un dépôt GitHub (le `.gitignore` exclut `node_modules` et `dist`).
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importez le dépôt.
3. Vercel détecte Astro tout seul (build : `npm run build`, sortie : `dist`). Cliquez **Deploy**.
4. Chaque modification poussée sur la branche principale redéploie le site.

Sans GitHub : `npx vercel` depuis le dossier, puis `npx vercel --prod`.

**Avant la mise en ligne publique**, complétez tous les champs vides et les passages `[entre crochets]` des fichiers JSON, en particulier les pages légales (obligatoires : LCEN art. 6-III, RGPD).
