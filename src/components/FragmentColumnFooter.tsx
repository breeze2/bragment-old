import { Icon } from 'antd'
import React, { Component } from 'react'

interface IFragmentColumnFooterProps {
}

class FragmentColumnFooter extends Component<IFragmentColumnFooterProps> {
    public render() {
        return (
            <div className="fragment-column-footer" >
                <div className="footer-left">
                    <Icon type="plus" />
                </div>
                <p className="footer-action">{'dsfsfsdfsd'}</p>
            </div>
        )
    }
}

export default FragmentColumnFooter
