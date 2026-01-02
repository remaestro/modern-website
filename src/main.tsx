import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProductsServices from './ProductsServices.tsx'
import TransformersPage from './products/TransformersPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/modern-website">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products-services" element={<ProductsServices />} />
        <Route path="/products/transformers" element={<TransformersPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
