const toggleBtn = document.getElementById('toggleMenu')
const sideMenu = document.getElementById('sideMenu')
const main = document.getElementById('main')
const searchInput = document.getElementById('search-input');
const selectBtn = document.getElementById('select-btn');
const wrapperList = document.getElementById('wrapperList')
const arrowIcon = document.getElementById('arrow-icon')
const options = document.getElementById('options')
const predictBtn = document.getElementById('predictBtn')
const shows_list = document.getElementById('shows-list')
const posterImg = document.getElementById('posterImg')





toggleBtn.addEventListener("click", () => {

    sideMenu.classList.toggle('hidden');
    main.classList.toggle('hidden');

  });

  var selectedName = "";

  let movieNames = [];
  
  function fetchData(){
    return fetch('/Assets/Titles/amazon-titles.json')
      .then(response => response.json())
      .then(data => {
        movieNames = data;
      })
      .catch(error => console.error(error));
  }
  
  
  function openPage(ref) {
    localStorage.setItem('selectedName', selectedName);
    window.location.href = ref;
  }
  
  function alreadySelected(isSelected, name){  
    if(isSelected){
      return `<li onclick="updateName(this)" class="px-2 py-2 cursor-pointer bg-gray-600 rounded-sm">${name}</li>`;
    }
    else{
      return `<li onclick="updateName(this)" class="px-2 py-2 cursor-pointer hover:bg-gray-600 rounded-sm">${name}</li>`;
    }
  }
  
  function addShows(selectedShow){
    options.innerHTML = "";
  
    movieNames.forEach(name => {
      let isSelected = name == selectedShow ? true : false;
      let li = alreadySelected(isSelected, name);
  
      options.insertAdjacentHTML("beforeend", li)
    })
  
  }
  
  async function fetchDataAndCallAnotherFunction() {
    await fetchData();
    addShows();
  }
  fetchDataAndCallAnotherFunction();
  
  
  function updateName(selectedLi){
    searchInput.value = "";
    selectedName = selectedLi.innerText;
    addShows(selectedLi.innerText);
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
    wrapperList.classList.add('hidden');
    arrowToggler();
  }
  
  
  searchInput.addEventListener("keyup", () => {
    let arr = []
    let searchVal = searchInput.value.toLowerCase();
  
    arr = movieNames.filter(data => {
      return data.toLowerCase().startsWith(searchVal);
    }).map(data => alreadySelected(selectedName===data,data)).join("");
  
    options.innerHTML = arr ? arr : `<li>Show not found</li>`;
  });
  
  
  
  selectBtn.addEventListener("click", () => {
  
    wrapperList.classList.toggle('hidden');
    arrowToggler();
  });
  
  
  function arrowToggler(){
    
    const isClicked = wrapperList.classList.contains('hidden');

    if(selectedName == "")
    {
      predictBtn.classList.add("hidden");
    }
    else
    {
      predictBtn.classList.remove("hidden");
    }
    
    if (isClicked)
    {
      arrowIcon.classList.remove("fa-angle-up");
      arrowIcon.classList.add("fa-angle-down");
    }
  
    else{
      arrowIcon.classList.remove("fa-angle-down");
      arrowIcon.classList.add("fa-angle-up");
    }
  }