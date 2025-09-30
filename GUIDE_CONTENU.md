# Guide pour Ajouter le Contenu

Ce guide t'aide à remplir les sections **Notre Expertise** et **Certifications & Partenaires** dans `index.html`.

## 📍 Où trouver les sections à remplir

Ouvre `index.html` et cherche les commentaires `<!-- AJOUTE TON TEXTE ICI -->`.

---

## 🎯 Section 1: Notre Expertise (ligne ~367)

### 1.1 Titre principal (ligne 378)
```html
<h3>Plus de XX années d'expérience dans l'électricité</h3>
```
**À remplacer**: `XX` par le nombre d'années d'expérience
**Exemple**: `Plus de 15 années d'expérience dans l'électricité`

### 1.2 Premier paragraphe (lignes 380-383)
```html
<p>
    CEA Ingénierie accompagne ses clients depuis [ANNÉE] dans la conception
    et la réalisation de projets électriques complexes.
    Notre bureau d'études est spécialisé dans...
</p>
```
**À écrire**: Présentation générale de l'entreprise
**Exemple**:
```html
<p>
    CEA Ingénierie accompagne ses clients depuis 2010 dans la conception
    et la réalisation de projets électriques complexes. Notre bureau d'études
    est spécialisé dans les études HTA/HTB et intervient sur des projets
    d'envergure dans les secteurs aéroportuaire, hospitalier et tertiaire.
</p>
```

### 1.3 Deuxième paragraphe (lignes 385-387)
```html
<p>
    Nous intervenons principalement sur des projets...
</p>
```
**À écrire**: Types de projets et zones d'intervention
**Exemple**:
```html
<p>
    Nous intervenons principalement sur des projets de distribution électrique
    HTA/HTB, d'automatisation industrielle et de rénovation énergétique.
    Notre zone d'action couvre toute la région PACA avec une expertise
    reconnue sur Nice, Cannes, Monaco et leurs alentours.
</p>
```

### 1.4 Points forts (lignes 390-410)

#### Point 1: Études HTA/HTB (ligne 394)
```html
<p>Conception et dimensionnement de postes de transformation...</p>
```
**Exemple**:
```html
<p>Conception et dimensionnement de postes de transformation,
calculs de courts-circuits, schémas unifilaires et plans de protection.</p>
```

#### Point 2: Projets d'envergure (ligne 401)
```html
<p>Aéroports, cliniques, centres commerciaux, infrastructures publiques...</p>
```
**Exemple**:
```html
<p>Aéroports (Paris CDG, Lyon, Bordeaux), cliniques privées,
centres commerciaux, infrastructures publiques et ports de plaisance.</p>
```

#### Point 3: Accompagnement complet (ligne 408)
```html
<p>De la conception à la réception des travaux...</p>
```
**Exemple**:
```html
<p>De la conception initiale à la réception des travaux, en passant
par le suivi de chantier et les essais de mise en service.</p>
```

### 1.5 Statistiques (lignes 414-441)

Remplace les `XX` par tes vrais chiffres:

```html
<div class="stat-number" data-target="XX">0</div>  <!-- Années d'expérience -->
```
**Exemples de chiffres**:
- Années d'expérience: `15`
- Projets réalisés: `250`
- Clients actifs: `45`
- % Satisfaction: `100` (ou `98`)

---

## 🏆 Section 2: Certifications & Partenaires (ligne ~447)

### 2.1 Certifications (lignes 462-489)

#### Certification 1: Qualifelec (déjà rempli)
Laisse comme tel ou modifie si tu n'as pas Qualifelec.

#### Certification 2 (lignes 471-479)
```html
<h4><!-- NOM CERTIFICATION --></h4>
<p><!-- AJOUTE TON TEXTE ICI --> Description de la certification...</p>
```
**Exemples de certifications**:
```html
<h4>AFNOR Certification</h4>
<p>Certification qualité ISO 9001 pour la gestion de la qualité
dans les projets électriques.</p>
```

Ou:
```html
<h4>MASE (Manuel d'Amélioration Sécurité)</h4>
<p>Certification sécurité pour l'amélioration des performances
en santé et sécurité au travail.</p>
```

#### Certification 3 (lignes 480-488)
**Autres exemples**:
- Bureau Veritas
- RGE (Reconnu Garant de l'Environnement)
- Certifications constructeurs (Schneider Electric, ABB, etc.)

### 2.2 Partenaires (lignes 496-518)

#### Partenaire 1 (lignes 496-503)
```html
<h4><!-- NOM PARTENAIRE 1 --></h4>
<p><!-- AJOUTE TON TEXTE ICI --> Description du partenariat...</p>
```
**Exemples**:
```html
<h4>Schneider Electric</h4>
<p>Partenaire privilégié pour les solutions de distribution électrique
et d'automatisation industrielle.</p>
```

#### Partenaire 2 (lignes 504-510)
**Exemples**:
```html
<h4>Legrand</h4>
<p>Solutions d'appareillage électrique et de gestion d'énergie
pour le tertiaire.</p>
```

#### Partenaire 3 (lignes 511-517)
**Exemples**:
```html
<h4>ABB</h4>
<p>Technologies avancées pour la moyenne et haute tension.</p>
```

### 2.3 Logos des partenaires (lignes 523-558)

#### Si tu as des logos:
Remplace les placeholders par de vraies images:
```html
<div class="partner-logo-item">
    <img src="ico/schneider-logo.png" alt="Schneider Electric">
</div>
```

#### Si tu n'as pas de logos:
Remplace le texte des placeholders:
```html
<div class="logo-placeholder">
    <span>Schneider Electric</span>
</div>
```

**Exemples de partenaires à afficher**:
1. Schneider Electric
2. Legrand
3. ABB
4. Siemens
5. Hager
6. Rexel

---

## ✅ Checklist de remplissage

- [ ] Années d'expérience (ligne 378)
- [ ] Premier paragraphe présentation (lignes 380-383)
- [ ] Deuxième paragraphe projets (lignes 385-387)
- [ ] Point fort 1: Études HTA/HTB (ligne 394)
- [ ] Point fort 2: Projets d'envergure (ligne 401)
- [ ] Point fort 3: Accompagnement complet (ligne 408)
- [ ] Statistiques (4 chiffres à remplacer)
- [ ] Certification 1 (vérifier Qualifelec)
- [ ] Certification 2 (nom + description)
- [ ] Certification 3 (nom + description)
- [ ] Partenaire 1 (nom + description)
- [ ] Partenaire 2 (nom + description)
- [ ] Partenaire 3 (nom + description)
- [ ] Logos partenaires (6 logos ou textes)

---

## 💡 Conseils

1. **Sois précis**: Utilise des chiffres concrets et des exemples réels
2. **Reste professionnel**: Évite le langage trop marketing
3. **SEO**: Inclus des mots-clés comme "Nice", "PACA", "HTA", "HTB"
4. **Longueur**: 1-2 phrases par description suffit
5. **Cohérence**: Assure-toi que tout correspond à ce que fait réellement CEA

---

## 🎨 Après avoir rempli le contenu

1. Ouvre le site dans un navigateur
2. Vérifie que tout s'affiche correctement
3. Teste en mode responsive (F12 > Mode mobile)
4. Vérifie l'animation des statistiques au scroll

Les sections sont entièrement stylées et animées. Il ne reste plus qu'à ajouter ton contenu! 🚀