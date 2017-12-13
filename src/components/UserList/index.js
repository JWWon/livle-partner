import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPartners, fetchUsers } from '../../actions'
import { map } from 'lodash'
import PartnerTable from './PartnerTable'
import UserTable from './UserTable'

class UserList extends Component {
  state = { partnerFetched: false, userFetched: false }

  componentWillMount() {
    const { fetchPartners, fetchUsers } = this.props
    fetchPartners()
      .then(() => this.setState({ partnerFetched: true }))
      .catch((msg) => alert(msg))
    fetchUsers()
      .then(() => this.setState({ userFetched: true }))
      .catch((msg) => alert(msg))
  }

  render() {
    const userList = map(this.props.userList, u => <div key={u.email}>{u.email}</div>)

    return (<div>
      <h1>목록</h1>
      <div>
        <h2>라이블 회원 목록</h2>
        { this.state.userFetched ? <UserTable users={this.props.userList} /> : 'Loading...' }
      </div>
      <div>
        <h2>파트너 회원 목록</h2>
        { this.state.partnerFetched ? <PartnerTable partners={this.props.partnerList} /> : 'Loading...' }
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return { userList: state.userList, partnerList: state.partnerList }
}

export default connect(mapStateToProps, { fetchPartners, fetchUsers })(UserList)