package ro.unibuc.rankohmeter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ro.unibuc.rankohmeter.entities.Lol;

public interface LolRepository extends JpaRepository<Lol, Long>, JpaSpecificationExecutor<Lol> {
}
