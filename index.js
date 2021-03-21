const newsJSON = getNewsJSON();

//  <div class="news">

//   <div class="news__wrap">
//     <h2 class="news__titile">Заголовок</h2>
//     <div class="news__info">
//       <h5 class="news__author">Автор</h5>
//       <h5 class="news__date">21.12.2020 12:15:55</h5>
//     </div>
//   </div>

//   <p class="news__article">Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</p>

//   <div class="news__wrap">
//     <div class="news__check">Не прочитано</div>
//     <div class="news__link"><a href="./news.html" data-id="1">Подробнее</a></div>
//   </div>

// </div>

class News {
  render(news, isFullArticle = 'short', isLinkBack = 'next') {
    const {id, title, author, date, time, article} = news;

    if ( isElement('.news-container') ) {
      const newsContainer = document.querySelector('.news-container');
      createElement(newsContainer, 'div.news');
      
      const news = newsContainer.lastChild;
      createElement(news, 'div.news__wrap');
      
      const newsWrapOne = news.querySelector('.news__wrap');
      createElement(newsWrapOne, 'h2.news__titile', title);
      createElement(newsWrapOne, 'div.news__info');
      
      const newsInfo = newsWrapOne.querySelector('.news__info')
      createElement(newsInfo, 'h5.news__author', author);
      createElement(newsInfo, 'h5.news__date', `${date} ${time}`);

      if (isFullArticle === 'full') {
        createElement(news, 'p.news__article', article);
      } else {
        createElement(news, 'p.news__article', `${article.slice(0, 100)}...`);
      }
      


      createElement(news, 'div.news__wrap');

      let newsWrapTwo = news.querySelectorAll('.news__wrap');
      newsWrapTwo = newsWrapTwo[newsWrapTwo.length - 1];

      if (isFullArticle !== 'full') {
        createElement(newsWrapTwo, 'div.news__check', 'Не прочитано');
      }

      createElement(newsWrapTwo, 'div.news__link');

      const newsLink = newsWrapTwo.querySelector('.news__link');

      if (isLinkBack === 'back') {
        createElement(newsLink, 'a', 'Назад', `href="./index.html", data-id="${id}"`)
      } else {
        createElement(newsLink, 'a', 'Подробнее', `href="./news.html", data-id="${id}"`)
      }
    } else {
      return false
    }
  }
}

const newsCreate = new News;



if ( location.pathname.indexOf('/index') !== -1 ) {

  const newsCoutn = document.querySelector('.news-count');
  newsCoutn.innerHTML = String(`Колличество новостей: ${Object.keys(newsJSON).length}`);


  for (let id in newsJSON) {
    newsCreate.render(newsJSON[id]);
  }

  if ( isElement('.news') ) {
    const news = document.querySelectorAll('.news');
    const state = JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')) : {};
    
    news.forEach( item => {
      const checkElement = item.querySelector('.news__check');
      const newsID = String(item.querySelector('.news__link>a').getAttribute('data-id'));

      if(localStorage.getItem('state')) {
        const isState = JSON.parse(localStorage.getItem('state'))[newsID] in JSON.parse(localStorage.getItem('state'));
        
        if (isState) {
          checkElement.innerHTML = 'Прочитано';
          checkElement.style.color = '#64ff7e';
        }
      }

      item.onclick = (e) => {
        if (e.target.tagName !== 'A') return false;
        localStorage.setItem('news-id', newsID);

        // Если нету в localStorage, тогда записать.
        if ( !(state[newsID] in state) ) {
          state[newsID] = newsID;
          localStorage.setItem('state', JSON.stringify(state));
        }
      };
    })
  }
}



if ( location.pathname.indexOf('/news') !== -1 ) {
  const currentNewsID = localStorage.getItem('news-id');
  newsCreate.render(newsJSON[currentNewsID], 'full', 'back');
}



