import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BoardPage from '../pages/Board'
import { setCurrentBoard } from '../redux/actions'
import IBoard from '../schemas/IBoard'

const mapStateToProps = (store: any, props: any) => {
    return {
        boardList: store.board.get('list'),
        currentBoard: store.board.get('current'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    setCurrentBoard: (board: IBoard | null) => dispatch(setCurrentBoard(board)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardPage)
