const main_part = document.querySelector('.main_part')

const renderCards = (list) => {
    main_part.innerHTML = ''   // clear first

    list.forEach((r) => {
        const stars = '★'.repeat(r.Rating)

        const cards = document.createElement('li')
        cards.classList.add('card')

        cards.innerHTML = `
            <img class='card_img' src=${r.Image}>
            <h1>${r.Name}</h1>
            <p>ID: ${r.ID}</p>
            <p>Email: ${r.Email}</p>
            <p>Phone: ${r.Phone}</p>
            <p>${r.Category}</p>
            <p class='ratings'>${stars}</p>
        `

        main_part.appendChild(cards)

        cards.addEventListener('click', () => {
            window.location.href = `/pages/main.html?id=${r.ID}`
        })
    })
}

const loading_data = async () => {
    const api = await fetch('/data/contacts.json')
    const res = await api.json()

    renderCards(res)   // show everyone initially

    const category_btn3 = document.querySelectorAll(".category_btn")

    category_btn3.forEach((btn) => {
        btn.addEventListener('click', () => {
            const category = btn.textContent
            const filters = res.filter((c) => c.Category === category)
            renderCards(filters)   // re-render with filtered list
        })
    })

     const category_btn4 = document.querySelector(".category_btnALL")
     category_btn4.addEventListener('click' , ()=>{
        
        renderCards(res) 
     })

     const search_btn = document.querySelector('.search-btn')
     const serch_input = document.querySelector('.search')
     search_btn.addEventListener('click', ()=>{
         const text = serch_input.value.toLowerCase() 
         const filters = res.filter((p)=> p.Name.toLowerCase().includes(text))
         renderCards(filters) 

     })





       const menu = document.querySelector('.sort')
       menu.addEventListener('change' , (event)=>{
        const select= event.target.value
        if(select === 'high-rating'){
          const s =  [...res].sort((a,b) => b.Rating - a.Rating)
           renderCards(s)
        }

        else if (select === 'low-rating'){
          const s =  [...res].sort((a,b) => a.Rating - b.Rating)
           renderCards(s)
        }
        else if (select === 'low-price'){
          const s =  [...res].sort((a,b) => a.MessagePrice- b.MessagePrice)
           renderCards(s)
        }
        else if (select === 'high-price'){
          const s =  [...res].sort((a,b) => b.MessagePrice - a.MessagePrice)
           renderCards(s)
        }

    })
     
}


loading_data()