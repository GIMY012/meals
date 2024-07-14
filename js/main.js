let catRow = document.getElementById('categories-row')
let areaRow = document.getElementById('area-row')
let ingRow = document.getElementById('ing-row')
let oneItem = document.getElementById('oneItem')



$('.icon-div').on('click', function (e)
{

  if ($('aside').css('left') == '0px')
  {
    $('aside').animate({ left: `-${ $('div.w-200').outerWidth(true) }px` }, 500)
    $('.fa-bars').removeClass('d-none')
    $('.open-close-icon').addClass('d-none')
    // console.log(1)
    $("li").animate({
      top: 300
    }, 500)


  } else
  {
    $('aside').animate({ left: `0px` }, 500)
    $('.fa-bars').addClass('d-none')
    $('.open-close-icon').removeClass('d-none')
    // console.log(2)
    for (let i = 0; i < 5; i++)
    {
      $("li").eq(i).animate({
        top: (0 + i) * 40 + 'px'
      }, (i + 5) * 100)
    }
  }

})
$('.icon-di').on('click', function (e)
{

  $('aside').animate({ left: `-${ $('div.w-200').outerWidth(true) }px` }, 500)
  console.log(123);
})


/************* str   ****************/
function str()
{
  $('aside').animate({ left: `-${ $('div.w-200').outerWidth(true) }px` }, 500)
  $('.fa-bars').removeClass('d-none')
  $('.open-close-icon').addClass('d-none')
}



$(window).on("load", str);
/*************************************/


function searchBlock()
{
  $('#search').removeClass('d-none')
  $('#search').addClass('d-block')
}
function searchNone()
{
  $('#search').addClass('d-none')
}


$('.Search').on('click', function ()
{
  $('#contact').addClass('d-none')
  clear()
  searchBlock();
  str()
})

/******************************************/
class Display
{
  constructor(){
    clearAll()
  }
  displayArea(array)
  {
    clearAll()
    let box = ``
    for (let i = 0; i < array.length; i++)
    {
      box += ` <div class="col-md-3 text-center py-5 ">
            <i class="fa-solid fa-house-laptop fa-4x my-5" onclick="getArea('${array[i].strArea}') "></i>
            <h3>${ array[i].strArea }</h3>
          </div>`
    }
    areaRow.innerHTML = box;
  }
  displayCategories(categories)
  {
    let box = ``
    for (let i = 0; i < categories.length; i++)
    {
      box += `<div class="col-md-3 py-5" onclick="getcat('${categories[i].strCategory}')">
            <div class="inner position-relative overflow-hidden"  >
              <img src="${ categories[i].strCategoryThumb }"  data-id="${ categories[i].idCategory }" class="w-100 rounded-3" alt="food Image">
            
            <div class="position-absolute  text-center cat-caption">
              <h3 class="catcat" data-cat="${ categories[i].strCategory }">${ categories[i].strCategory }</h3>
              <p >${ categories[i].strCategoryDescription }</p>
            </div>
          </div>
          </div>
    `
    }
    catRow.innerHTML = box
  }
  displayIng(ing)
  {
    let box = ''
    for (let i = 0; i < 20; i++)
    {
      console.log(ing[i].strIngredient);
      box += `  <div class="col-md-3 py-5 onclick="getIng('${ing[i].strIngredient}')" ">
            <i class="fa-solid fa-drumstick-bite fa-4x" onclick="getIng('${ing[i].strIngredient}')" ></i>
            <h3 data-id="${ ing[i].idIngredient }">${ ing[i].strIngredient }</h3>
            <p>${ ing[i].strDescription.split(' ').slice(0, 20).join(' ') }</p>
          </div>
  `
      ingRow.innerHTML = box
    }

  }
  displayOneItem(arr)
  {
    clearAll()
    console.log(arr);
    let box
     box= `
     <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <img src="${ arr.strMealThumb }" alt="" class="w-100 rounded-3">
          <h2>${ arr.strMeal }</h2>
        </div>
        <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${ arr.strInstructions }</p>
          <h3><span class="fw-bolder">Area : </span>${ arr.strArea }</h3>
          <h3><span class="fw-bolder">Category : </span>${ arr.strCategory }</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap" id="list">
          </ul>

          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">

            <li class="alert alert-danger m-2 p-1">${arr.strTags}</li>
           
          </ul>

          <a target="_blank" href="${arr.strMealThumb}"
            class="btn btn-success">Source</a>
          <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
      </div>
    </div>
    `
    oneItem.innerHTML=box

  }
}
class GetData
{
  constructor(){
    clearAll()
  }

