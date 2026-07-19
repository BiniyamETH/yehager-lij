


const params = new URLSearchParams(window.location.search)
const id = params.get('id')
console.log(id )

const main_parts = document.querySelector('.main_part')

const loading = async ()=>{
    const api = await fetch('/data/contacts.json')
    const res = await api.json()
    
    
    const match = res.find(r => String(r.ID) === id)
    
    if(match){
         const stars = '★'.repeat(match.Rating)
       main_parts.innerHTML = `
    <img class='card_img' src='/${match.Image}'>
    <h1>${match.Name}</h1>
    <p>ID: ${match.ID}</p>
    <p>Email: ${match.Email}</p>
    <p>Phone: ${match.Phone}</p>
    <p class='ratings'>${stars}</p>
    <button class="action-btn">Message</button>
    <button class="action-btn2">Video Call</button>
    <p>${match.Bio}</p>
    <p>${match.Category}</p>
    <p>Message: ${match.MessagePrice}</p>
    <p>Video Call: ${match.CallPrice}</p>
`
          console.log(match)
          console.log(match.Image)

    }
    const btn1 = document.querySelector('.action-btn')
    btn1.addEventListener('click' , ()=>{
       
       window.location.href = `/pages/booking.html?id=${match.ID}&service=message`
      
       
    })
    
    const btn2 = document.querySelector('.action-btn2')
    btn2.addEventListener('click' , ()=>{
        window.location.href = `/pages/booking.html?id=${match.ID}&service=video`
    })
        
    }

    loading()