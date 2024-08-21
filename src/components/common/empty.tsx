import React from 'react'
import styles from './empty.module.scss'

export function NoData(props: { size: 'small' | 'middle' | 'large' }) {
    let width = 100
    if (props.size === 'middle') {
        width = 200
    } else if (props.size === 'large') {
        width = 300
    }
    return <div className={styles.noData}>
        <img src='/images/interface/nodata.jpeg' alt='empty' width={width} height={width}></img>
    </div>
}
