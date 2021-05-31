const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('p1')
const message2 = document.getElementById('p2')
const wIcon=document.getElementById('weatherIcon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = "Loading..."
    message2.textContent = ''
    wIcon.src=''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            }
            else {
                message1.textContent = "Location : " + data.address
                message2.textContent = "Forecast : " + data.forecast
                wIcon.src=data.weatherIcon
            }
        })
    })
})


