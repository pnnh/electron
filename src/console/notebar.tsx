'use client'

import {useEffect, useState} from 'react'
import styles from './notebar.module.scss'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {PLSelectResult} from '@/models/common-result'
import {noteAtom, notebookAtom} from './providers/notebook'
import {NoteService} from '@/services/personal/notes'
import {NoteModel} from '@/models/personal/note'
import React from 'react'

export function ConsoleNotebar() {

    const [directories, setDirectories] = useState<PLSelectResult<NoteModel>>()
    const notebook = useRecoilValue(notebookAtom)
    useEffect(() => {
        const loadData = async () => {
            if (!notebook || notebook === '') {
                return
            }
            const directories = await NoteService.selectNotes(notebook)
            setDirectories(directories)

        }
        loadData()
    }, [notebook])

    if (!directories || !directories.range || directories.range.length <= 0) {
        return <div>Empty</div>
    }
    return <div className={styles.noteList}>
        {
            directories.range.map(item => {
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
            const children = await NoteService.selectSubNotes(item.uid)
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
                console.debug('setLibrary', item.name)
                setNote(item.uid)
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