/* 
  Я рассматривал несколько вариантов для импорта новостей:
    1) Использовать сборщик WEBPACK, чтобы импортировать сам json, 
    но не стал нагружать тестовое задание модулями;
    2) Переименовать файл json в js и импортировать возможностями ES6, 
    не сработало, ибо по умолчанию браузер разрешает импорты только по HTTP.

  Исходя из этого я пришел к такому варианту.
*/
function getNewsJSON() {
  return {
    "1": {
      "id": "1",
      "title": "Анализ направлений.",
      "author": "Журавлева Злата Лукинична",
      "date": "07.04.2020",
      "time": "21:23:38",
      "article": "Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение существенных финансовых и административных условий. Таким образом рамки и место обучения кадров играет важную роль в формировании систем массового участия. Задача организации, в особенности же консультация с широким активом влечет за собой процесс внедрения и модернизации систем массового участия."
    },
    "2": {
      "id": "2",
      "title": "Товарищи!",
      "author": "Васильева Юлия Дмитриевна",
      "date": "12.01.2020",
      "time": "01:26:44",
      "article": "Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение существенных финансовых и административных условий. Таким образом рамки и место обучения кадров играет важную роль в формировании систем массового участия. Задача организации, в особенности же консультация с широким активом влечет за собой процесс внедрения и модернизации систем массового участия."
    },
    "3": {
      "id": "3",
      "title": "Разработка книги.",
      "author": "Журавлева Злата Лукинична",
      "date": "19.09.2020",
      "time": "22:59:03",
      "article": "Таким образом постоянный количественный рост и сфера нашей активности требуют определения и уточнения модели развития. Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности требуют определения и уточнения систем массового участия. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности играет важную роль в формировании новых предложений. Товарищи! сложившаяся структура организации играет важную роль в формировании модели развития."
    },
    "4": {
      "id": "4",
      "title": "Учимся думать.",
      "author": "Нестерова Эмилия Васильевна",
      "date": "28.08.2019",
      "time": "09:39:07",
      "article": "Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение существенных финансовых и административных условий. Таким образом рамки и место обучения кадров играет важную роль в формировании систем массового участия. Задача организации, в особенности же консультация с широким активом влечет за собой процесс внедрения и модернизации систем массового участия."
    },
    "5": {
      "id": "5",
      "title": "Как играть в шахматы?",
      "author": "Смирнов Михаил Матвеевич",
      "date": "21.03.2020",
      "time": "12:28:00",
      "article": "Разнообразный и богатый опыт начало повседневной работы по формированию позиции играет важную роль в формировании дальнейших направлений развития. Таким образом новая модель организационной деятельности представляет собой интересный эксперимент проверки форм развития. Значимость этих проблем настолько очевидна, что рамки и место обучения кадров способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт консультация с широким активом в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. С другой стороны сложившаяся структура организации способствует подготовки и реализации новых предложений."
    },
    "6": {
      "id": "6",
      "title": "Соображения высшего порядка.",
      "author": "Черняев Руслан Егорович",
      "date": "07.10.2020",
      "time": "04:26:14",
      "article": "Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки модели развития. Идейные соображения высшего порядка, а также сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке новых предложений. Товарищи! новая модель организационной деятельности требуют определения и уточнения дальнейших направлений развития."
    },
    "7": {
      "id": "7",
      "title": "Анализ направлений.",
      "author": "Смирнов Михаил Матвеевич",
      "date": "26.02.2020",
      "time": "22:24:27",
      "article": "Не следует, однако забывать, что реализация намеченных плановых заданий требуют определения и уточнения дальнейших направлений развития. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке существенных финансовых и административных условий. Равным образом новая модель организационной деятельности требуют от нас анализа направлений прогрессивного развития. Повседневная практика показывает, что начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений."
    },
    "8": {
      "id": "8",
      "title": "В чем смысл JS?",
      "author": "Смирнов Михаил Матвеевич",
      "date": "02.03.2020",
      "time": "14:13:28",
      "article": "Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки модели развития. Идейные соображения высшего порядка, а также сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке новых предложений. Товарищи! новая модель организационной деятельности требуют определения и уточнения дальнейших направлений развития."
    },
    "9": {
      "id": "9",
      "title": "Когда можно будет гулять во снах?",
      "author": "Черняев Руслан Егорович",
      "date": "13.06.2020",
      "time": "21:31:36",
      "article": "Таким образом постоянный количественный рост и сфера нашей активности требуют определения и уточнения модели развития. Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности требуют определения и уточнения систем массового участия. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности играет важную роль в формировании новых предложений. Товарищи! сложившаяся структура организации играет важную роль в формировании модели развития."
    },
    "10": {
      "id": "10",
      "title": "Определения и уточнения модели.",
      "author": "Нестерова Эмилия Васильевна",
      "date": "05.04.2020",
      "time": "16:17:46",
      "article": "Разнообразный и богатый опыт начало повседневной работы по формированию позиции играет важную роль в формировании дальнейших направлений развития. Таким образом новая модель организационной деятельности представляет собой интересный эксперимент проверки форм развития. Значимость этих проблем настолько очевидна, что рамки и место обучения кадров способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт консультация с широким активом в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. С другой стороны сложившаяся структура организации способствует подготовки и реализации новых предложений."
    }
  }
}

