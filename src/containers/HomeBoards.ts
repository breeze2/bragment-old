import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import HomeBoards from '../components/HomeBoards'
import { asyncFetchBoardListAction, setCreateBoardModalVisibleAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        personalList: store.board.get('list'),
        recentlyList: store.board.get('recentlyViewed'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchBoardList: () => dispatch(asyncFetchBoardListAction()),
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisibleAction(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeBoards)
