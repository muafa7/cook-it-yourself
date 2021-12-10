/* eslint-disable no-alert */
import './component/app-bar';

function main() {
  const searchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const getDetailUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const renderDetailResult = (meals) => {
    const detailResultElement = document.querySelector('#result');
    detailResultElement.innerHTML = '';

    meals.forEach((meal) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i += 1) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
          );
        } else {
          break;
        }
      }

      detailResultElement.innerHTML += `
                <div class="container card" style="margin-top: 12px; padding: 20px;">
                    <div class="col-12">
                        <h1 class="text-center fw-bold">${meal.strMeal}</h1>
                        <img src="${meal.strMealThumb}" class="rounded mx-auto d-block" style="max-width: 100%; height: auto" alt="${meal.strMeal}">
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h4 class="text-start fw-bold">Ingredients:</h4>
                            <ul>${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>
                        </div>
                        <div class="col-sm-12">
                            <h4 class="text-start fw-bold">Steps :</h4>
                            <p class="text-start">${meal.strInstructions}</p>
                        </div>
                    </div>
                </div>
            `;
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  const getDetail = (mealId) => {
    fetch(`${getDetailUrl}${mealId}`)
      .then((response) => response.json())

      .then((responseJson) => {
        if (responseJson.meals == null) {
          showResponseMessage('Not Found');
        } else {
          renderDetailResult(responseJson.meals);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const renderSearchResult = (meals) => {
    const searchResultElement = document.querySelector('#result');
    searchResultElement.innerHTML = '';

    meals.forEach((meal) => {
      searchResultElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 card-title>${meal.strMeal}</h5>
                            <p>From : ${meal.strArea}</p>
                            <button type="button" class="btn button-detail" id="${meal.idMeal}">Get Detail</button>
                        </div>
                    </div>
                </div>
            `;
    });

    const buttons = document.querySelectorAll('.button-detail');
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const mealId = event.target.id;
        getDetail(mealId);
      });
    });
  };

  const searchFood = (keyword) => {
    fetch(`${searchUrl}${keyword}`)
      .then((response) => response.json())

      .then((responseJson) => {
        if (responseJson.meals == null) {
          showResponseMessage('Not Found');
        } else {
          renderSearchResult(responseJson.meals);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const searchElement = document.querySelector('#searchButton');
    const search = document.querySelector('#searchContainer');

    searchElement.addEventListener('click', () => {
      const keyword = search.value;
      searchFood(keyword);
    });
  });
}

export default main;
