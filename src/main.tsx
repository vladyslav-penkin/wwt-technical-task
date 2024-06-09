import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'

import { App } from '@components/App'
import { ThemeProvider } from '@providers/ThemeProvider'

import './i18n'
import { queryClient } from './query'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>
)
