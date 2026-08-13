# 🤖 Job Match AI

Application web permettant d'analyser la compatibilité entre un profil candidat et une offre d'emploi grâce à l'IA.

## 🚀 Fonctionnalités

- 📄 Import et analyse automatique d'un CV PDF
- 🧠 Extraction du profil candidat avec Gemini
- 💼 Analyse d'une offre d'emploi
- 🎯 Score de compatibilité
- ✅ Compétences correspondantes
- ⚠️ Compétences manquantes
- 🔄 Compétences transférables
- 💪 Points forts du profil
- 💡 Conseil personnalisé
- 🎯 Recommandation de candidature
- 💾 Sauvegarde du profil dans `localStorage`

---

## 🛠️ Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- Multer
- PDF Parse
- dotenv

### IA
- Google Gemini API

---

## 📂 Structure

```text
job-match-ai/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
└── backend/
    ├── server.js
    ├── test-gemini.js
    ├── package.json
    └── ...

📈 Versions

V1 — MVP

Création du frontend React
Création du backend Express
Communication Frontend / Backend
Première route /api/analyze
Intégration de l'IA
Analyse d'un profil et d'une offre

V1.1 — Matching

Score de compatibilité
Compétences correspondantes
Compétences manquantes
Compétences transférables
Points forts
Conseil personnalisé
Recommandation de candidature

V1.2 — Amélioration du matching

Structure JSON des résultats
Niveaux de matching
Priorisation des offres
Affichage dynamique des résultats dans React

V1.3 — Analyse du CV

Upload de CV PDF
Extraction du texte avec PDF Parse
Analyse du CV avec Gemini
Extraction :
identité
titre
résumé
compétences
expériences
formations

V1.4 — CV + Matching

Utilisation automatique du profil extrait du CV
Matching CV / offre
Analyse personnalisée selon le profil réel du candidat

V1.5 — Profil persistant
Sauvegarde du profil avec localStorage
Récupération automatique au chargement
Suppression du profil
Plus besoin de réimporter le CV à chaque analyse

🔄 Fonctionnement
CV PDF
  ↓
Extraction du texte
  ↓
Gemini
  ↓
Profil candidat
  ↓
Sauvegarde
  ↓
Offre d'emploi
  ↓
Gemini
  ↓
Analyse du matching
  ↓
Score + compétences + recommandation

## 🔜 Roadmap

- [ ] V1.6 — Historique des analyses
- [ ] V1.7 — Profil candidat enrichi
      - Informations complémentaires
      - Préférences de recherche
      - Mobilité
      - Disponibilité
      - Type de contrat
      - Télétravail
- [ ] V1.8 — Filtres et recherche
- [ ] V1.9 — Statistiques de candidature
- [ ] V2 — Recherche d'offres externes
- [ ] V2 — Agrégation de sources d'emploi
- [ ] V2 — Matching automatique des offres
- [ ] V2 — Recommandation d'offres personnalisées
- [ ] V2 — Génération de lettres de motivation
- [ ] V3 — Machine Learning
- [ ] V3 — Deep Learning

🎯 Objectif

Construire progressivement une plateforme capable d'aider un candidat à :

Analyser son profil
Évaluer les offres d'emploi
Prioriser ses candidatures
Identifier ses compétences à développer
Adapter ses candidatures