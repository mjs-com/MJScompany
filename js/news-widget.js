/**
 * トップページお知らせ: news.html から最新5件を取得して表示
 */
(function () {
  var container = document.getElementById('news-list');
  if (!container) return;

  var loadingEl = document.getElementById('news-loading');
  var MAX_ITEMS = 5;

  fetch('news.html')
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.text();
    })
    .then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var items = doc.querySelectorAll('.news-list .news-item');
      var count = Math.min(MAX_ITEMS, items.length);

      if (loadingEl && loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
      }

      for (var i = 0; i < count; i++) {
        container.appendChild(items[i].cloneNode(true));
      }
    })
    .catch(function () {
      if (loadingEl) {
        loadingEl.innerHTML = 'お知らせを取得できませんでした。<a href="news.html">お知らせ一覧はこちら</a>';
        loadingEl.classList.add('news-load-error');
      }
    });
})();
