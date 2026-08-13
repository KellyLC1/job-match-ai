import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [profile, setProfile] = useState('')
  const [jobOffer, setJobOffer] = useState('')

  const [cvProfile, setCvProfile] = useState(null)
  const [cvFile, setCvFile] = useState(null)

  const [additionalInfo, setAdditionalInfo] = useState('')

  const [analysis, setAnalysis] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  // Charger le profil sauvegardé au démarrage
  useEffect(() => {
    const savedProfile = localStorage.getItem('jobMatchProfile')

    if (savedProfile) {
      try {
        setCvProfile(JSON.parse(savedProfile))
      } catch (error) {
        console.error(
          'Impossible de charger le profil sauvegardé :',
          error
        )
      }
    }
  }, [])

  // Import du CV
  const uploadCV = async (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    if (file.type !== 'application/pdf') {
      setError('Le CV doit être au format PDF.')
      return
    }

    setCvFile(file)
    setError('')
    setUploading(true)
    setCvProfile(null)

    try {
      const formData = new FormData()

      formData.append('cv', file)

      const response = await fetch(
        'http://localhost:5000/api/cv/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Erreur lors de l’analyse du CV.'
        )
      }

      // Afficher le profil
      setCvProfile(data.profile)

      // Sauvegarder le profil dans le navigateur
      localStorage.setItem(
        'jobMatchProfile',
        JSON.stringify(data.profile)
      )

    } catch (error) {
      console.error(error)

      setError(
        error.message || 'Impossible d’analyser le CV.'
      )

      setCvFile(null)

    } finally {
      setUploading(false)
    }
  }

  // Analyse de l'offre
  const analyzeJob = async () => {
    if (!jobOffer.trim()) {
      setError("Colle une offre d’emploi.")
      return
    }

    const profileToAnalyze =
      cvProfile
        ? JSON.stringify(cvProfile)
        : profile

    if (!profileToAnalyze.trim()) {
      setError(
        'Importe ton CV ou renseigne ton profil manuellement.'
      )
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch(
        'http://localhost:5000/api/analyze',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            profile: profileToAnalyze,
            additionalInfo,
            jobOffer,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Erreur lors de l’analyse.'
        )
      }

      setAnalysis(data)

    } catch (error) {
      console.error(error)

      setError(
        error.message ||
        'Impossible de contacter le serveur.'
      )

    } finally {
      setLoading(false)
    }
  }

  // Informations selon le niveau de matching
  const getMatchInfo = (level) => {
    switch (level) {
      case 'excellent':
        return {
          label: 'Excellent match',
          className: 'excellent',
        }

      case 'interesting':
        return {
          label: 'Match intéressant',
          className: 'interesting',
        }

      case 'low':
        return {
          label: 'Faible priorité',
          className: 'low',
        }

      default:
        return {
          label: 'Analyse terminée',
          className: '',
        }
    }
  }

  const matchInfo =
    analysis
      ? getMatchInfo(analysis.matchLevel)
      : null

  // Supprimer le profil sauvegardé
  const deleteProfile = () => {
    localStorage.removeItem('jobMatchProfile')

    setCvProfile(null)
    setCvFile(null)
    setAnalysis(null)
    setError('')
  }

  return (
    <div className="app">

      <header className="header">

        <h1>
          Job Match AI
        </h1>

        <p>
          Analyse la compatibilité entre ton profil
          et une offre d’emploi.
        </p>

      </header>

      <main>

        {/* ========================= */}
        {/* CV */}
        {/* ========================= */}

        <section className="form-section">

          <h2>
            📄 Ton CV
          </h2>

          <p className="section-description">
            Importe ton CV pour générer automatiquement
            ton profil professionnel.
          </p>

          <label className="upload-button">

            {uploading
              ? 'Analyse du CV...'
              : 'Choisir mon CV'}

            <input
              type="file"
              accept=".pdf"
              onChange={uploadCV}
              hidden
            />

          </label>

          {cvFile && !uploading && (

            <div className="file-success">

              ✅ {cvFile.name}

            </div>

          )}

          {cvProfile && (

            <div className="cv-profile">

              <h3>
                {cvProfile.title}
              </h3>

              <p>
                {cvProfile.summary}
              </p>

              <h4>
                Compétences
              </h4>

              <div className="badges">

                {cvProfile.skills?.map(
                  (skill, index) => (

                    <span
                      className="badge transferable"
                      key={index}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

              <button
                className="delete-profile"
                onClick={deleteProfile}
              >
                🗑️ Supprimer mon profil
              </button>

            </div>

          )}

        </section>


        {/* ========================= */}
        {/* PROFIL MANUEL */}
        {/* ========================= */}

        {!cvProfile && (

          <section className="form-section">

            <h2>
              ✍️ Ou renseigne ton profil
            </h2>

            <div className="field">

              <label htmlFor="profile">
                Ton profil
              </label>

              <textarea
                id="profile"
                value={profile}
                onChange={(e) =>
                  setProfile(e.target.value)
                }
                placeholder="Ex : Développeuse Fullstack React, Node.js, PHP..."
              />

            </div>

          </section>

        )}

        <section className="form-section">

          <h2>
            🧠 Informations complémentaires
          </h2>

          <p className="section-description">
            Ajoute les informations qui ne figurent pas forcément
            dans ton CV et qui peuvent aider à mieux évaluer
            les offres.
          </p>

          <div className="field">

            <label htmlFor="additionalInfo">
              Tes préférences et informations
            </label>

    <textarea
      id="additionalInfo"
      value={additionalInfo}
      onChange={(e) =>
        setAdditionalInfo(e.target.value)
      }
      placeholder={`Exemple :
Je recherche une alternance en développement / Data / IA.
Je suis disponible à partir de septembre 2026.
Je privilégie le télétravail partiel.
Je suis mobile en Île-de-France.
Je recherche un environnement où je peux progresser en IA.`}
    />

  </div>

</section>


        {/* ========================= */}
        {/* OFFRE */}
        {/* ========================= */}

        <section className="form-section">

          <h2>
            💼 Offre d'emploi
          </h2>

          <div className="field">

            <label htmlFor="jobOffer">
              Description de l'offre
            </label>

            <textarea
              id="jobOffer"
              value={jobOffer}
              onChange={(e) =>
                setJobOffer(e.target.value)
              }
              placeholder="Colle ici le descriptif de l'offre..."
            />

          </div>

          <button
            onClick={analyzeJob}
            disabled={loading}
          >

            {loading
              ? 'Analyse en cours...'
              : 'Analyser mon match'}

          </button>

          {error && (

            <p className="error">
              {error}
            </p>

          )}

        </section>


        {/* ========================= */}
        {/* RESULTAT */}
        {/* ========================= */}

        {analysis && (

          <section className="result">

            <h2>
              Résultat de l’analyse
            </h2>


            {/* SCORE */}

            <div className="score-section">

              <div className="score-number">
                {analysis.score}%
              </div>

              <div
                className={`match-level ${matchInfo.className}`}
              >
                {matchInfo.label}
              </div>

              <div className="score-bar">

                <div
                  className="score-progress"
                  style={{
                    width: `${analysis.score}%`,
                  }}
                />

              </div>

            </div>


            {/* COMPETENCES CORRESPONDANTES */}

            <div className="result-block">

              <h3>
                ✅ Compétences correspondantes
              </h3>

              <div className="badges">

                {analysis.matchingSkills?.length > 0
                  ? analysis.matchingSkills.map(
                      (skill, index) => (

                        <span
                          className="badge success"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )
                  : (
                    <p>
                      Aucune compétence correspondante.
                    </p>
                  )}

              </div>

            </div>


            {/* COMPETENCES MANQUANTES */}

            <div className="result-block">

              <h3>
                ⚠️ Compétences à développer
              </h3>

              <div className="badges">

                {analysis.missingSkills?.length > 0
                  ? analysis.missingSkills.map(
                      (skill, index) => (

                        <span
                          className="badge warning"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )
                  : (
                    <p>
                      Aucune compétence importante
                      manquante détectée.
                    </p>
                  )}

              </div>

            </div>


            {/* COMPETENCES TRANSFERABLES */}

            <div className="result-block">

              <h3>
                🔄 Compétences transférables
              </h3>

              <div className="badges">

                {analysis.transferableSkills?.length > 0
                  ? analysis.transferableSkills.map(
                      (skill, index) => (

                        <span
                          className="badge transferable"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )
                  : (
                    <p>
                      Aucune compétence transférable.
                    </p>
                  )}

              </div>

            </div>


            {/* POINTS FORTS */}

            <div className="result-block">

              <h3>
                💪 Tes points forts
              </h3>

              <ul className="strengths">

                {analysis.strengths?.map(
                  (strength, index) => (

                    <li key={index}>
                      {strength}
                    </li>

                  )
                )}

              </ul>

            </div>


            {/* CONSEIL */}

            <div className="advice">

              <h3>
                💡 Conseil pour ta candidature
              </h3>

              <p>
                {analysis.advice}
              </p>

            </div>


            {/* RECOMMANDATION */}

            <div className="recommendation">

              <h3>
                🎯 Recommandation
              </h3>

              <p>

                {analysis.recommendation === 'postuler' &&
                  '🟢 Postule : ton profil correspond très bien à cette offre.'
                }

                {analysis.recommendation === 'postuler_en_adaptant' &&
                  '🟠 Postule, mais adapte ton CV pour mettre en avant les compétences pertinentes.'
                }

                {analysis.recommendation === 'faible_priorite' &&
                  '🔴 Cette offre semble moins prioritaire par rapport à ton profil actuel.'
                }

              </p>

            </div>

          </section>

        )}

      </main>

    </div>
  )
}

export default App