$( () => {
    const SCHEMA_LIGHT = "light";
    const SCHEMA_DARK = "dark";
    let currentSchema;

    const getSchema = () => (currentSchema = localStorage.getItem("adminTheme"));
    const setSchema = (schema) => localStorage.setItem("adminTheme", schema);

    const getFileSchema = () => `${currentSchema}_theme.css`;

    const loadCss = (file) => {
        if (file) {
            $("#theme-css").remove();
            $("<link>")
                .attr({
                    id: "theme-css",
                    rel: "stylesheet",
                    href: `css/${file}?t=${Date.now()}`,
                })
                .appendTo("head");
        }
    };

    const updateIcons = (theme) => {
        const sunIcon = 'img/sun.png';
        const moonIcon = 'img/moon.png';
        
        $('.theme-icon-desktop, .theme-icon-offcanvas').attr('src', theme === SCHEMA_LIGHT ? sunIcon : moonIcon);
        $('.theme-text-offcanvas').text(theme === SCHEMA_LIGHT ? 'Светлая тема' : 'Тёмная тема');
    };

    $(".theme-toggle-desktop, .theme-toggle-offcanvas").on("click", () => {
        currentSchema = currentSchema === SCHEMA_LIGHT ? SCHEMA_DARK : SCHEMA_LIGHT;
        setSchema(currentSchema);
        loadCss(getFileSchema());
        $("html").attr("data-bs-theme", currentSchema);
        updateIcons(currentSchema);
    });

    (() => {
        currentSchema = getSchema();
        if (!currentSchema) {
            currentSchema = SCHEMA_LIGHT;
            setSchema(currentSchema);
        }
        loadCss(getFileSchema());
        $("html").attr("data-bs-theme", currentSchema);
        updateIcons(currentSchema);
    })();
});