import React from 'react'
import {useEffect, useState} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectNotebooks} from "@/services/client/personal/notebook";
import {PSNotebookModel} from '@pnnh/polaris-business'
import {css} from "@emotion/css";
import {libraryAtom, notebookAtom} from "@/console/providers/notebook";

const styles = {
    sidebar: css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #f9f9f9;
        border-right: solid 1px #e3e3e3;
        overflow: hidden;
        position: relative;
    `,
    notebookContainer: css`
        height: calc(100vh - 3rem);
    `,
    notebookList: css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
        height: calc(100vh - 6rem);
    `,
    notebookSelector: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #f2f2f2;
        border-bottom: solid 1px #e3e3e3;
        height: 3rem;
    `,
    notebookTitle: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        gap: 4px;
        padding: 0 0.5rem;
    `,
    notebookAction: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 0 0.5rem;
    `,
    libraryContainer: css`
        position: absolute;
        background-color: #F9F9F9;
        width: 100%;
        height: calc(100vh - 3rem);
        top: 3rem;
        font-size: 1rem;
        font-weight: 400;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    `,
    notebookItem: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: 2.5rem;
        padding: 0 0.5rem;
        gap: 0.5rem;
        cursor: default;

        &:hover {
            background-color: #DFDFDF;
        }
    `,
    notebookName: css`
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
        color: #000;
    `,
    directorySelf: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: 2.5rem;
        cursor: default;

        &:hover {
            background-color: #DFDFDF;
        }
    `,
    directoryName: css`
        border: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        cursor: default;
        width: auto;
        padding-left: 4px;
    `,
    libraryList: css`
        height: calc(100vh - 6rem);
    `,
    newLibrary: css`
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-items: center;
        align-items: center;
        border-top: solid 1px #e3e3e3;
        padding: 0 0.5rem;
    `,
    newNotebook: css`
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-items: center;
        align-items: center;
        border-top: solid 1px #e3e3e3;
        padding: 0 0.5rem;
    `
}

export function NotebookList() {
    const libraryState = useRecoilValue(libraryAtom)
    const [notebookState, setNotebookState] = useRecoilState(notebookAtom)
    useEffect(() => {
        if (!libraryState.current || !libraryState.current.urn) {
            return
        }
        selectNotebooks(libraryState.current.urn).then(selectResult => {
            setNotebookState({
                models: selectResult.range,
                current: selectResult.range[0]
            })
        })
    }, [libraryState])

    if (!notebookState || !notebookState.models || notebookState.models.length <= 0) {
        return <div>Empty</div>
    }
    return <div className={styles.notebookContainer}>
        <div className={styles.notebookList}>
            {
                notebookState.models.map(item => {
                    return <NotebookCard key={item.uid} item={item}/>
                })
            }
        </div>
        <div className={styles.newNotebook}>新增笔记本</div>
    </div>
}

function NotebookCard({item}: { item: PSNotebookModel }) {
    const [notebookState, setNotebookState] = useRecoilState(notebookAtom)
    return <div>
        <div className={styles.directorySelf} onClick={() => {
            setNotebookState({
                models: notebookState.models,
                current: item
            })
        }}>
            <div className={styles.directoryName}>
                {item.title}</div>
        </div>
    </div>
}
