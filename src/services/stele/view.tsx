import styles from './view.module.scss'
import {CodeBlockNode, HeadingNode, ImageNode, LinkNode, ListNode, ParagraphNode, SteleNode} from './core'
import {generatorRandomString} from "@/utils/string";
import {TocItem} from "@/models/common/article";

export function buildNodeView(tocList: Array<TocItem>, node: SteleNode, assetsUrl: string): JSX.Element {
    if (!node) return <></>

    switch (node.name) {
        case 'header':
            return buildHeader(tocList, node as HeadingNode)
        case 'code-block':
            return buildCodeBlock(tocList, node as CodeBlockNode)
        case 'link':
            return buildLink(tocList, node as LinkNode)
        case 'paragraph':
            return buildParagraph(tocList, node, assetsUrl)
        case 'body':
            return buildBodyView(tocList, node, assetsUrl)
        case 'image':
            return buildImage(node as ImageNode, assetsUrl)
        case 'list':
            return buildList(node as ListNode, assetsUrl)
        case 'em':
        case 'strong':
        case 'del':
            return buildStyleText(tocList, node, {
                strong: node.name === 'strong',
                italic: node.name === 'em',
                underline: false,
                strikethrough: node.name === 'del'
            })
        default:
            return buildTextView(tocList, node, assetsUrl)
    }
}

function buildBodyView(tocList: Array<TocItem>, node: SteleNode, assetsUrl: string) {
    return <div className={styles.bodyHtml}>

        {node.children && node.children.length > 0
            ? node.children.map((child, index) => {
                return <div key={`node-${index}`}>{buildNodeView(tocList, child, assetsUrl)}</div>
            })
            : <></>
        }

    </div>
}

function buildParagraph(tocList: Array<TocItem>, node: ParagraphNode, assetsUrl: string) {
    if (!node) return <p></p>
    const children = node.children
    if (!children || children.length < 1) return <p></p>

    return <p key={node.id} className={styles.paragraph}>
        {children.map((child, index) => {
            return <span key={`paragraph-${index}`}>{buildNodeView(tocList, child, assetsUrl)}</span>
        })}
    </p>
}

function buildLink(tocList: Array<TocItem>, node: LinkNode) {
    return <a key={node.id} className={styles.link} href={node.href} target={'_blank'}>{node.text}</a>
}

function buildStyleText(tocList: Array<TocItem>, node: SteleNode, {strong, italic, underline, strikethrough}: {
    strong: boolean | undefined,
    italic: boolean | undefined,
    underline: boolean | undefined,
    strikethrough: boolean | undefined
}) {
    let className = ''
    if (strong) {
        className += ' ' + styles.strong
    }
    if (italic) {
        className += ' ' + styles.italic
    }
    if (underline) {
        className += ' ' + styles.underline
    }
    if (strikethrough) {
        className += ' ' + styles.strikethrough
    }
    return <span key={node.id} className={className}>{node.text}</span>
}

function buildTextView(tocList: Array<TocItem>, node: SteleNode, assetsUrl: string) {
    if (!node.children) {
        return <span key={node.id}>{node.text}</span>
    }
    return <span key={node.id}>{node.children.map((child, index) => {
        return buildNodeView([], child, assetsUrl)
    })}</span>
}

function buildHeader(tocList: Array<TocItem>, node: HeadingNode) {
    const header = node.header as number
    const children = node.children
    if (!children || children.length < 1) return <></>
    const headerTitle = node.text
    const randId = generatorRandomString(8)
    tocList.push({title: headerTitle, header, id: randId})

    switch (header) {
        case 1:
            return <h1 key={node.id} id={randId} className={styles.headerOne}>{headerTitle}</h1>
        case 2:
            return <h2 key={node.id} id={randId} className={styles.headerTwo}>{headerTitle}</h2>
        case 3:
            return <h3 key={node.id} id={randId} className={styles.headerThree}>{headerTitle}</h3>
        case 4:
            return <h4 key={node.id} id={randId} className={styles.headerFour}>{headerTitle}</h4>
        case 5:
            return <h5 key={node.id} id={randId} className={styles.headerFive}>{headerTitle}</h5>
        case 6:
            return <h6 key={node.id} id={randId} className={styles.headerSix}>{headerTitle}</h6>
    }
    return <></>
}

export function buildCodeBlock(tocList: Array<TocItem>, node: CodeBlockNode) {
    let language = node.language
    let codeText = node.text
    if (!language) {
        language = 'text'
    }
    if (!codeText && node.children) {
        codeText = node.children.map((child) => {
            return child.text
        }).join()
    }

    return <code key={node.id} className={styles.codeblock}>
        <polaris-codeblock language={language}>
            {codeText}
        </polaris-codeblock>
    </code>
}

export function buildImage(node: ImageNode, assetsUrl: string) {
    return <img key={node.id} className={styles.stImg} src={`${assetsUrl}/${node.href}`} alt={node.text}/>
}

export function buildList(node: ListNode, assetsUrl: string) {
    return <ul key={node.id}>
        {node.children && node.children.map((child, index) => {
            return <li key={`list-${index}`}>{buildNodeView([], child, assetsUrl)}</li>
        })}
    </ul>
}
