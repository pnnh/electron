import React from 'react'
import {useEffect, useState} from 'react'
import {libraryAtom, notebookAtom} from './providers/notebook'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectLibraries} from '@/services/client/personal/library'
import {selectNotebooks} from "@/services/client/personal/notebook";
import {PSNotebookModel} from '@pnnh/polaris-business'
import {css} from "@emotion/css";

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
    directoryList: css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
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
    notebookList: css`
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
        cursor: pointer;

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

        &:hover {
            background-color: #DFDFDF;
        }
    `,
    directoryName: css`
        border: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        cursor: pointer;
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
    `
}

export function NotebookBar() {
    return <div className={styles.sidebar}>
        <LibrarySelector></LibrarySelector>
        <NotebookList/>
    </div>
}

function LibrarySelector() {
    const [notebookDropdown, setLibraryDropdown] = useState<boolean>(false)
    const [libraryState, setLibraryState] = useRecoilState(libraryAtom)

    useEffect(() => {
        selectLibraries().then(selectResult => {
            if (selectResult && selectResult.range && selectResult.range.length > 0) {
                setLibraryState({
                    models: selectResult.range,
                    current: selectResult.range[0]
                })
            }
        })
    }, [])

    if (!libraryState || !libraryState.models || libraryState.models.length <= 0 || !libraryState.current) {
        return <div>暂无笔记本</div>
    }
    const defaultLibrary = libraryState.current
    return <>
        <div className={styles.notebookSelector}>
            <div className={styles.notebookTitle}>
                <span>{defaultLibrary.name}</span>
                <img src='/icons/console/down-arrow.png' alt='选择笔记本' width={24} height={24}
                     onClick={() => setLibraryDropdown(!notebookDropdown)}></img>
            </div>
            <div className={styles.notebookAction}>
                <img src='/icons/console/new-file-fill.png' alt='创建笔记' width={16} height={16}></img>
                <img src='/icons/console/new-folder-fill.png' alt='创建目录' width={16} height={16}></img>
            </div>
        </div>
        {
            notebookDropdown && <div className={styles.notebookList}>
                <div className={styles.libraryList}>
                    {
                        libraryState.models.map(item => {
                            return <div key={item.uid} className={styles.notebookItem} onClick={() => {
                                setLibraryDropdown(!notebookDropdown)
                                setLibraryState({
                                    models: libraryState.models,
                                    current: item
                                })
                            }}>
                                <span className={styles.notebookName}>{item.name}</span>
                            </div>
                        })
                    }
                </div>
                <div className={styles.newLibrary}>新增资料库</div>
            </div>
        }
    </>
}

function NotebookList() {
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
    return <div className={styles.directoryList}>
        {
            notebookState.models.map(item => {
                return <NotebookCard key={item.uid} item={item}/>
            })
        }
    </div>
}

function NotebookCard({item}: { item: PSNotebookModel }) {
    const [notebookState, setNotebookState] = useRecoilState(notebookAtom)
    return <div>
        <div className={styles.directorySelf}>
            <div className={styles.directoryName} onClick={() => {
                setNotebookState({
                    models: notebookState.models,
                    current: item
                })
            }}>
                {item.title}</div>
        </div>
    </div>
}
