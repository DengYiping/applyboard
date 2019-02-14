package io.applyboard.repository;

import io.applyboard.domain.Application;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Application entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("select application from Application application where application.user.login = ?#{principal.username}")
    List<Application> findByUserIsCurrentUser();

}
