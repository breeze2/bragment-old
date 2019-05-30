import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateBoardModal from '../components/CreateBoardModal'
import { asyncActionDispatcher, asyncCreateBoardAction, asyncFetchStandbyBgImagesAction,
    setBgImageTimestampAction } from '../redux/actions'
import { IBoardBase } from '../schemas/IBoard'

const mapStateToProps = (store: any, props: any) => {
    return {
        bgColors: store.board.get('standbyBgColors'),
        bgImages: store.board.get('standbyBgImages'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncCreateBoard: (board: IBoardBase) => asyncActionDispatcher<string>(dispatch, asyncCreateBoardAction(board)),
    asyncFetchStandbyBgImages: () => dispatch(asyncFetchStandbyBgImagesAction()),
    setBgImageTimestamp: (time: number) => dispatch(setBgImageTimestampAction(time)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateBoardModal)
