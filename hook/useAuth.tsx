import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { verifyToken } from '@/ultils/api/auth';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        const id = Cookies.get('id');
        const email = Cookies.get('email');

        if (token && id && email) {
            // Gọi API để xác thực token
            const checkToken = async () => {
                try {
                    const isValid = await verifyToken(token); 
                    if (isValid) {
                        setIsAuthenticated(true);
                    } else {
                        Cookies.remove('authToken');
                        Cookies.remove('id');
                        Cookies.remove('email');
                        setIsAuthenticated(false);
                        router.push('/login');
                    }
                } catch (error) {
                    console.error('Token verification failed', error);
                    setIsAuthenticated(false);
                    router.push('/login');
                }
            };

            checkToken();
        } else {
            setIsAuthenticated(false);
            router.push('/login');
        }
    }, [router]);

    return { isAuthenticated };
};

export default useAuth;
