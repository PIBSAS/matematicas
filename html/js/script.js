(function () {
    // Elimina cualquier MathJax anterior
    document.querySelectorAll("script[src*='mathjax']").forEach(s => s.remove());

    if (!document.getElementById("MathJax-script")) {
        const script = document.createElement("script");
        script.id = "MathJax-script";
        script.async = true;

        // Ruta relativa automática: el HTML la reemplaza la Action
        script.src = "__MATHJAX_PATH__/tex-mml-chtml.js";

        document.head.prepend(script);
    }
})();
