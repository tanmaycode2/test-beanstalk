
export const isLoggedin = () => {
    let token = localStorage.getItem('token');
    if(token) return false;
    return true;
}