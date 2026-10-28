// Dil seçimi: sayfada yalnızca seçilen dilin bölümü (id="en" / id="tr") görünür.
// Sıra: adresteki #en/#tr, sonra son seçim, sonra cihazın dili. JavaScript kapalıysa iki dil de görünür.
(function () {
  var langs = ["en", "tr"];

  function saved() {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  }

  function save(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  function initial() {
    var hash = location.hash.slice(1);
    if (langs.indexOf(hash) >= 0) return hash;
    var stored = saved();
    if (langs.indexOf(stored) >= 0) return stored;
    return (navigator.language || "").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  }

  function show(lang) {
    langs.forEach(function (l) {
      var block = document.getElementById(l);
      if (block) block.hidden = l !== lang;
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (link) {
      link.setAttribute("aria-current", link.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    document.documentElement.lang = lang;
  }

  document.addEventListener("DOMContentLoaded", function () {
    show(initial());
    document.querySelectorAll("[data-set-lang]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var lang = link.getAttribute("data-set-lang");
        save(lang);
        show(lang);
        history.replaceState(null, "", "#" + lang);
        window.scrollTo(0, 0);
      });
    });
  });
})();
