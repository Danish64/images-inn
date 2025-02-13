/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			nunito: [
  				'Nunito',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: '#000000',
  			'deep-gray': '#1A1A1A',
  			'soft-gray': '#333333',
  			'border-gray': '#666666',
  			'text-white': '#FFFFFF',
  			'text-muted': '#D1D1D1',
  			'highlight-white': '#EAEAEA',
  			'muted-gray': '#808080',
  			'panel-bg': '#F5F5F5'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
};
