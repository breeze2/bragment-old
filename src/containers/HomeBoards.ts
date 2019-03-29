import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import HomeBoards from '../components/HomeBoards'
import { asyncFetchBoardList, setCreateBoardModalVisible } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        personalList: store.board.get('list'),
        recentlyList: store.board.get('recentlyViewed'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchBoardList: () => dispatch(asyncFetchBoardList()),
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisible(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeBoards)
