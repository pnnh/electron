import React from 'react'

import {css} from "@emotion/css";

const styles = {
    consoleFeature: css`
        width: 100%;
        height: 100%;
        flex-direction: column;
        gap: 16px;
        border-right: #eeeeee 0.5px solid;
        background-color: #f2f2f2;
        display: flex;
    `,
    topArea: css`
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        gap: 16px;
        flex-grow: 1;
    `,
    featureList: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 16px;
        flex-grow: 1;
    `,
    featureButton: css`
        width: 24px;
        height: 24px;
        position: relative;
    `,
    trashList: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        gap: 16px;
        flex-grow: 1;
    `,
    bottomArea: css`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 16px;
        width: 100%;
    `,
    profilesList: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        border-top: #eeeeee 0.5px solid;
        padding-top: 8px;
    `,
    profileButton: css`
        width: 24px;
        height: 24px;
        position: relative;
        border-radius: 12px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            object-fit: cover;
        }
    `,
    accountList: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        border-top: #eeeeee 0.5px solid;
        padding-top: 8px;
        padding-bottom: 8px;
    `,
    accountButton: css`
        width: 28px;
        height: 28px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            border-radius: 14px;
            object-fit: cover;
        }
    `
}

export function ConsoleFeature() {
    return <div className={styles.consoleFeature}>
        <div className={styles.topArea}>
            <div className={styles.featureList}>
                <div className={styles.featureButton}>
                    <img src="/icons/console/file-copy-line.png" alt='notes'
                         sizes='24px,24px'/>
                </div>
                <div className={styles.featureButton}>
                    <img src="/icons/console/todo-fill.png" alt='todo'
                         sizes='24px,24px'/>
                </div>
                <div className={styles.featureButton}>
                    <img src="/icons/console/calendar-fill.png" alt='calendar'
                         sizes='24px,24px'/>
                </div>
                <div className={styles.featureButton}>
                    <img src="/icons/console/image-2-fill.png" alt='resources'
                         sizes='24px,24px'/>
                </div>
            </div>
            <div className={styles.trashList}>
                <div className={styles.featureButton}>
                    <img src="/icons/console/trash.png" alt='trash'
                         sizes='24px,24px'/>
                </div>
            </div>
        </div>
        <div className={styles.bottomArea}>
            <div className={styles.profilesList}>
                <div className={styles.profileButton}>
                    <img src="/data/photos/1.webp" alt='trash'
                         sizes='24px,24px'/>
                </div>
                <div className={styles.profileButton}>
                    <img src="/data/photos/2.webp" alt='trash'
                         sizes='24px,24px'/>
                </div>
            </div>
            <div className={styles.accountList}>
                <div className={styles.accountButton}>
                    <img src="/data/photos/3.webp" alt='trash'
                         sizes='28px,28px'/>
                </div>
            </div>
        </div>
    </div>
}
