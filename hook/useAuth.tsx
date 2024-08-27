import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface IUseAuth {
    link?: string
}

const useAuth = (props: IUseAuth) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false)
            if (props.link !== undefined) {
                router.push(`${props.link}`);
            }
        }
    }, [router]);

    return isAuthenticated;
};

export default useAuth;
