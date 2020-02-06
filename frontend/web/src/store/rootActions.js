import * as ticketsActions from '../store/tickets/actions'
import { bindActionCreators } from 'redux'

const rootActions = dispatch => {
  return {
    ticketsActions: bindActionCreators(ticketsActions, dispatch)
  }
}

export default rootActions