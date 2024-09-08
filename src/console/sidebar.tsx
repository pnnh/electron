import React from 'react'
import {css} from "@emotion/react";
import {LibrarySelector} from "@/console/partials/library";
import {NotebookList} from "@/console/partials/notebook";

const stylesSidebar = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border-right: solid 1px #e3e3e3;
    overflow: hidden;
    position: relative;
`

export function NotebookBar() {
    return <div css={stylesSidebar}>
        <LibrarySelector></LibrarySelector>
        <NotebookList/>
    </div>
}
