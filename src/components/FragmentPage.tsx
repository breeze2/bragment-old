import { Icon } from 'antd'
import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import IFragmentInfo from '../schemas/IFragmentInfo'
import FragmentEditor from './FragmentEditor'
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
    private _fragmentInfo: IFragmentInfo | null
    public constructor(props: IFragmentPageProps) {
        super(props)
        this.state = {
            content: '',
            title: '',
        }
        this._fragmentInfo = null
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
    public render() {
        return (
            <div className="fragment-page">
                <div className="page-header">
                    <div className="page-label">
                        <div className="label-left">
                            <Icon type="left" />
                        </div>
                        <div className="label-main">
                            <TextInputChanger status='text' bluredInputHide textValue={this.state.title} inputValue={this.state.title} />
                        </div>
                        <div className="label-right" />
                    </div>
                    <div className="editor-menu">
                        <Icon type="edit" />
                    </div>
                </div>
                <div className="page-content">
                    <div className="content-left">
                        {/* <FragmentEditor value={this.state.content} /> */}
                    </div>
                    <div className="content-right">
                        sdfsd
                    </div>
                </div>
            </div>
        )
    }
}

export default FragmentPage
