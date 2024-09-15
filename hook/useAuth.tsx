import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        const id = Cookies.get('id');
        const email = Cookies.get('email');

        console.log(email, id, token);

        if (token && id && email) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false)
            router.push('/login');
        }
    }, [router]);

    return isAuthenticated;
};

export default useAuth;
