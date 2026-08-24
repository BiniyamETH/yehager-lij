const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const mainPart = document.querySelector('.main_part');
const commentContainer = document.querySelector('.comments');
const reviewForm = document.querySelector('#reviewForm');

const storageKey = `reviews_contact_${id}`;   // built from the URL, available everywhere

const loading = async () => {
  const api = await fetch('../data/contacts.json');
  const res = await api.json();

  const match = res.find(r => String(r.ID) === id);

  if (!match) {
    console.log('Contact not found');
    return;
  }

  const stars = '★'.repeat(match.Rating);

  mainPart.innerHTML = `
    <img class='card_img' src='../${match.Image}'>
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
  `;

  const btn1 = document.querySelector('.action-btn');
  if (btn1) {
    btn1.addEventListener('click', () => {
      window.location.href = `./booking.html?id=${match.ID}&service=message`;
    });
  }

  const btn2 = document.querySelector('.action-btn2');
  if (btn2) {
    btn2.addEventListener('click', () => {
      window.location.href = `./booking.html?id=${match.ID}&service=video`;
    });
  }
};

const loaclstrog = () => {
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#userName').value;
    const comment = document.querySelector('#userComment').value;

    const getInput = { 
      name: name, 
      comment: comment 
    };
     const getAll_reviw = JSON.parse(localStorage.getItem(storageKey)) || []
     getAll_reviw.push(getInput)
      localStorage.setItem(storageKey, JSON.stringify(getAll_reviw))
     showReview()
     reviewForm.reset()
    
  });
};

const showReview = () => {
  const getAll_reviw = JSON.parse(localStorage.getItem(storageKey)) || []
  commentContainer.innerHTML = ``
  getAll_reviw.forEach((rev)=>{
    const div = document.createElement('div')
    div.classList.add('reviw')
    div.innerHTML = `
         <h3>NAME: ${rev.name}</h3>
          <h3> ${rev.comment}</h3>      
    `
    commentContainer.appendChild(div)
     
  })
};

  
const removes = document.querySelector('.remove')
removes.addEventListener('click', ()=>{
   localStorage.removeItem(storageKey)
   showReview();
})




loading();
loaclstrog();
showReview();

