//hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { AdminSetterABI } from '../smartContracts/ApplicationBinaryInterfaces/adminSetterABI'; 
import { 
    useAccount, 
    useContractRead, 
    useNetwork, 
    useContractWrite 
} from 'wagmi';


const contractAddress = '0x6b3fd5F8DdEe40711AE3E6b387f64EE727DDc1a1'; 

const useAuth = () => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const { address, connector } = useAccount();
    const { chain } = useNetwork();
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';

    // Admin authentication via smart contract
    const { data } = useContractRead({
        address: contractAddress,
        abi: AdminSetterABI,
        functionName: 'getAdminAddress',
        chainId: chain?.id, // Ensure it's using the correct network (Goerli in this case)
    });
    const adminAddress = data as string;

    useEffect(() => {
        // Check for admin authentication
        if (address && adminAddress) {
            setIsAdminAuthenticated(address.toLowerCase() === adminAddress.toLowerCase());
        }
    }, [address, adminAddress]);

    const isUserAuthenticated = !!session;

    return { isUserAuthenticated, isAdminAuthenticated, isLoading };
};

export default useAuth;