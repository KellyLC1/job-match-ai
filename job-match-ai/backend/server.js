require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'API Job Match AI OK 🚀'
  })
})

const analyzeRoute = require('./routes/analyze')
const cvRoutes = require('./routes/cv')

app.use('/api/analyze', analyzeRoute),
app.use('/api/cv', cvRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(
    'Gemini key:',
    process.env.GEMINI_API_KEY ? 'TROUVEE' : 'ABSENTE'
  )
})