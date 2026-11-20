import { THEME_STORAGE_KEY } from "@/lib/theme";

// This small script runs before the page is painted, so the right theme shows
// immediately and there is no white flash. With no saved choice, we follow the device setting.
const themeScript = `
  try {
    var savedTheme = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = savedTheme === "dark" || (savedTheme !== "light" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (error) {}
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
