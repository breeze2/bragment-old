import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppHeader from '../components/AppHeader'
import { setCreateBoardModalVisibleAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        boardList: store.board.get('list'),
        currentBoard: store.board.get('current'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisibleAction(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppHeader)
