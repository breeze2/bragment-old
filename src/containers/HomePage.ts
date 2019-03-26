import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import HomePage from '../pages/Home'

const mapStateToProps = (store: any, props: any) => {
    return {
        selectedMenuKey: store.home.get('selectedMenuKey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage)
