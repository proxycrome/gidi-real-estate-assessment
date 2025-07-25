import { cn, breakpoints, responsiveClasses } from '../utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional')
    })

    it('handles Tailwind conflicts', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2')
    })

    it('handles arrays and objects', () => {
      expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3')
    })

    it('handles undefined and null values', () => {
      expect(cn('base', undefined, null, 'end')).toBe('base end')
    })
  })

  describe('breakpoints', () => {
    it('contains all expected breakpoints', () => {
      expect(breakpoints).toEqual({
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      })
    })
  })

  describe('responsiveClasses', () => {
    it('contains container classes', () => {
      expect(responsiveClasses.container).toBe('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8')
    })

    it('contains grid classes', () => {
      expect(responsiveClasses.grid.responsive).toBe('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6')
      expect(responsiveClasses.grid.auto).toBe('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4')
    })

    it('contains text classes', () => {
      expect(responsiveClasses.text.responsive).toBe('text-sm sm:text-base lg:text-lg')
      expect(responsiveClasses.text.heading).toBe('text-2xl sm:text-3xl lg:text-4xl font-bold')
    })
  })
})