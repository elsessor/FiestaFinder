import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

const ToastItem = ({ toast, onClose }) => {
	const color = toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-gray-700';
	return (
		<div className={`text-white px-4 py-3 rounded-lg shadow-lg mb-3 ${color} animate-slide-up`}
			role="status"
		>
			<div className="flex items-start">
				<div className="flex-1 mr-3">{toast.message}</div>
				<button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
			</div>
		</div>
	);
};

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const remove = useCallback((id) => {
		setToasts((t) => t.filter((x) => x.id !== id));
	}, []);

	const toast = useCallback((opts) => {
		const id = Date.now() + Math.random();
		const t = { id, type: opts.type || 'info', message: opts.message || '' };
		setToasts((prev) => [t, ...prev]);
		setTimeout(() => remove(id), opts.duration ?? 3000);
	}, [remove]);

	const value = useMemo(() => ({ toast }), [toast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="fixed top-4 right-4 z-50">
				{toasts.map((t) => (
					<ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
				))}
			</div>
		</ToastContext.Provider>
	);
};

export default ToastContext;


