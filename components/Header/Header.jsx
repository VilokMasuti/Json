import { useTheme } from "../../hooks/useTheme"
import { ThemeToggle } from "../Theme-toggle"
const Header = ({ jsonData, handleReset }) => {
  const { theme } = useTheme()
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background   antialiased  font-sans ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className={`text-2xl    antialiased  font-sans
           ${theme === "light" ? "textLight" : "textbg"
          }



          `}>JSON Tree Visualizer</h1>
        <div className="flex items-center gap-4">
          {jsonData && (
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent ">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
export default Header
