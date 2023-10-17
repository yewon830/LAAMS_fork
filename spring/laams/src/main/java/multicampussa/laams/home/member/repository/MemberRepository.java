package multicampussa.laams.home.member.repository;

import multicampussa.laams.director.domain.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Director, Long> {
    boolean existsByEmail(String email);
    boolean existsById(String id);
    Optional<Director> findById(String id);
    Optional<Director> findByEmail(String email);
}
