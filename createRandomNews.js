// Node JS
const fs = require('fs');


function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

class RandomNews {
  getTitle() {
    const titles = [
      'Товарищи!', 
      'Соображения высшего порядка.', 
      'Анализ направлений.', 
      'Определения и уточнения модели.', 
      'Развитие структуры',
    ];

    return String(titles[randomInteger(0, 4)]);
  }

  getAuthor() {
    const authors = [
      'Черняев Руслан Егорович',
      'Журавлева Злата Лукинична',
      'Васильева Юлия Дмитриевна',
      'Смирнов Михаил Матвеевич',
      'Нестерова Эмилия Васильевна',
    ];

    return String(authors[randomInteger(0, 4)]);
  }

  getDate() {
    function isZero(n) {
      if (n > 9) {
        return String(n);
      } else {
        return `0${n}`
      }
    }

    const dateObj = new Date();

    dateObj.setDate(randomInteger(1, 31));
    dateObj.setMonth(randomInteger(1, 12));
    dateObj.setFullYear(randomInteger(2018, 2020));

    dateObj.setUTCHours(randomInteger(1, 24));
    dateObj.setUTCMinutes(randomInteger(1, 60));
    dateObj.setUTCSeconds(randomInteger(1, 60));

    const randomDate = `${isZero( dateObj.getDate() )}.${isZero( dateObj.getMonth() )}.${isZero( dateObj.getFullYear() )}`;
    const randomTime = `${isZero( dateObj.getUTCHours() )}:${isZero( dateObj.getUTCMinutes() )}:${isZero( dateObj.getUTCSeconds() )}`;

    return {date: String(randomDate), time: String(randomTime)};
  }

  getArticle() {
    const articles = [
      'Не следует, однако забывать, что реализация намеченных плановых заданий требуют определения и уточнения дальнейших направлений развития. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке существенных финансовых и административных условий. Равным образом новая модель организационной деятельности требуют от нас анализа направлений прогрессивного развития. Повседневная практика показывает, что начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений.',
      'Таким образом постоянный количественный рост и сфера нашей активности требуют определения и уточнения модели развития. Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности требуют определения и уточнения систем массового участия. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности играет важную роль в формировании новых предложений. Товарищи! сложившаяся структура организации играет важную роль в формировании модели развития.',
      'Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение существенных финансовых и административных условий. Таким образом рамки и место обучения кадров играет важную роль в формировании систем массового участия. Задача организации, в особенности же консультация с широким активом влечет за собой процесс внедрения и модернизации систем массового участия.',
      'Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки модели развития. Идейные соображения высшего порядка, а также сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке новых предложений. Товарищи! новая модель организационной деятельности требуют определения и уточнения дальнейших направлений развития.',
      'Разнообразный и богатый опыт начало повседневной работы по формированию позиции играет важную роль в формировании дальнейших направлений развития. Таким образом новая модель организационной деятельности представляет собой интересный эксперимент проверки форм развития. Значимость этих проблем настолько очевидна, что рамки и место обучения кадров способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт консультация с широким активом в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. С другой стороны сложившаяся структура организации способствует подготовки и реализации новых предложений.',
    ];

    return String(articles[randomInteger(0, 4)]);
  }

}

const {getTitle, getAuthor, getDate, getArticle} = new RandomNews;

const news = {};
const countNews = 10;


for (let i = 0; i < countNews; i++) {
  news[i+1] = {
    "id": String(i+1),
    "title": getTitle(),
    "author": getAuthor(),
    "date": getDate().date,
    "time": getDate().time,
    "article": getArticle()
  };
}

let newsJSON = JSON.stringify(news, null,'\t');

fs.writeFile('./news.json', newsJSON, function(err) {
  if(err) return console.error(err);
  console.log('done');
})