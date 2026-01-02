import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProductsServices from './ProductsServices.tsx'
import TransformersPage from './products/TransformersPage.tsx'
import SourceSubstationsPage from './products/SourceSubstationsPage.tsx'
import DistributionPostsPage from './products/DistributionPostsPage.tsx'
import SCADAPage from './products/SCADAPage.tsx'
import ProtectionPage from './products/ProtectionPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/modern-website">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products-services" element={<ProductsServices />} />
        <Route path="/products/transformers" element={<TransformersPage />} />
        <Route path="/products/source-substations" element={<SourceSubstationsPage />} />
        <Route path="/products/distribution-posts" element={<DistributionPostsPage />} />
        <Route path="/products/scada" element={<SCADAPage />} />
        <Route path="/products/protection" element={<ProtectionPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
