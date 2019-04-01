import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import App from '../components/App'
import { asyncFetchBoardList, setCreateBoardModalVisible } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        createBoardModalVisible: store.app.get('createBoardModalVisible'),
        currentBoard: store.board.get('current'),
        language: store.app.get('language'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchBoardList: () => dispatch(asyncFetchBoardList()),
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisible(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
