import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { approvePartner } from '../../actions';
import PropTypes from 'prop-types';
// Views
import Content from '../Content';

const PartnerTable = ({ partners, approvePartner }) => {
  const { total_pages, current_page, data } = partners;
  const partnerRows = map(data, p => (
    <div className="_table-row _body" key={p.id}>
      <div className="user-id">{p.username}</div>
      <div className="_flex_1">{p.company}</div>
      {!p.approved && (
        <div
          className="button _text-center _green-aqua"
          onClick={e =>
            approvePartner(p.id)
              .then(() => alert('승인되었습니다'))
              .catch(err => alert(err.response.data))
          }>
          승인
        </div>
      )}
    </div>
  ));

  return (
    <Content title="파트너 목록" backgroundColor="rgba(0, 0, 0, 0.58)">
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="user-id _text-center">아이디</div>
          <div className="_flex_1">회사명</div>
          <div className="button" />
        </div>
        {partnerRows}
        <p className="_white">TODO: PAGINATION</p>
      </div>
    </Content>
  );
};

PartnerTable.propTypes = {
  partners: PropTypes.object.isRequired,
};

export default connect(null, { approvePartner })(PartnerTable);
