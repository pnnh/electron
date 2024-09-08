import {NotebookBar} from './sidebar'
import {ConsoleNotebar} from './notebar'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {noteAtom} from './providers/notebook'
import {ConsoleLayout} from "@/console/layout";
import {ArticleContainer} from "@/components/console/note";
import {css} from "@emotion/css";
import {consoleTheme} from "@/console/theme";

const styles = {
    editorArea: css`
        height: 100%;
    `,
    titleCol: css`
        height: 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: solid 1px #e3e3e3;

        input {
            margin-left: 1rem;
            width: 98%;
            outline: none;
            border: 0;
            font-size: 1.5rem;
            font-weight: 400;
        }
    `,
    editCol: css`
        height: calc(60% - 3rem);
        border-bottom: solid 1px #e3e3e3;
        overflow-x: hidden;
        scrollbar-width: thin;
        padding: 1rem;
    `,
    editText: css`
        border: 0;
        box-shadow: none;
        resize: none;
        outline: none !important;
        overflow-y: hidden;
    `,
    previewCol: css`
        height: 40%;
        overflow-y: scroll;
        overflow-x: hidden;
        box-sizing: border-box;
        scrollbar-width: thin;
        padding: 1rem;
    `,
    notesContainer: css`
        position: absolute;
        left: 15rem;
        width: calc(100vw - ${consoleTheme.featureBarWidth + consoleTheme.notebookBarWidth}rem);
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    `,
    noteViewer: css`
        position: absolute;
        left: 20rem;
        width: calc(100% - 20rem);
        height: 100%;
    `,
    notebarContainer: css`
        position: absolute;
        left: 0;
        width: 20rem;
        overflow-y: auto;
        overflow-x: hidden;
        border-right: solid 1px #e3e3e3;
        height: 100%;
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
            <div className={styles.titleCol}>
                <input value={note.current.title}/>
            </div>
            <div className={styles.editCol}>
                <div contentEditable={true} className={styles.editText}>{note.current.body}</div>
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
        </ConsoleLayout>
    )
}
