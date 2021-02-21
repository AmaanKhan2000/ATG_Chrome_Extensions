const submit = document.getElementById('button');
const boolValue = document.querySelector('.bool-value');

const fetchApi = async(userInput) => {
  const response = await fetch(`https://602e7c2c4410730017c50b9d.mockapi.io/js_ext_task/${userInput}`);

  const resApi = await response.json();

  return resApi;
}



submit.addEventListener('click',(e) => {
  const search = Number(document.getElementById('search').value);

  const list = [1,2,3,4,5];
  if(!list.includes(search)){
    const error = document.querySelector('.errtext');
    error.innerHTML = `<div class="alert alert-danger text-center">
    Please enter a Valid Input
  </div>`;
  setTimeout(()=>{
    error.innerHTML=""
  },3000)
  }else{

    fetchApi(search).then(data =>{
      boolValue.innerHTML = `<p class="alert alert-warning text-center">The boolean value for this id is ${data.bool_flag}</p>`;
      setTimeout(()=>{
        boolValue.innerHTML=""
      },3000)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data.test_num);
      })})
      .catch(err => 
      console.log(search));
  }


  e.preventDefault()


} );

const displayData = (results) => {

} 




