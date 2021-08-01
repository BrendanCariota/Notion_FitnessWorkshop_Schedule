const express = require('express')
const getWorkshops = require('./services/notion')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

app.get('/workshops', async (req, res) => {
    const workshops = await getWorkshops()
    res.json(workshops)
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))

