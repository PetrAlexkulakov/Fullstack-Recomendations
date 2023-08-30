export const checkIsAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Ваша логика проверки токена, например, проверка срока действия
    return !!token;
};