/*
 * Ask Elijah embed loader for elijahcruzado.com (Webflow).
 * Paste into Webflow: Site settings → Custom code → Footer code
 *   <script src="https://YOUR-APP.vercel.app/embed.js" defer></script>
 *
 * Adds one fixed frame in the bottom right corner. The frame is small while
 * the chat is closed and grows to the panel size when it opens (full screen
 * under 640px). Open it from any link or button with:
 *   window.AskElijah.open()
 * or give the element the attribute data-ask-elijah.
 */
(function () {
  if (window.AskElijah) return;
  var script = document.currentScript;
  var origin = new URL(script ? script.src : "/", window.location.href).origin;

  var frame = document.createElement("iframe");
  frame.src = origin + "/embed";
  frame.title = "Ask Elijah, an AI assistant about Elijah's work";
  frame.setAttribute("allowtransparency", "true");
  frame.style.cssText =
    "position:fixed;z-index:2147483000;border:0;background:transparent;color-scheme:light;" +
    "transition:width .2s ease,height .2s ease;";

  var isOpen = false;
  function layout() {
    var small = window.innerWidth < 640;
    var s = frame.style;
    if (!isOpen) {
      s.width = "272px";
      s.height = "84px";
      s.right = small ? "8px" : "16px";
      s.bottom = small ? "8px" : "16px";
      s.top = "auto";
      s.left = "auto";
      s.borderRadius = "0";
      s.boxShadow = "none";
    } else if (small) {
      s.width = "100%";
      s.height = "100%";
      s.top = "0";
      s.left = "0";
      s.right = "0";
      s.bottom = "0";
      s.borderRadius = "0";
      s.boxShadow = "none";
    } else {
      s.width = "420px";
      s.height = "calc(100vh - 24px)";
      s.right = "12px";
      s.bottom = "12px";
      s.top = "auto";
      s.left = "auto";
      s.borderRadius = "30px";
      s.boxShadow = "0 24px 60px -20px rgba(29,29,29,.35)";
    }
  }

  window.addEventListener("message", function (e) {
    if (e.origin !== origin || !e.data || e.data.type !== "ask-elijah:state") return;
    isOpen = !!e.data.open;
    layout();
  });
  window.addEventListener("resize", layout);

  window.AskElijah = {
    open: function () {
      frame.contentWindow && frame.contentWindow.postMessage({ type: "ask-elijah:open" }, origin);
    },
  };
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest && e.target.closest("[data-ask-elijah]");
    if (el) {
      e.preventDefault();
      window.AskElijah.open();
    }
  });

  layout();
  (document.body || document.documentElement).appendChild(frame);
})();
