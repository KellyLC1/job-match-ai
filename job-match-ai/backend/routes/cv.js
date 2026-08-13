const express = require('express')
const multer = require('multer')
const { PDFParse } = require('pdf-parse')
const { GoogleGenAI } = require('@google/genai')

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

router.post('/upload', upload.single('cv'), async (req, res) => {
  let parser

  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Aucun CV envoyé.'
      })
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        error: 'Le fichier doit être un PDF.'
      })
    }

    // 1. Extraction du texte
    parser = new PDFParse({
      data: req.file.buffer
    })

    const result = await parser.getText()

    const cvText = result.text

    // 2. Nettoyage des informations personnelles
    const cleanedText = cvText
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[EMAIL]')
      .replace(/(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, '[TELEPHONE]')

    // 3. Analyse du CV par Gemini
    const prompt = `
        Tu es un recruteur spécialisé dans les métiers du développement informatique.

        Analyse le CV suivant et transforme-le en profil professionnel structuré.

        IMPORTANT :
        - Ne conserve aucune donnée personnelle inutile.
        - Ignore l'adresse, le téléphone, l'email, l'âge et toute autre donnée personnelle.
        - Ne crée aucune compétence qui n'est pas présente dans le CV.
        - Retourne UNIQUEMENT du JSON valide.
        - Pas de markdown.
        - Pas de texte avant ou après le JSON.

        CV :

        ${cleanedText}

        Retourne exactement cette structure :

        {
        "name": "",
        "title": "",
        "summary": "",
        "skills": [],
        "experiences": [
            {
            "company": "",
            "role": "",
            "period": "",
            "technologies": [],
            "description": ""
            }
        ],
        "education": [
            {
            "school": "",
            "degree": "",
            "period": ""
            }
        ]
        }
        `

    const response = await ai.interactions.create({
      model: 'gemini-3-flash-preview',
      input: prompt
    })

    const rawText = response.output_text

    // 4. Transformer la réponse Gemini en JSON
    let profile

    try {
      profile = JSON.parse(rawText)
    } catch (error) {
      console.error('Réponse Gemini non JSON :', rawText)

      return res.status(500).json({
        error: 'Gemini a retourné une réponse invalide.'
      })
    }

    res.json({
      message: 'CV analysé avec succès.',
      filename: req.file.originalname,
      profile
    })

  } catch (error) {
    console.error('Erreur analyse CV:', error)

    res.status(500).json({
      error: 'Impossible d’analyser le CV.'
    })

  } finally {
    if (parser) {
      await parser.destroy()
    }
  }
})

module.exports = router