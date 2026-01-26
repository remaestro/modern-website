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
import EngineeringPage from './services/EngineeringPage.tsx'
import InstallationPage from './services/InstallationPage.tsx'
import MaintenancePage from './services/MaintenancePage.tsx'
import AuditPage from './services/AuditPage.tsx'
import CloudInfrastructurePage from './digital/CloudInfrastructurePage.tsx'
import IoTPlatformPage from './digital/IoTPlatformPage.tsx'
import DataAnalyticsPage from './digital/DataAnalyticsPage.tsx'
import MobileAppsPage from './digital/MobileAppsPage.tsx'
import ContactPage from './ContactPage.tsx'
import TrainingPage from './TrainingPage.tsx'
import PartnersPage from './PartnersPage.tsx'
import ProductsCatalogPage from './ProductsCatalogPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products-services" element={<ProductsServices />} />
        <Route path="/products/transformers" element={<TransformersPage />} />
        <Route path="/products/source-substations" element={<SourceSubstationsPage />} />
        <Route path="/products/distribution-posts" element={<DistributionPostsPage />} />
        <Route path="/products/scada" element={<SCADAPage />} />
        <Route path="/products/protection" element={<ProtectionPage />} />
        <Route path="/services/engineering" element={<EngineeringPage />} />
        <Route path="/services/installation" element={<InstallationPage />} />
        <Route path="/services/maintenance" element={<MaintenancePage />} />
        <Route path="/services/audit" element={<AuditPage />} />
        <Route path="/digital/cloud-infrastructure" element={<CloudInfrastructurePage />} />
        <Route path="/digital/iot-platform" element={<IoTPlatformPage />} />
        <Route path="/digital/data-analytics" element={<DataAnalyticsPage />} />
        <Route path="/digital/mobile-apps" element={<MobileAppsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/products-catalog" element={<ProductsCatalogPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
