import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { approvePartner } from '../../actions';
import PropTypes from 'prop-types';
// Views
import Content from '../Content';

const PartnerTable = ({ partners, approvePartner }) => {
  const ApproveButton = ({ id }) => (
    <button
      onClick={e =>
        approvePartner(id)
          .then(() => alert('성공'))
          .catch(msg => alert(msg))
      }>
      승인
    </button>
  );

  const partnerRows = map(partners, p => (
    <div className="_table-row _body" key={p.id}>
      <div className="user-id">{p.username}</div>
      <div className="_flex_1">{p.company}</div>
      {p.approved ? 'O' : <ApproveButton id={p.id} />}
    </div>
  ));

  return (
    <Content title="파트너 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="user-id text-cetner">아이디</div>
          <div className="_flex_1">회사명</div>
        </div>
        {partnerRows}
      </div>
    </Content>
  );
};

PartnerTable.propTypes = {
  // prop 'partners' should be an array of partner objects
  partners: PropTypes.arrayOf(PropTypes.object),
};

export default connect(null, { approvePartner })(PartnerTable);
