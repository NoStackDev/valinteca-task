const userEmail = window.localStorage.getItem('userEmail')
const captionEle = document.getElementById('caption-email')

captionEle.innerText = userEmail
