const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const service = params.get('service')
console.log(id)


const main_parts = document.querySelector('.main_part')

const cards = (match)=>{
      const stars = '★'.repeat(match.Rating)
       main_parts.innerHTML = `
    <img class='card_img' src='../${match.Image}'>
    <h1>${match.Name}</h1>
  

    <p class='ratings'>${stars}</p>
  
    <details class="bio-dropdown">
        <summary>Read Bio</summary>
    <p>${match.Bio}</p>
       </details>
    <p>${match.Category}</p>
    <p>Message: ${match.MessagePrice}</p>
    <p>Video Call: ${match.CallPrice}</p>
`
}
const loading = async ()=>{
    const api = await fetch('../data/contacts.json')
    const res = await api.json()
    
    
    const match = res.find(r => String(r.ID) === id)
    
    if(match){
        
      cards(match)
    }
    const booking = document.querySelector('.simple-form')
    const textOutput = document.querySelector('.text')
    booking.addEventListener('submit', (e)=>{
        e.preventDefault()
        const client_name = document.querySelector('#client-name').value
        const emails = document.querySelector('#client-email').value
        const dates = document.querySelector('#appt-date').value
        const times = document.querySelector('#appt-time').value
        let price
        if (service === 'message'){
            price = match.MessagePrice
        }
        else{
           price = match.CallPrice
        }
           
       const params = new URLSearchParams({
             id: match.ID,
             service: service,
             client_name: client_name,
             emails:emails,
             dates:dates,
             times:times,
             price:price,
             
             
       })
        window.location.href = `./confirmation.html?${params.toString()}`


        /*//
        textOutput.innerHTML = `
         <h3>Booking Confirmed</h3>

        <h4>Creator: ${match.Name}</h4>
        <h4>Name: ${client_name}</h4>
        <p>Email: ${emails}</p>
        <p>Date: ${dates}</p>
        <p>Time: ${times}</p>
        <p>Price $:${price}</p>
        `
        /*///
    
    

       booking.reset()
    
    })
    
   
}




    loading()