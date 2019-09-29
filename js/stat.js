'use strict';

var popupOffsetX = 100;
var popupOffsetY = 10;
var popupHeight = 270;
var popupWidth = 420;
var popupColor = '#fff';

var shadowOffsetX = popupOffsetX + 10;
var shadowOffsetY = popupOffsetY + 10;
var shadowColor = 'rgba(0, 0, 0, 0.7)';

var fontSize = '16';
var fontFamily = ' PT Mono';
var titleColor = '#000';
var titleMessage = 'Ура вы победили!';
var titleOffsetX = popupOffsetX + 20;
var titleOffsetY = popupOffsetY + 20;
var subTitleMessage = 'Список результатов:';
var subTitleOffsetX = popupOffsetX + 20;
var subTitleOffsetY = popupOffsetY + 35;

var histogramTextNamesGap = 10;
var histogramTextTimesGap = 15;
var histogramTextNamesOffsetY = popupHeight - histogramTextNamesGap;

var histogramWidth = 40;
var histogramMaxHeight = 150;
var histogramMargin = 50;
var histogramMarginTop = popupOffsetY + 20 + fontSize * 2 + histogramTextNamesGap * 3;
var histogramTextColor = '#000';

window.renderStatistics = function (ctx, names, times ) {

  // рандомное число в рамках аргументов
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // самое высокое значение в массиве
  function getMaxElement(arr) {
    var maxEl = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxEl) {
        maxEl = arr[i];
      }
    }
    return maxEl;
  }

  // тень таблицы
  ctx.fillStyle = shadowColor;
  ctx.fillRect(shadowOffsetX, shadowOffsetY, popupWidth, popupHeight);

  // главная таблица
  ctx.fillStyle = popupColor;
  ctx.fillRect(popupOffsetX, popupOffsetY, popupWidth, popupHeight);

  // заголовки
  ctx.font = fontSize + 'px' + fontFamily;
  ctx.fillStyle = titleColor;
  ctx.textBaseline = 'hanging';
  ctx.fillText(titleMessage, titleOffsetX, titleOffsetY);
  ctx.fillText(subTitleMessage, subTitleOffsetX, subTitleOffsetY);

  for ( var i = 0; i < 4; i++) {

    var maxTime = getMaxElement(times);
    var gameTime = parseInt(times[i], 10);
    var histogramHeight = (histogramMaxHeight * gameTime) / maxTime;
    var histogramPositionX = (popupOffsetX + histogramMargin) + (histogramWidth + histogramMargin) * i;
    var histogramPositionY = popupOffsetY + (histogramMaxHeight - ((histogramMaxHeight * gameTime) / maxTime)) + histogramMarginTop;

    ctx.fillStyle = names[i] == 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(31, 58, 147, 0.' + parseInt(getRandomArbitrary(5, 10), 10) + ')';

    // рисуем гистограммы
    ctx.fillRect(histogramPositionX, histogramPositionY, histogramWidth, histogramHeight);

    // рисуем имена и время
    ctx.fillStyle = histogramTextColor;
    ctx.fillText( gameTime, histogramPositionX, histogramPositionY - histogramTextTimesGap );
    ctx.fillText( names[i],histogramPositionX, histogramTextNamesOffsetY );
  }

};
