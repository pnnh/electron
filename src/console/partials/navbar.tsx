import React from 'react'
import styles from './navbar.module.scss'
import {getLoginSession} from '@/services/client/account'
import {useEffect} from 'react'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {sessionAtom} from '../state/session'
import {SessionModel} from '@/models/session'

export function ConsoleNavbar() {
    const setSession = useSetRecoilState<SessionModel>(sessionAtom)

    useEffect(() => {
        const loadSession = async () => {
            const response = await getLoginSession()
            if (response) {
                setSession(response)
            }
        }
        loadSession()
    }, [setSession])

    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <a className={styles.brandLink} href={'/'}>
                <img src='/images/logo.png' alt='logo' width={28} height={28} sizes={'32px,32px'}/>
                <span>哈宝笔记</span>
            </a>
        </div>
        <div className={styles.rightNav}>
            <UserAction/>
        </div>
    </div>
}

function UserAction(props: { account?: string }) {
    const session = useRecoilValue(sessionAtom)
    if (!session) {
        return <div>...</div>
    }
    return <div>{props.account}</div>
}