function createElement(where, what, content='none', attribute='none', insert='end') {
  /* 
  создать элементы: 
    where - где-куда? (DOM Element)
    what - какой и с каким классом?
    content - с каким содержимым?
    attribute - с каким атрибутом или атрибутами?
    insert - вставить в начало или конец?
  */

  /* 
  Пример принемаемых значений: 
    where - object (DOM Element) or 'querySelector=index' => '.class=1' or 'input.class=1'
    what - 'tag.className' => 'div.class1' or 'input.class1.class2'
    content - 'your content'
    attribute - `key=${value}` or 'key=value' or "key='value'" => `name="rate", value=${i}`
    insert - 'end' or 'start'
  */

  if (typeof where !== 'object') {
    let element = where.split('=')[0];
    let index = where.split('=')[1];
    where = document.querySelectorAll(element)[index];

    // console.log(where, element, index);
  }

  let whatSplit = what.split('.');

  let tag = whatSplit.shift();
  tag = document.createElement(tag);
  if (attribute !== 'none') {
    if (attribute.includes(',')) {
      let attr = convertToObject(attribute);
      let keys = Object.keys(attr);

      for (let i = 0; i < keys.length; i++) {
        tag.setAttribute(keys[i], attr[keys[i]]);
      }
    } else {
      let attr = attribute.split('=');
      tag.setAttribute(attr[0], attr[1]);
    }
  }

  let className = whatSplit.join(' ');
  tag.className = className;


  if (content !== 'none') {
    tag.innerHTML = String(content);
  }

  if (insert === 'start') {
    where.prepend(tag);
  } else if (insert === 'end') {
    where.append(tag);
  }
}

function convertToObject(options) {
  let optionsSplit = options.split(',');
  let obj = {};
  let temp;

  optionsSplit.forEach(item => {
    if (item.includes(':')) {
      temp = item.split(':');
    } else if (item.includes('=')) {
      temp = item.split('=');
    }
      if ( temp[1].includes(`"`) ) {
        temp[1] = temp[1].replace(/"/g, '');
      } else if ( temp[1].includes(`'`) ) {
        temp[1] = temp[1].replace(/'/g, '');
      }

      obj[temp[0].trim()] = temp[1].trim();
  })

  return obj;
}

function isElement(elementSelector, log='on') {
  let element = document.querySelector( String(elementSelector) );

  if (element) {
    return true;
  } else {
    if (log === 'on') {
      console.log(`%c Ошибка: ${elementSelector} не найден.`, 'color: #ae0000; background: #ffebeb; font-size: 14px;')
    }
    return false;
  }
}