import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateBoardModal from '../components/CreateBoardModal'
import { asyncActionDispatcher, asyncCreateBoard, asyncFetchStandbyBgImages, setBgImageTimestamp } from '../redux/actions'
import { IBoardBase } from '../schemas/IBoard'

const mapStateToProps = (store: any, props: any) => {
    return {
        bgColors: store.board.get('standbyBgColors'),
        bgImages: store.board.get('standbyBgImages'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncCreateBoard: (board: IBoardBase) => asyncActionDispatcher<string>(dispatch, asyncCreateBoard, board),
    asyncFetchStandbyBgImages: () => dispatch(asyncFetchStandbyBgImages()),
    setBgImageTimestamp: (time: number) => dispatch(setBgImageTimestamp(time)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateBoardModal)
