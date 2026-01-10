import { Toaster } from 'react-hot-toast';

export default function ToasterComponent() {
    return (
			<Toaster
				position="bottom-left"
				toastOptions={{
					style: {
						background: 'var(--color-white)',
						color: 'var(--color-text-title)',
						border: '1px solid var(--color-border)',
						borderRadius: '8px',
						padding: '12px 16px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					},
					success: {
						iconTheme: {
							primary: 'var(--color-success)',
							secondary: '#fff',
						},
					},
					error: {
						iconTheme: {
							primary: 'var(--color-error)',
							secondary: '#fff',
						},
					},
				}}
			/>
    );
}