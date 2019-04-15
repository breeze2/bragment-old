import { Icon } from 'antd'
import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import IFragmentInfo from '../schemas/IFragmentInfo'
import FragmentEditor from './FragmentEditor'
import FragmentViewer from './FragmentViewer'
import TextInputChanger from './TextInputChanger'

import '../styles/FragmentEditor.less'
import '../styles/FragmentPage.less'

interface IFragmentPageRouteParams {
    boardId: string
    columnTitle: string
    title: string
}

interface IFragmentPageProps extends RouteComponentProps<IFragmentPageRouteParams> {
    asyncFetchFragmentInfo: (boardId: string, columnTitle: string, fragmentTitle: string) => Promise<IFragmentInfo>
}

interface IFragmentPageState {
    title: string
    content: string
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
            content: '',
            title: '',
        }
        this._fragmentInfo = null
        this._editorRef = null
        this._viewerRef = null
    }
    public componentWillMount() {
        this.setState({
            title: this.props.match.params.title,
        })
        const params = this.props.match.params
        const title = params.title
        const boardId = params.boardId
        const columnTitle = params.columnTitle
        this.props.asyncFetchFragmentInfo(boardId, columnTitle, title).then(info => {
            this._fragmentInfo = info
            this.setState({
                content: info.content,
                title: info.title,
            })
        })
    }
    public assignEditorRef = (editor: FragmentEditor) => {
        this._editorRef = editor
    }
    public assignViewerRef = (viewer: FragmentViewer) => {
        this._viewerRef = viewer
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
    public render() {
        return (
            <div className="fragment-page">
                <div className="page-header">
                    <div className="page-label">
                        <div className="label-left">
                            <Icon type="left" className="handler" />
                        </div>
                        <div className="label-main">
                            <TextInputChanger status='text' textValue={this.state.title} inputValue={this.state.title} />
                        </div>
                        <div className="label-right" >
                            <Icon type="edit" className="handler" />
                        </div>
                    </div>
                </div>
                <div className="page-content">
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
}

export default FragmentPage
