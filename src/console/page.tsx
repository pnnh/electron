import {NotebookBar} from './sidebar'
import {ConsoleNotebar} from './notebar'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {noteAtom} from './providers/notebook'
import {ConsoleLayout} from "@/console/layout";
import {ArticleContainer} from "@/components/console/note";
import {css} from "@emotion/css";

const styles = {
    editorArea: css`
        height: 100%;
    `,
    editCol: css`
        border-right: solid 1px #e3e3e3;
        height: 50%;
    `,
    editArea: css`
        border: 0;
        box-shadow: none;
        resize: none;
        outline: none !important;
        overflow-y: auto;
        height: 100%;
        width: 100%;
    `,
    previewCol: css`
        height: 50%;
        overflow-y: scroll;
        overflow-x: hidden;
        box-sizing: border-box;
    `,
    noteViewer: css`
        position: absolute;
        left: 50%;
        width: 50%;
        padding: 1rem;
        height: 100%;
    `,
    notebarContainer: css`
        position: absolute;
        left: 0;
        width: 50%;
        overflow-y: auto;
        overflow-x: hidden;
    `,
    notesContainer: css`
        position: absolute;
        left: 15rem;
        width: calc(100vw - 17.5rem);
        height: calc(100vh - 2.5rem);
        display: grid;
        grid-template-columns: 1fr 1fr;
    `,
    directoryBar: css`
        width: 15rem;
        position: absolute;
        left: 0;
        height: 100%;
    `
}

function MarkdownViewer() {
    const note = useRecoilValue(noteAtom)

    if (!note || !note.current || !note.current.body) {
        return <div>Loading</div>
    }

    return <>
        <div className={styles.editorArea}>
            <div className={styles.editCol}>
                <textarea className={styles.editArea} value={note.current.body} readOnly></textarea>
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
            <div>
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
