import {useEffect, useState} from 'react'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {PLSelectResult} from '@/models/common-result'
import {libraryAtom, noteAtom, notebookAtom} from './providers/notebook'
import {NoteModel} from '@/models/personal/note'
import React from 'react'
import {PSNoteModel} from '@pnnh/polaris-business'
import {selectNotes, selectSubNotes} from "@/services/client/personal/notes";
import {css} from "@emotion/css";

export function ConsoleNotebar() {
    const [notesResult, setNotesResult] = useState<PLSelectResult<PSNoteModel>>()
    const libraryState = useRecoilValue(libraryAtom)
    const notebookState = useRecoilValue(notebookAtom)
    useEffect(() => {
        if (!libraryState || !libraryState.current || !libraryState.current.urn || !notebookState ||
            !notebookState.current || !notebookState.current.urn) {
            return
        }
        selectNotes(libraryState.current.urn, notebookState.current.urn).then(selectResult => {
            setNotesResult(selectResult)
        })
    }, [notebookState])

    if (!notesResult || !notesResult.range || notesResult.range.length <= 0) {
        return <div>Empty</div>
    }
    return <div className={styles.noteList}>
        {
            notesResult.range.map(item => {
                return <NoteCard key={item.uid} item={item}/>
            })
        }
    </div>
}

function NoteCard({item}: { item: NoteModel }) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const hasChildren = Boolean(item.children) && item.children > 0
    const setNote = useSetRecoilState(noteAtom)
    const [children, setChildren] = useState<PLSelectResult<NoteModel>>()

    const loadData = async () => {
        if (hasChildren) {
            const children = await selectSubNotes(item.uid)
            setChildren(children)
        }
    }
    return <div className={styles.noteCard}>
        <div className={styles.noteSelf}>
            <div className={styles.noteOpen} onClick={() => {
                setIsExpanded(!isExpanded)
                if (isExpanded) {
                    setChildren(undefined)
                } else {
                    loadData()
                }
            }
            }>
                {
                    hasChildren &&
                    <img
                        src={isExpanded ? '/icons/console/triangle-down-fill.png' : '/icons/console/triangle-right-fill.png'}
                        alt='目录' width={24} height={24} style={{width: '24px', height: '24px'}}></img>
                }
            </div>
            <div className={styles.noteName} onClick={() => {
                console.debug('setNote', item.name)
                setNote({
                    current: item
                })
            }}>
                {item.title}</div>
        </div>
        <div style={{display: isExpanded ? 'block' : 'none'}}>
            {
                children && children.range.map(child => {
                    return <NoteCard key={child.uid} item={child}/>
                })
            }
        </div>
    </div>
}

const styles = {
    noteCard: css`
        padding-left: 1rem;
    `,
    noteList: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 1rem 1rem 0;
    `,
    noteSelf: css`
        display: flex;
        flex-direction: row;
    `,
    noteOpen: css`
        width: 36px;
        height: 36px;
        flex-shrink: 0;

    `,
    noteName: css`
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.4;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `
}