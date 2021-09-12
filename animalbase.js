"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  /* 
  const catsBtn = document.querySelector(`[data-filter="cat"]`);
  const dogsBtn = document.querySelector(`[data-filter="dog"]`);
  const allBtn = document.querySelector(`[data-filter="*"]`);
  catsBtn.addEventListener("click", function () {
    const cats = allAnimals.filter(isCat);
    displayList(cats);
  });
  dogsBtn.addEventListener("click", function () {
    const dogs = allAnimals.filter(isDog);
    displayList(dogs);
  });
  allBtn.addEventListener("click", function () {
    const animalsAll = allAnimals.filter(all);
    displayList(animalsAll);
  }); */
  registerButtons();
  loadJSON();
}

function registerButtons() {
  document
    .querySelectorAll(`[data-action="filter"]`)
    .forEach((button) => button.addEventListener("click", selectFilter));
  document
    .querySelectorAll(`[data-action="sort"]`)
    .forEach((button) => button.addEventListener("click", selectSort));
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}
function selectFilter(event) {
  const filter = event.target.dataset.filter;
  console.log("user selecter", filter);
  filterList(filter);
}
function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  console.log("user selecter", sortBy);
  sortList(sortBy);
}
function filterList(filterBy) {
  // create filtered list of only cats
  let filteredList = allAnimals;
  if (filterBy === "cat") {
    filteredList = allAnimals.filter(isCat);
  } else if (filterBy === "dog") {
    filteredList = allAnimals.filter(isDog);
  }

  displayList(filteredList);
}
function isCat(animal) {
  if (animal.type === "cat") {
    return true;
  }
  return false;
}
function isDog(animal) {
  if (animal.type === "dog") {
    return true;
  }
  return false;
}
/* function all(animal) {
  return true;
} */
function sortList(sortBy) {
  let sortedList = allAnimals;
  if (sortBy === "name") {
    sortedList = sortedList.sort(sortByName);
  } else if (sortBy === "type") {
    sortedList = sortedList.sort(sortByType);
  }

  displayList(sortedList);
}
function sortByName(animalA, animalB) {
  if (animalA.name < animalB.name) {
    return -1;
  }
  return 1;
}
function sortByType(animalA, animalB) {
  if (animalA.type < animalB.type) {
    return -1;
  }
  return 1;
}
function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
