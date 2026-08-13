const express = require('express')
const { GoogleGenAI } = require('@google/genai')

const router = express.Router()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

router.post('/', async (req, res) => {
  try {
    const { profile, additionalInfo, jobOffer } = req.body

    if (!profile || !jobOffer) {
      return res.status(400).json({
        error: 'Le profil et l’offre sont obligatoires.'
      })
    }

    const prompt = `
Tu es un recruteur expert en développement informatique, Data et IA.

Tu dois analyser la compatibilité entre un candidat et une offre d'emploi.

IMPORTANT :
Tu dois évaluer la compatibilité de manière globale et réaliste.
Ne fais PAS un simple comptage de mots-clés.

========================
PROFIL CANDIDAT
========================

${profile}

========================
INFORMATIONS COMPLÉMENTAIRES
========================

${additionalInfo || 'Aucune information complémentaire fournie.'}

Ces informations peuvent contenir :
- les objectifs professionnels du candidat
- les domaines qu'il souhaite rejoindre
- les compétences qu'il souhaite développer
- ses préférences de poste
- ses contraintes de recherche
- sa disponibilité
- ses préférences de télétravail ou de localisation

Ces informations doivent être prises en compte dans l'évaluation globale.

========================
OFFRE D'EMPLOI
========================

${jobOffer}

========================
RÈGLES D'ANALYSE
========================

1. Analyse les compétences réellement présentes dans le profil.

2. Identifie les compétences demandées par l'offre qui correspondent au profil.

3. Identifie les compétences importantes manquantes.

4. Identifie les compétences transférables.

5. Analyse l'expérience professionnelle et le niveau du candidat.

6. Analyse les objectifs professionnels indiqués dans les informations complémentaires.

7. Une compétence manquante ne doit PAS automatiquement rendre une candidature mauvaise.

8. Pour une alternance, un stage ou un poste junior, considère positivement :
   - la capacité d'apprentissage
   - les compétences transférables
   - la cohérence du parcours
   - les objectifs professionnels
   - les compétences déjà acquises permettant d'évoluer vers le poste

9. Si le candidat indique explicitement vouloir évoluer vers le domaine de l'offre, considère cela comme un facteur positif.

10. À l'inverse, si le candidat indique explicitement ne pas rechercher ce type de poste, cela doit diminuer la pertinence de l'offre même si certaines compétences correspondent.

11. Distingue :
   - adéquation technique immédiate
   - potentiel d'évolution
   - cohérence avec le projet professionnel

12. Le score doit représenter la pertinence globale de l'offre pour ce candidat, et pas uniquement le nombre de compétences communes.

========================
NIVEAUX DE MATCHING
========================

90-100 :
Excellent match.
Très bonne adéquation technique et/ou excellente cohérence avec le projet professionnel.

75-89 :
Bon match.
Quelques compétences peuvent manquer mais le profil est globalement pertinent.

55-74 :
Match intéressant.
Des écarts existent mais le poste peut être pertinent notamment pour une alternance, un poste junior ou une évolution professionnelle cohérente.

30-54 :
Faible priorité.
L'écart technique ou professionnel est important.

0-29 :
Très faible compatibilité.
Le poste correspond peu au profil et au projet professionnel.

========================
RECOMMANDATION
========================

Utilise uniquement l'une des valeurs suivantes :

"postuler"
"postuler_en_adaptant"
"faible_priorite"

========================
FORMAT DE RÉPONSE
========================

Retourne UNIQUEMENT un JSON valide.

{
  "score": 0,
  "matchLevel": "excellent",
  "matchingSkills": [],
  "missingSkills": [],
  "transferableSkills": [],
  "strengths": [],
  "recommendation": "postuler",
  "advice": ""
}

Le score doit être un nombre entier entre 0 et 100.

Ne mets aucun texte avant ou après le JSON.
`

    const response = await ai.interactions.create({
      model: 'gemini-3-flash-preview',
      input: prompt
    })

    const text = response.output_text

    let analysis

    try {
      analysis = JSON.parse(text)
    } catch (error) {
      console.error('Réponse Gemini non JSON :', text)

      return res.status(500).json({
        error: 'La réponse de l’IA n’est pas au bon format.'
      })
    }

    res.json(analysis)

  } catch (error) {
    console.error('Erreur Gemini:', error)

    res.status(500).json({
      error: 'Erreur lors de l’analyse IA'
    })
  }
})

module.exports = router