import '../stylesheets/style.scss'

function getTheme(): string {
    try {
        return localStorage.getItem("theme") || "auto";
    } catch (e) {
        return "auto";
    }
}

function setTheme(mode: "dark" | "light") {
    if (mode !== "light" && mode !== "dark") {
        mode = "light"
    }

    if (mode === "light") {
        document.documentElement.classList.remove("dark");
    } else {
        document.documentElement.classList.add("dark");
    }

    localStorage.setItem("theme", mode);
}

function cycleThemeOnce() {
    const currentTheme = getTheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDark) {
        if (currentTheme === "auto") {
            setTheme("dark");
        } else if (currentTheme == "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    } else {
        if (currentTheme === "auto") {
            setTheme("light");
        } else if (currentTheme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }
}

function main() {
    const buttons = document.getElementsByClassName("ToolButton__viewModeButton");

    Array.from(buttons).forEach((btn) => {
        btn.addEventListener("click", cycleThemeOnce);
    });
}

document.addEventListener("DOMContentLoaded", main);