  async oneItem(id)
  {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ id }`)
    let response = await api.json()
    console.log(response.meals[0]);
    new Display().displayOneItem(response.meals[0])
  }
 
  wholeData()
  {

  }
  async byIng()
  {
    let api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response = await api.json()
    // console.log(response.meals);
    new Display().displayIng(response.meals)
  }
  async byArea()
  {
    let api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let response = await api.json()
    // console.log(response);
    new Display().displayArea(response.meals)
  }
  async fetchData()
  {
    let api = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let response = await api.json()
    // console.log(response);
    new Display().displayCategories(response.categories)
  }
 
}
function clear()
{
  catRow.innerHTML = ''
  areaRow.innerHTML = ''
  ingRow.innerHTML = ''
}
let get = new GetData();
// get.oneItem
// get.byIng()
// get.byArea()
/************************      inputs validation        ***************************/

function validateName(name)
{
  const nameRegex = /^[A-Z\s][a-z]*$/;
  return nameRegex.test(name);
}
function validateAge(age)
{
  const ageRegex = /^\d{2}$/;
  return ageRegex.test(age);
}
function validatePhoneNumber(phone)
{
  const phoneNumberRegex = /^\d{11}$/;
  return phoneNumberRegex.test(phone);
}
function validateEmail(email)
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validatePassword(password)
{
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
function validateRetypePassword(retypePassword, password)
{
  return retypePassword === password;
}

document.getElementById('registrationForm').addEventListener('submit', function (event)
{
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const retypePassword = document.getElementById('retypePassword').value;

  if (!validateName(name))
  {

    $('#nameAlert').removeClass('d-none')
    return false;
  }
  if (!validateEmail(email))
  {

    $('#mailAlert').removeClass('d-none')
    return false;
  }
  if (!validatePhoneNumber(phone))
  {

    $('#phoneAlert').removeClass('d-none')
    return false;
  }
  if (!validateAge(age))
  {
    // alert('Invalid age');

    $('#ageAlert').removeClass('d-none')

    return false;
  }
  if (!validatePassword(password))
  {

    $('#PassAlert').removeClass('d-none')
    return false;
  }
  if (!validateRetypePassword(retypePassword, password))
  {

    $('#rePassAlert').removeClass('d-none')
    return false;
  }

  // $('.formButton').removeAttr('disabled');
  //  alert('Registration successful!');
  $('div.alert').addClass('d-none')

  return true;
});
// document.getElementsByName('input').addEventListener('keydown',function () {

//     $('#PassAlert').removeClass('d-none')

// })








/*******************************        end input validations     ********************/







/*********on click handling  ******************/
$('.Categories').on('click', function ()
{
  $('#contact').addClass('d-none')

  clear()
  searchNone()
  str()
  new GetData().fetchData();
})
$('.Area').on('click', function ()
{
  $('#contact').addClass('d-none')

  clear()
  searchNone()
  str()
  new GetData().byArea()
})
$('.Ingredients').on('click', function ()
{
  $('#contact').addClass('d-none')

  clear()
  searchNone()
  str()
  new GetData().byIng()
})
$('.Contact').on('click', function ()
{
  str()
  clear()
  searchNone()
  // console.log(123);
  $('#contact').fadeIn(50);
  $('#contact').removeClass('d-none')

})
function clearAll()
{
  $('#contact').addClass('d-none')
  addAreaa.innerHTML=''
  addcat.innerHTML=''
  oneItem.innerHTML=''
  addIngg.innerHTML=''
  clear()
  searchNone()
  str()
}



/********************       cat on click       ********************************/
async function getcat(cat='Seafood'){
  clearAll()
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  let response = await api.json()
  console.log(response.meals[0]);
  displaycate(response.meals)
}
// getcat()


async function displaycate(arr) {
  clearAll()
  box=''
 for (let i = 0; i < arr.length; i++) {
  box+=`
  <div class="col-md-3">
                <div onclick="new GetData().oneItem('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="cat-caption position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
  `
  addcat.innerHTML=box
  
 }
  
}
// https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
async function getArea(area='Canadian'){
  clearAll()
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let response = await api.json()
  console.log(response.meals[0]);
  displaycate(response.meals)
}
async function displayArea(arr) {
  box=''
 for (let i = 0; i < arr.length; i++) {
  box+=`
  <div class="col-md-3">
                <div onclick="new GetData().oneItem('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="cat-caption position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
  `
  addAreaa.innerHTML=box
  
 }
}
async function getIng(ing='chicken_breast'){
  clearAll()
  console.log(ing);
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
  let response = await api.json()
  // console.log(response.meals[0]);
  displayIng(response.meals)
}
async function displayIng(arr) {
  clearAll()
  box=''
 for (let i = 0; i < arr.length; i++) {
  box+=`
  <div class="col-md-3">
                <div onclick="new GetData().oneItem('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="cat-caption position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
  `
  addIngg.innerHTML=box
  
 }
}
// addIngg
async function fetchs(a) {
  let api =await fetch(`www.themealdb.com/api/json/v1/1/search.php?f=${a}`)
  let rs= await api.json()
  console.log(rs);
  
}
char.addEventListener('input',function (e) {
  console.log(e.data);
  fetchs(e.data)
  
})