import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConcerts } from '../actions';
import { map } from 'lodash';
import { withRouter } from 'react-router-dom';
// view
import Loading from './Loading';

class ConcertList extends Component {
  state = { fetched: false };

  constructor({ fetchConcerts }) {
    super();
    fetchConcerts()
      .then(() => this.setState({ fetched: true }))
      .catch(msg => alert(msg));
  }

  render() {
    const concertList =
      this.props.concertList.length == 0
        ? '등록된 공연이 없습니다.'
        : map(this.props.concertList, c => (
            <div
              key={c.id}
              onClick={e => this.props.history.push(`/concert/${c.id}`)}>
              {c.title}
            </div>
          ));

    return this.state.fetched ? <div>{concertList}</div> : <Loading />;
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList };
}

export default withRouter(
  connect(mapStateToProps, { fetchConcerts })(ConcertList)
);
