import React from 'react'
import styles from './sidebar.module.scss'
import {useEffect, useState} from 'react'
import {PLSelectResult} from '@/models/common-result'
import {libraryAtom, notebookAtom} from './providers/notebook'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {selectLibraries} from '@/services/client/personal/library'
import {NotebookModel} from '@/models/personal/notebook'
import {selectNotebooks} from "@/services/client/personal/notebook";
import {PSNotebookModel} from '@pnnh/polaris-business'

export function NotebookBar() {
    return <div className={styles.sidebar}>
        <LibrarySelector></LibrarySelector>
        <div className={styles.directoryList}>
            <NotebookList/>
        </div>
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
                <img src='/icons/console/new-file-fill.png' alt='创建笔记' width={16} height={16} style={{
                    width: '16px', height: '16px'
                }}></img>
                <img src='/icons/console/new-folder-fill.png' alt='创建目录' width={16} height={16}></img>
            </div>
        </div>
        {
            notebookDropdown && <div className={styles.notebookList}>
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
    return <div className={styles.directoryCard}>
        <div className={styles.directorySelf}>
            <div className={styles.directoryName} onClick={() => {
                console.debug('setLibrary', item.name)
                setNotebookState({
                    models: notebookState.models,
                    current: item
                })
            }}>
                {item.title}</div>
        </div>
    </div>
}
