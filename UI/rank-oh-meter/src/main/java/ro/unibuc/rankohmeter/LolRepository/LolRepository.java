package ro.unibuc.rankohmeter.LolRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.unibuc.rankohmeter.entities.Lol;

public interface LolRepository extends JpaRepository<Lol, Long> {
}
