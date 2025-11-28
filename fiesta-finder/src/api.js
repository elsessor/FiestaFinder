const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const getToken = () => localStorage.getItem('token');

const request = async (path, options = {}) => {
	const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
	const token = getToken();
	if (token) headers.Authorization = `Bearer ${token}`;
	const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
	if (!res.ok) {
		let message = 'Request failed';
		try { message = (await res.json()).message || message; } catch (_) {}
		throw new Error(message);
	}
	return res.json();
};

export const AuthAPI = {
	register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
	login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
	me: () => request('/auth/me')
};

export const FestivalsAPI = {
	list: (params = {}) => {
		const q = new URLSearchParams(params).toString();
		return request(`/festivals${q ? `?${q}` : ''}`);
	},
	get: (idOrSlug) => request(`/festivals/${idOrSlug}`),
	create: (payload) => request('/festivals', { method: 'POST', body: JSON.stringify(payload) }),
	update: (id, payload) => request(`/festivals/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
	delete: (id) => request(`/festivals/${id}`, { method: 'DELETE' })
};

export const FavoritesAPI = {
	listMine: () => request('/me/favorites'),
	toggle: (festivalId) => request(`/me/favorites/${festivalId}/toggle`, { method: 'POST' })
};

export default { AuthAPI, FestivalsAPI, FavoritesAPI };


