import { useSelector } from 'react-redux';

const useRole = () => {
    const userRole = useSelector((state) => state.user?.profile?.role);
    return userRole;
};

export default useRole;
