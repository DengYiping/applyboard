package io.applyboard.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.applyboard.domain.enumeration.ApplicationStatus;

import io.applyboard.domain.enumeration.ApplicationDecision;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "decision")
    private ApplicationDecision decision;

    @Column(name = "remark")
    private String remark;

    @OneToMany(mappedBy = "application")
    private Set<Interview> interviews = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("applications")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("applications")
    private Position position;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public Application status(ApplicationStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public ApplicationDecision getDecision() {
        return decision;
    }

    public Application decision(ApplicationDecision decision) {
        this.decision = decision;
        return this;
    }

    public void setDecision(ApplicationDecision decision) {
        this.decision = decision;
    }

    public String getRemark() {
        return remark;
    }

    public Application remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Set<Interview> getInterviews() {
        return interviews;
    }

    public Application interviews(Set<Interview> interviews) {
        this.interviews = interviews;
        return this;
    }

    public Application addInterview(Interview interview) {
        this.interviews.add(interview);
        interview.setApplication(this);
        return this;
    }

    public Application removeInterview(Interview interview) {
        this.interviews.remove(interview);
        interview.setApplication(null);
        return this;
    }

    public void setInterviews(Set<Interview> interviews) {
        this.interviews = interviews;
    }

    public User getUser() {
        return user;
    }

    public Application user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Position getPosition() {
        return position;
    }

    public Application position(Position position) {
        this.position = position;
        return this;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Application application = (Application) o;
        if (application.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), application.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", decision='" + getDecision() + "'" +
            ", remark='" + getRemark() + "'" +
            "}";
    }
}
