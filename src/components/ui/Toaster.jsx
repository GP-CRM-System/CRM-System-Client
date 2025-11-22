import { Toaster } from 'react-hot-toast';

export default function ToasterComponent() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                success: {
                    style: {
                        background: 'var(--color-primary-500)',
                        color: 'white',
                    },
                },
                error: {
                    style: {
                        background: 'var(--color-error)',
                        color: 'white',
                    },
                },
            }}
        />
    );
}