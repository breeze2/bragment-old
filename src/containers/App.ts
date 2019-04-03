import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import App from '../components/App'
import { asyncFetchBoardListAction, setCreateBoardModalVisibleAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        createBoardModalVisible: store.app.get('createBoardModalVisible'),
        currentBoard: store.board.get('current'),
        language: store.app.get('language'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchBoardList: () => dispatch(asyncFetchBoardListAction()),
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisibleAction(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
