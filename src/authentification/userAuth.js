import React from 'react';
import { NavigationScreen } from '../navigation/navigation';
import { useAuth } from '../providers/authProvider';
import { SchemaProvider } from '../providers/schemasProvider';
import { LogIn } from '../signIn/signInScreen';

export const UserAuthentification = ()=>{
    const {user} = useAuth()
    
    return (
            user?
            <SchemaProvider>
                <NavigationScreen/>
            </SchemaProvider>
            :
            <LogIn/>
    )
}