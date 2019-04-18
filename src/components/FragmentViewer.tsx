import { Icon, Popover } from 'antd'
import mermaid from 'mermaid'
import React, { PureComponent } from 'react'
import Api from '../api'
import Utils from '../utils'

import 'github-markdown-css/github-markdown.css'
import 'katex/dist/katex.css'
import '../styles/FragmentViewer.less'

interface IFragmentViewerProps {
    value: string
    onScroll?: (lineNumber: number) => any
}

interface IFragmentViewerState {
    content: string
    toc: string
}

class FragmentViewer extends PureComponent<IFragmentViewerProps> {
    public state: IFragmentViewerState
    public parseMdContent = Utils.debounce(this._parseMdContent, 100)
    public emitEditorScroll = Utils.debounce(this._emitViewerScroll, 400)
    private _ref: HTMLDivElement | null = null
    private _lineNodes: NodeListOf<HTMLElement> | null = null
    public constructor(props: IFragmentViewerProps) {
        super(props)
        this.state = {
            content: '',
            toc: '',
        }
    }
    public componentDidUpdate() {
        mermaid.init('.mermaid')
        if (this._ref) {
            this._lineNodes = this._ref.querySelectorAll('[data-source-line]')
        }
    }
    public assignRef = (div: HTMLDivElement) => {
        this._ref = div
    }
    public isMouseHover() {
        if (this._ref && this._ref.matches(':hover')) {
            return true
        }
        return false
    }
    public setValue(value: string) {
        this.parseMdContent(value)
    }
    public setScrollLine(lineNumber: number) {
        if (this._ref && this._lineNodes) {
            let toTop: number | null = null
            const viewer = this._ref
            const lineNodes = this._lineNodes
            const length = lineNodes.length
            for (let i = 1; i < length; i++) {
                const line = parseInt(lineNodes[i].dataset.sourceLine || '0', 10)
                if (line >= lineNumber) {
                    const line0 = parseInt(lineNodes[i - 1].dataset.sourceLine || '0', 10)
                    const line1 = parseInt(lineNodes[i].dataset.sourceLine || '0', 10)
                    const offsetTop0 = lineNodes[i - 1].offsetTop
                    const offsetTop1 = lineNodes[i].offsetTop
                    const diff0 = lineNumber - line0
                    const diff1 = line1 - lineNumber
                    toTop = Math.round(offsetTop0 + (offsetTop1 - offsetTop0) * diff0 / (diff0 + diff1))
                    break
                }
            }
            toTop = toTop === null ? viewer.scrollHeight : toTop
            return Utils.asyncSmoothScrollWrapper((top: number) => {
                viewer.scrollTop = top
            }, viewer.scrollTop, toTop, 480)
        }
    }
    public handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const div = this._ref
        if (div) {
            const el = e.target as HTMLElement
            if (el.tagName === 'A') {
                const href = el.dataset.href || ''
                if (href[0] === '#') {
                    // scroll to target
                    const target = div.querySelector(href)
                    if (target) {
                        const line = (target as HTMLElement).dataset.sourceLine
                        if (line) {
                            this.setScrollLine(parseInt(line, 10))
                        }
                    }
                } else {
                    // open with webview
                }
            }
        }
    }
    public render() {
        return (
            <div className="fragment-viewer" ref={this.assignRef}
                onClick={this.handleClick}
                onScroll={() => this.emitEditorScroll()}>
                <div className="markdown-body" dangerouslySetInnerHTML={{
                    __html: this.state.content,
                }} />
                <Popover overlayClassName="toc-popover" trigger="click" content={
                    <div className="toc-list" dangerouslySetInnerHTML={{
                        __html: this.state.toc,
                    }} />
                } arrowPointAtCenter >
                    <Icon style={{
                        display: this.state.toc ? 'inline-block' : 'none',
                    }} className="toc-icon" type="ordered-list" />
                </Popover>
            </div>
        )
    }
    public _parseMdContent(value: string) {
        const html = Api.mdParser(value)
        const { content, toc } = Api.htmlSecureParser(html)
        this.setState({
            content,
            toc,
        })
    }
    private _emitViewerScroll() {
        if (this.props.onScroll && this._ref && this._lineNodes) {
            const lineNodes = this._lineNodes
            const scrollTop = this._ref.scrollTop
            const length = lineNodes.length
            let lineNumber = 0
            for (let i = 1; i < length; i++) {
                if (lineNodes[i].offsetTop >= scrollTop) {
                    const diff0 = scrollTop - lineNodes[i - 1].offsetTop
                    const diff1 = lineNodes[i].offsetTop - scrollTop
                    const line0 = parseInt(lineNodes[i - 1].dataset.sourceLine || '0', 10)
                    const line1 = parseInt(lineNodes[i].dataset.sourceLine || '0', 10)
                    lineNumber = Math.round(line0 + (line1 - line0) * diff0 / (diff0 + diff1))
                    break
                }
            }
            this.props.onScroll(lineNumber)
        }
    }
}

export default FragmentViewer
