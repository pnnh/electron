import styles from './page.module.scss'
import {NotebookBar} from './sidebar'
import {ConsoleNotebar} from './notebar'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {noteAtom} from './providers/notebook'
import {ConsoleLayout} from "@/console/layout";
import {ArticleContainer} from "@/components/console/note";

function MarkdownViewer() {
    const note = useRecoilValue(noteAtom)

    if (!note || !note.current || !note.current.body) {
        return <div>Loading</div>
    }

    return <>
        <div className={styles.editorArea}>
            <div className={styles.editCol}>
                <textarea value={note.current.body} readOnly></textarea>
            </div>
            <div className={styles.previewCol}>
                <ArticleContainer tocList={[]} header={note.current.header} body={note.current.body} assetsUrl={'xxx'}/>
            </div>
        </div>
    </>
}

export function ConsolePage() {

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
