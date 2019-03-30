import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppHeader from '../components/AppHeader'
import { asyncFetchBoardList, setCreateBoardModalVisible } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        boardList: store.board.get('list'),
        currentBoard: store.board.get('current'),
        // createBoardModalVisible: store.app.get('createBoardModalVisible'),
        // language: store.app.get('language'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchBoardList: () => dispatch(asyncFetchBoardList()),
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisible(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppHeader)
