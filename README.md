# Gidi Real Estate E-commerce Platform

A modern, SEO-optimized Next.js e-commerce platform for real estate products built with TypeScript and Tailwind CSS. This application provides a complete product management system with advanced filtering, responsive design, and performance optimizations.

## 🚀 Features

- **Product Management**: Full CRUD operations for real estate products
- **Advanced Filtering**: Filter products by category, and price range
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Structured data, meta tags, and sitemap generation
- **Performance**: Image optimization, lazy loading, and code splitting
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Custom Hooks
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.18 or later
- npm, yarn, pnpm, or bun

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gidi_real_estate_assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── add-product/       # Add product page
│   ├── edit-product/      # Edit product pages
│   ├── home/              # Home page with product listing
│   ├── product/           # Product detail pages
│   ├── layout.tsx         # Root layout
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable components
│   ├── LazyComponents.tsx # Lazy-loaded components
│   ├── ProductForm.tsx    # Product form component
│   └── StructuredData.tsx # SEO structured data
├── hooks/                 # Custom React hooks
│   └── useProducts.tsx    # Product management hook
├── types/                 # TypeScript type definitions
│   └── Product.ts         # Product type definition
└── utils/                 # Utility functions
    └── productStorage.ts  # Local storage utilities
```

## 🎨 Design Decisions & Trade-offs

### Architecture Decisions

1. **App Router over Pages Router**
   - Chose Next.js 15 App Router for better performance and developer experience
   - Enables server components and improved SEO capabilities
   - Trade-off: Newer API with less community resources

2. **Local Storage for Data Persistence**
   - Used localStorage for simplicity in this assessment
   - Enables data persistence without backend setup
   - Trade-off: Data is client-side only, not suitable for production

3. **Custom Hooks for State Management**
   - Lightweight solution for product state management
   - Avoids external dependencies like Redux
   - Trade-off: Less suitable for complex state interactions

### Performance Optimizations

1. **Lazy Loading**
   - Components are lazy-loaded to reduce initial bundle size
   - Images use Next.js Image component with blur placeholders

2. **Code Splitting**
   - Automatic code splitting with Next.js

3. **Image Optimization**
   - Next.js Image component with WebP/AVIF support
   - Responsive images with proper sizing

### UI/UX Decisions

1. **Mobile-First Design**
   - Responsive design prioritizing mobile experience
   - Flexible grid layouts with Tailwind CSS

2. **Consistent Design System**
   - Custom Tailwind configuration with design tokens
   - Consistent spacing, colors, and typography

## 🔍 SEO Implementation

### Metadata Management

1. **Dynamic Meta Tags**
   ```typescript
   // Root layout with comprehensive metadata
   export const metadata: Metadata = {
     title: {
       default: "Gidi Real Estate E-commerce",
       template: "%s | Gidi Real Estate"
     },
     description: "Browse, filter, and manage real estate products...",
     openGraph: { /* Open Graph tags */ },
     twitter: { /* Twitter Card tags */ }
   }
   ```

2. **Page-Specific Metadata**
   - Each route has its own `layout.tsx` with relevant metadata
   - Dynamic titles and descriptions based on content

### Structured Data

1. **Product Schema**
   ```typescript
   // JSON-LD structured data for products
   const productSchema = {
     "@context": "https://schema.org/",
     "@type": "Product",
     name: product.name,
     description: product.description,
     // ... additional schema properties
   }
   ```

### Technical SEO

1. **Sitemap Generation**
   - Dynamic sitemap including all product pages
   - Automatic updates when products are added/removed

2. **Robots.txt**
   - Proper crawling instructions
   - Excludes admin pages from indexing

3. **Performance Metrics**
   - Optimized Core Web Vitals
   - Fast loading times with Next.js optimizations

### SEO Best Practices

- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Alt Text**: Descriptive alt text for all images
- **URL Structure**: Clean, descriptive URLs
- **Internal Linking**: Proper navigation between pages
- **Mobile Optimization**: Responsive design and mobile-friendly interface

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Component and hook testing
- **Coverage**: 62%+ coverage threshold
- **CI/CD**: Automated testing in GitHub Actions

Run tests:
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, set:
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 📝 Future Enhancements

- Backend integration with database
- User authentication and authorization
- Payment integration
- Real-time notifications
- Admin dashboard
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is created for assessment purposes.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.