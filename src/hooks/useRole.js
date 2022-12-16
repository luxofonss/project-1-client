import { useSelector } from 'react-redux';

const useRole = () => {
    console.log('useRole work');
    const userRole = useSelector((state) => state.user?.profile?.role);
    return userRole;
};

export default useRole;
