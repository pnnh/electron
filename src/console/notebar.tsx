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
    const setNote = useSetRecoilState(noteAtom)

    return <div className={styles.noteCard}>
        <div className={styles.noteSelf}>
            <div className={styles.noteName} onClick={() => {
                setNote({
                    current: item
                })
            }}>
                {item.title}</div>
        </div>
    </div>
}

const styles = {
    noteList: css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    `,
    noteCard: css`
        height: 2rem;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        padding-left: 1rem;
    `,
    noteSelf: css`
        display: flex;
        flex-direction: row;
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