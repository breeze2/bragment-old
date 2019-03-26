import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import App from '../components/App'

const mapStateToProps = (store: any, props: any) => {
    return {
        language: store.app.get('language'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
