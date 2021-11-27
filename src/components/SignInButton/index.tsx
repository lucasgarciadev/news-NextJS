import styles from './styles.module.scss';
import { signIn, signOut, useSession } from 'next-auth/client'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton () {

    const [session] = useSession();

    console.log(session);

    return session ? (
        <button 
            className={styles.signInButton} 
            type="button"
        >
            <FaGithub color="#84D361" />
            {session.user.name}
            <FiX color="#737388" className={styles.closeIcon} onClick={() => signOut()}  />
        </button>
    ) : (
        <button 
            className={styles.signInButton} 
            type="button"
            onClick={() => signIn('github')} 
        >
            <FaGithub color="#EBA417" />
            Sign in with GitHub
        </button>
    )
}