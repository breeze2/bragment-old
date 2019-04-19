import { Button, Icon } from 'antd'
import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import IFragmentInfo from '../schemas/IFragmentInfo'
import FragmentEditor from './FragmentEditor'
import FragmentViewer from './FragmentViewer'
import TextInputChanger from './TextInputChanger'

import '../styles/FragmentEditor.less'
import '../styles/FragmentPage.less'
import Utils from '../utils'

interface IFragmentPageRouteParams {
    boardId: string
    columnTitle: string
    title: string
}

interface IFragmentPageProps extends RouteComponentProps<IFragmentPageRouteParams> {
    asyncFetchFragmentInfo: (boardId: string, columnTitle: string, fragmentTitle: string) => Promise<IFragmentInfo>
    asyncRenameFragment: (boardId: string, columnTitle: string, fragmentTitle: string, newFragmentTitle: string) => Promise<boolean>
    asyncSaveFragmentContent: (fragmentPath: string, fragmentContent: string) => Promise<true>
}

interface IFragmentPageState {
    title: string
    pageLayoutStatus: 'only-left' | 'only-right' | ''
}

class FragmentPage extends PureComponent<IFragmentPageProps> {
    public state: IFragmentPageState
    public isSettingEditorScrollLine = 0
    public isSettingViewerScrollLine = 0
    private _fragmentInfo: IFragmentInfo | null
    private _editorRef: FragmentEditor | null
    private _viewerRef: FragmentViewer | null
    public constructor(props: IFragmentPageProps) {
        super(props)
        this.state = {
            pageLayoutStatus: 'only-right',
            title: '',
        }
        this._fragmentInfo = null
        this._editorRef = null
        this._viewerRef = null
    }
    public componentWillMount() {
        // this.setState({
        //     title: this.props.match.params.title,
        // })
        // const params = this.props.match.params
        // const title = params.title
        // const boardId = params.boardId
        // const columnTitle = params.columnTitle
        // this.setState({ title: Utils.fixedFragmentTitle(title) })
        // this.props.asyncFetchFragmentInfo(boardId, columnTitle, title).then(info => {
        //     this._fragmentInfo = info
        //     const editor = this._editorRef
        //     if (editor) {
        //         editor.setValue(info.content)
        //     }
        // })
        this._initFragment(this.props)
    }
    public componentWillReceiveProps (props: IFragmentPageProps) {
        this._initFragment(props)
    }
    public assignEditorRef = (editor: FragmentEditor) => {
        this._editorRef = editor
    }
    public assignViewerRef = (viewer: FragmentViewer) => {
        this._viewerRef = viewer
    }
    public handleTitleChange = (newTitle: string) => {
        newTitle = newTitle.trim()
        if (this.state.title === newTitle) {
            return
        } else {
            const params = this.props.match.params
            const title = params.title
            const boardId = params.boardId
            const columnTitle = params.columnTitle
            this.props.asyncRenameFragment(boardId, columnTitle, title, newTitle + '.md').then(result => {
                if (result) {
                    this.props.history.replace(`/fragment/${boardId}/${columnTitle}/${newTitle}.md`)
                }
            })
        }
    }
    public handleEditorValueChange = (content: string) => {
        console.log(content)
        if (this._viewerRef) {
            this._viewerRef.setValue(content)
        }
    }
    public handleEditorScroll = (lineNumber: number) => {
        if (this._viewerRef && !this._viewerRef.isMouseHover()) {
            this._viewerRef.setScrollLine(lineNumber)
        }
    }
    public handleViewerScroll = (lineNumber: number) => {
        if (this._editorRef && !this._editorRef.isMouseHover()) {
            this._editorRef.setScrollLine(lineNumber)
        }
    }
    public showViewer = () => {
        if (this.state.pageLayoutStatus === '') {
            this.setState({
                pageLayoutStatus: 'only-left',
            })
        } else {
            this.setState({
                pageLayoutStatus: '',
            })
        }
    }
    public showEditor = () => {
        this.setState({
            pageLayoutStatus: '',
        })
    }
    public saveEditorContent = () => {
        const editor = this._editorRef
        const info = this._fragmentInfo
        if (editor && info) {
            const content = editor.getValue()
            const path = Utils.joinPath(info.boardPath, info.columnTitle, info.title)
            this.props.asyncSaveFragmentContent(path, content).then(() => {
                this.setState({
                    pageLayoutStatus: 'only-right',
                })
            })
        }
    }
    public render() {
        return (
            <div className="fragment-page">
                <div className="page-header">
                    <div className="page-label">
                        <div className="label-left">
                            <Icon type="left" className="handler" onClick={this.props.history.goBack} />
                        </div>
                        <div className="label-main">
                            <TextInputChanger status='text' onInputSubmit={this.handleTitleChange} textValue={this.state.title} inputValue={this.state.title} />
                        </div>
                        <div className="label-right" >
                            {this.state.pageLayoutStatus === 'only-right' ?
                                <Button shape="circle" icon="edit" className="label-action" onClick={this.showEditor} /> :
                                <Button shape="circle" icon="download" className="label-action" onClick={this.saveEditorContent} />
                            }
                            <Button shape="circle" disabled={this.state.pageLayoutStatus === 'only-right'} icon={this.state.pageLayoutStatus === ''
                                ? 'eye-invisible' : 'eye'} className="label-action" onClick={this.showViewer} />
                        </div>
                    </div>
                </div>
                <div className={`page-content ${this.state.pageLayoutStatus}`}>
                    <div className="content-left">
                        <FragmentEditor ref={this.assignEditorRef} value='' onChange={this.handleEditorValueChange} onScroll={this.handleEditorScroll} />
                    </div>
                    <div className="content-right">
                        <FragmentViewer ref={this.assignViewerRef} value='' onScroll={this.handleViewerScroll} />
                    </div>
                </div>
            </div>
        )
    }
    private _initFragment(props: IFragmentPageProps) {
        this.setState({
            title: props.match.params.title,
        })
        const params = props.match.params
        const title = params.title
        const boardId = params.boardId
        const columnTitle = params.columnTitle
        this.setState({ title: Utils.fixedFragmentTitle(title) })
        props.asyncFetchFragmentInfo(boardId, columnTitle, title).then(info => {
            this._fragmentInfo = info
            const editor = this._editorRef
            if (editor) {
                editor.setValue(info.content)
            }
        })
    }
}

export default FragmentPage
