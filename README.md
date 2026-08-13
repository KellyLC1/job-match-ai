# Job Match AI

Application web permettant d'analyser la compatibilité entre le profil d'un candidat et une offre d'emploi grâce à l'intelligence artificielle.

## Fonctionnalités

* Import et analyse automatique d'un CV PDF
* Extraction du profil candidat avec Google Gemini
* Structuration des compétences, expériences et formations
* Analyse d'une offre d'emploi
* Score de compatibilité
* Identification des compétences correspondantes
* Identification des compétences manquantes
* Identification des compétences transférables
* Analyse des points forts du candidat
* Conseil personnalisé
* Recommandation de candidature
* Sauvegarde du profil candidat dans `localStorage`
* Prise en compte des informations complémentaires et du projet professionnel
* Matching contextuel adapté aux objectifs du candidat

## Stack technique

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* Multer
* PDF Parse
* dotenv

### Intelligence artificielle

* Google Gemini API

## Versions

### V1 — MVP

* Création du frontend React
* Création du backend Express
* Communication entre le frontend et le backend
* Création de la route `/api/analyze`
* Intégration de Gemini
* Première analyse d'un profil et d'une offre

### V1.1 — Matching

* Score de compatibilité
* Compétences correspondantes
* Compétences manquantes
* Compétences transférables
* Points forts
* Conseil personnalisé
* Recommandation de candidature

### V1.2 — Amélioration du matching

* Structure JSON des résultats
* Niveaux de matching
* Priorisation des offres
* Affichage dynamique des résultats dans React

### V1.3 — Analyse du CV

* Upload d'un CV PDF
* Extraction du texte avec PDF Parse
* Analyse du CV avec Gemini
* Extraction automatique :

  * identité
  * titre
  * résumé
  * compétences
  * expériences
  * formations

### V1.4 — CV et matching

* Utilisation automatique du profil extrait du CV
* Matching entre le profil réel et l'offre
* Analyse personnalisée selon les compétences du candidat

### V1.5 — Profil persistant

* Sauvegarde du profil avec `localStorage`
* Récupération automatique du profil au chargement
* Suppression du profil
* Conservation du profil entre les sessions

### V1.6 — Interface candidat

* Interface complète d'import du CV
* Affichage du profil extrait
* Champ de saisie de l'offre
* Affichage structuré des résultats
* Intégration du profil CV dans le parcours d'analyse

### V1.7 — Profil candidat enrichi

* Ajout d'informations complémentaires
* Prise en compte des préférences professionnelles
* Prise en compte des objectifs de carrière
* Prise en compte des compétences que le candidat souhaite développer
* Prise en compte du potentiel d'apprentissage pour les postes junior et alternance

### V1.7.1 — Matching contextuel

* Analyse du projet professionnel
* Distinction entre compétences acquises et compétences à développer
* Prise en compte des compétences transférables
* Prise en compte du niveau du poste
* Évaluation de la cohérence entre l'offre et les objectifs du candidat
* Recommandations adaptées au contexte professionnel

## Fonctionnement

```text
CV PDF
  ↓
Extraction du texte
  ↓
Gemini
  ↓
Profil candidat structuré
  ↓
Sauvegarde du profil
  ↓
Informations complémentaires
  ↓
Offre d'emploi
  ↓
Gemini
  ↓
Analyse contextuelle
  ↓
Score + compétences + recommandations
```

## Roadmap

### V1.8 — Historique

* [ ] Historique des offres analysées
* [ ] Sauvegarde des résultats
* [ ] Consultation des analyses précédentes
* [ ] Suppression d'une analyse

### V1.9 — Recherche et filtres

* [ ] Filtres par domaine
* [ ] Filtres par localisation
* [ ] Filtres par type de contrat
* [ ] Filtres par niveau d'expérience
* [ ] Filtres par télétravail

### V2 — Recherche d'offres

* [ ] Connexion à des sources d'offres d'emploi
* [ ] Agrégation des offres
* [ ] Analyse automatique des offres
* [ ] Matching automatique avec le profil candidat
* [ ] Classement des offres par pertinence
* [ ] Recommandation d'offres personnalisées

### V2.5 — Aide à la candidature

* [ ] Génération de lettres de motivation
* [ ] Adaptation du CV à une offre
* [ ] Suggestions de compétences à mettre en avant
* [ ] Préparation aux entretiens

### V3 — Data et Machine Learning

* [ ] Collecte et structuration des données de matching
* [ ] Analyse statistique des candidatures
* [ ] Machine Learning
* [ ] Modèles de recommandation
* [ ] Deep Learning

## Objectif

Construire progressivement une plateforme capable d'aider un candidat à :

* analyser son profil ;
* évaluer les offres d'emploi ;
* prioriser ses candidatures ;
* identifier ses compétences à développer ;
* prendre en compte son projet professionnel ;
* adapter ses candidatures ;
* découvrir des offres correspondant réellement à son profil.

Le projet évolue progressivement d'un outil de matching basé sur l'IA générative vers une plateforme complète d'aide à la recherche d'emploi.
