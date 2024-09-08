import {NotebookBar} from './sidebar'
import {ConsoleNotebar} from './notebar'
import React from 'react'
import {ConsoleLayout} from "@/console/layout";
import {css} from "@emotion/css";
import {consoleTheme} from "@/console/theme";
import {ArticleEditorArea} from "@/console/partials/viewer";

const styles = {
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
                    <ArticleEditorArea></ArticleEditorArea>
                </div>
            </div>
        </ConsoleLayout>
    )
}
