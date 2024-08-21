import styles from './page.module.scss'
import {NotebookBar} from './sidebar'
import {ConsoleNotebar} from './notebar'
import React, {useEffect, useState} from 'react'
import {useRecoilValue} from 'recoil'
import {noteAtom} from './providers/notebook'
import {NoteModel} from '@/models/personal/note'
import {NoteService} from '@/services/personal/notes'
import {NoteView} from "@/components/console/note";
import {ConsoleLayout} from "@/console/layout";

function MarkdownViewer() {
    const note = useRecoilValue(noteAtom)
    const [model, setModel] = useState<NoteModel>()

    useEffect(() => {
        const loadResources = async () => {
            if (!note) {
                return
            }
            const response = await NoteService.getNoteByKey(note)
            setModel(response)
        }
        loadResources()
    }, [note])

    if (!model || !model.body) {
        return <div>Loading</div>
    }

    return <>
        <div className={styles.editorArea}>
            <div className={styles.editCol}>
                <textarea value={model.body} readOnly></textarea>
            </div>
            <div className={styles.previewCol}>
                <NoteView model={model}/>
            </div>
        </div>
    </>
}

export function HomePage() {

    return (
        <ConsoleLayout>
            <div className={styles.notesPage}>
                <div className={styles.directoryBar}>
                    <NotebookBar></NotebookBar>
                </div>
                <div className={styles.notesContainer}>
                    <div className={styles.notebarContainer}>
                        <ConsoleNotebar></ConsoleNotebar>
                    </div>
                    <div className={styles.noteViewer}>
                        <MarkdownViewer></MarkdownViewer>
                    </div>

                </div>
            </div>
        </ConsoleLayout>
    )
}
