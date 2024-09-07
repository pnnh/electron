import React from 'react'
import {ConsoleFeature} from './partials/feature'
import {css} from "@emotion/css";

export function ConsoleLayout({
                                  children
                              }: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.consolePage}>
            <div className={styles.mainContainer}>
                <div className={styles.leftNav}>
                    <ConsoleFeature/>
                </div>
                <div className={styles.rightBody}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const consolePage = css`
    background: #FFFFFF;
    height: 100vh;
`
const leftNav = css`
    width: 3rem;
    position: absolute;
    left: 0;
    height: 100%;
`
const rightBody = css`
    position: absolute;
    left: 3rem;
    width: calc(100vw - 3rem);
    height: 100vh;
    background: #FFFFFF;
`

const mainContainer = css`
    height: calc(100vh - 3rem);
`
const navbar = css`
    height: 40px;
    border-bottom: #d5d5d5 solid 0.5px;
    display: flex;
    flex-direction: row;
    padding: 0;
    align-items: center;
    flex-shrink: 0;
    background-color: #F5F5F5;
`
const styles = {
    consolePage,
    leftNav,
    rightBody,
    mainContainer,
    navbar
}
