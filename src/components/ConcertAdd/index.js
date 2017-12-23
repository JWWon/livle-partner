import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { fetchConcerts } from '../../actions';
import TicketForm from './TicketForm';
import Content from '../Content';

class ConcertAdd extends Component {
  state = { fetched: false };

  constructor({ fetchConcerts }) {
    super();
    this.handleClick = this.handleClick.bind(this);
    fetchConcerts()
      .then(() => this.setState({ fetched: true }))
      .catch(msg => alert(msg));

    this.state = { selectedConcert: '' };
  }

  handleClick(selectedConcert) {
    this.setState({ selectedConcert });
  }

  render() {
    const concertList =
      this.props.concertList.length == 0
        ? '등록된 공연이 없습니다.'
        : map(this.props.concertList, c => {
            return (
              <div key={c.id}>
                {c.title}
                <button
                  type="click"
                  onClick={e => {
                    e.preventDefault();
                    this.handleClick(c);
                  }}>
                  수정하기
                </button>
              </div>
            );
          });

    return (
      <div>
        <Content title="공연 등록" backgroundColor="rgba(0, 0, 0, 0.58)">
          <TicketForm
            selected={this.state.selectedConcert}
            key={this.state.selectedConcert.id || '00000'}
          />
        </Content>
        <Content title="공연 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
          <div>{this.state.fetched ? concertList : 'Loading...'}</div>
        </Content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList };
}

export default connect(mapStateToProps, { fetchConcerts })(ConcertAdd);
