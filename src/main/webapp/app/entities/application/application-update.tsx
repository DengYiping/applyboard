import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPosition } from 'app/shared/model/position.model';
import { getEntities as getPositions } from 'app/entities/position/position.reducer';
import { getEntity, updateEntity, createEntity, reset } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IApplicationUpdateState {
  isNew: boolean;
  userId: string;
  positionId: string;
}

export class ApplicationUpdate extends React.Component<IApplicationUpdateProps, IApplicationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      positionId: '0',
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

    this.props.getUsers();
    this.props.getPositions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { applicationEntity } = this.props;
      const entity = {
        ...applicationEntity,
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
    this.props.history.push('/entity/application');
  };

  render() {
    const { applicationEntity, users, positions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="applyboardApp.application.home.createOrEditLabel">Create or edit a Application</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : applicationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="application-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel">Status</Label>
                  <AvInput
                    id="application-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && applicationEntity.status) || 'PREPARING'}
                  >
                    <option value="PREPARING">PREPARING</option>
                    <option value="APPLIED">APPLIED</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="INTERVIEWED">INTERVIEWED</option>
                    <option value="OFFERED">OFFERED</option>
                    <option value="REJECTED">REJECTED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="decisionLabel">Decision</Label>
                  <AvInput
                    id="application-decision"
                    type="select"
                    className="form-control"
                    name="decision"
                    value={(!isNew && applicationEntity.decision) || 'ACCEPT'}
                  >
                    <option value="ACCEPT">ACCEPT</option>
                    <option value="DECLINE">DECLINE</option>
                    <option value="WITHDRAW">WITHDRAW</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="remarkLabel" for="remark">
                    Remark
                  </Label>
                  <AvField id="application-remark" type="text" name="remark" />
                </AvGroup>
                <AvGroup>
                  <Label for="user.id">User</Label>
                  <AvInput id="application-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="position.id">Position</Label>
                  <AvInput id="application-position" type="select" className="form-control" name="position.id">
                    <option value="" key="0" />
                    {positions
                      ? positions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/application" replace color="info">
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
  users: storeState.userManagement.users,
  positions: storeState.position.entities,
  applicationEntity: storeState.application.entity,
  loading: storeState.application.loading,
  updating: storeState.application.updating,
  updateSuccess: storeState.application.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getPositions,
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
)(ApplicationUpdate);
