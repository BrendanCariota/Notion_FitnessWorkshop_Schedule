const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init Client
const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

// Our database ID
const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getWorkshops() {

    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST'
    }

    const { results } = await notion.request(payload)

    const workshops = results.map(page => {

        return {
            id: page.id,
            title: page.properties.Name.title[0].text.content,
            date: page.properties.Date.date.start,
            description: page.properties.Description.rich_text[0].text.content,
            tags: page.properties.Tags.rich_text[0].text.content,

        }
    })

    return workshops
}