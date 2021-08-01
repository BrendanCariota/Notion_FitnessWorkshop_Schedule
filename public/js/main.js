const workshopsEl = document.querySelector('#workshops')
const loadingEl = document.querySelector('#loading')
let loading = false

// Get Workshops
const getWorkshopsFromBackend = async () => {
    loading = true
    const res = await fetch('http://localhost:5000/workshops')
    const data = await res.json()
    loading = false
    return data
}

// Add Workshops to DOM
const addWorkshopsToDom = async () => {
    const workshops = await getWorkshopsFromBackend()
    
    if(!loading) {
        loadingEl.innerHTML = ''
    }

    workshops.forEach(workshop => {
        const div = document.createElement('div')
        div.className = 'workshop'
        div.innerHTML = `
            <h3>${workshop.title}</h3>
            <ul>
                <li><strong>Release Date: </strong> ${workshop.date}</li>
                <li><strong>Description: </strong> ${workshop.description}</li>
            </ul>
            <div class="tags">${workshop.tags}</div>
        `

        workshopsEl.appendChild(div)
    })
}

addWorkshopsToDom()