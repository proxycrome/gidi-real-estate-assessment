import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock providers if needed
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data generators
export const mockProduct = {
  id: '1',
  name: 'Test Product',
  category: 'Villa',
  price: 500000,
  description: 'A beautiful test product',
  imageUrl: '/test-image.jpg',
}

export const mockProducts = [
  mockProduct,
  {
    id: '2',
    name: 'Another Product',
    category: 'Apartment',
    price: 300000,
    description: 'Another test product',
    imageUrl: '/test-image-2.jpg',
  },
]