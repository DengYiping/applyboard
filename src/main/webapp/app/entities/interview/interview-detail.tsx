import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './interview.reducer';
import { IInterview } from 'app/shared/model/interview.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInterviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InterviewDetail extends React.Component<IInterviewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { interviewEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Interview [<b>{interviewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="round">Round</span>
            </dt>
            <dd>{interviewEntity.round}</dd>
            <dt>
              <span id="detail">Detail</span>
            </dt>
            <dd>{interviewEntity.detail}</dd>
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{interviewEntity.type}</dd>
            <dt>Application</dt>
            <dd>{interviewEntity.application ? interviewEntity.application.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/interview" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/interview/${interviewEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ interview }: IRootState) => ({
  interviewEntity: interview.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewDetail);
