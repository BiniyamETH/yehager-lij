const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const service = params.get('service')
console.log(id)
 
const client_name = params.get('client_name')
const emails = params.get('emails')
const dates = params.get('dates')
const times = params.get('times')
const price = params.get('price')

const load =  async ()=>{
const api = await fetch('../data/contacts.json')
const res = await api.json()

const match = res.find(r => String(r.ID) === id)
  let price
        if (service === 'message'){
            price = match.MessagePrice 
        }
        else{
           price = match.CallPrice 
        }
 
const confirmations = document.querySelector('.confirmation')
confirmations.innerHTML = `
         <h3>Booking Confirmed</h3>
         
        <h4>Creator: ${match.Name}</h4>
        <h4>Name: ${client_name}</h4>
        <p>Email: ${emails}</p>
        <p>Date: ${dates}</p>
        <p>Time: ${times}</p>
        <p>Price $:${price}</p>
        `
}
load()