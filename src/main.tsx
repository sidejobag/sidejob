import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SurveyV2 from './SurveyV2.tsx'
import SurveyV2b from './SurveyV2b.tsx'
import LandingPage from './LandingPage.tsx'

const path = window.location.pathname

let Root: React.ComponentType | null = null
if (path === '/enquete') Root = App
else if (path === '/shindan') Root = SurveyV2
else if (path === '/shindan2') Root = SurveyV2b
else if (path === '/tokuten') Root = LandingPage

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {Root ? <Root /> : <div />}
  </StrictMode>,
)
