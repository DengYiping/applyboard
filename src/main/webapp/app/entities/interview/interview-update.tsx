import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplication } from 'app/shared/model/application.model';
import { getEntities as getApplications } from 'app/entities/application/application.reducer';
import { getEntity, updateEntity, createEntity, reset } from './interview.reducer';
import { IInterview } from 'app/shared/model/interview.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInterviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInterviewUpdateState {
  isNew: boolean;
  applicationId: string;
}

export class InterviewUpdate extends React.Component<IInterviewUpdateProps, IInterviewUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      applicationId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getApplications();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { interviewEntity } = this.props;
      const entity = {
        ...interviewEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/interview');
  };

  render() {
    const { interviewEntity, applications, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="applyboardApp.interview.home.createOrEditLabel">Create or edit a Interview</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : interviewEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="interview-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roundLabel" for="round">
                    Round
                  </Label>
                  <AvField id="interview-round" type="string" className="form-control" name="round" />
                </AvGroup>
                <AvGroup>
                  <Label id="detailLabel" for="detail">
                    Detail
                  </Label>
                  <AvField id="interview-detail" type="text" name="detail" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">Type</Label>
                  <AvInput
                    id="interview-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && interviewEntity.type) || 'HR'}
                  >
                    <option value="HR">HR</option>
                    <option value="CODING">CODING</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="SYSTEM_DESIGN">SYSTEM_DESIGN</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="application.id">Application</Label>
                  <AvInput id="interview-application" type="select" className="form-control" name="application.id">
                    <option value="" key="0" />
                    {applications
                      ? applications.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/interview" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  applications: storeState.application.entities,
  interviewEntity: storeState.interview.entity,
  loading: storeState.interview.loading,
  updating: storeState.interview.updating,
  updateSuccess: storeState.interview.updateSuccess
});

const mapDispatchToProps = {
  getApplications,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewUpdate);
