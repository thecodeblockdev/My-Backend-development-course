const validator = require("validator");
const superHero = require("superhero-name-library");
const isAnEmail = validator.isEmail("jack@sparrow.com");
console.log(isAnEmail);

const randomSuperHeroName = superHero.allNames();
console.log(randomSuperHeroName);
