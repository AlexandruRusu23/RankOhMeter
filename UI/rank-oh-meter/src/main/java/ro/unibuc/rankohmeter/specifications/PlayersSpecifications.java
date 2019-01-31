package ro.unibuc.rankohmeter.specifications;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import ro.unibuc.rankohmeter.entities.Lol;
import ro.unibuc.rankohmeter.models.LolFilterModel;

import java.util.ArrayList;
import java.util.List;

public class PlayersSpecifications {

    private PlayersSpecifications() {}

    public static Specification<Lol> getPlayersSpecification(final LolFilterModel lolFilterModel) {
        final List<Specification<Lol>> specifications = new ArrayList<>();

        if (!StringUtils.isEmpty(lolFilterModel.getNameEquals())) {
            specifications.add(equalsName(lolFilterModel.getNameEquals()));

        }

        if (!StringUtils.isEmpty(lolFilterModel.getDivisionEquals())) {
            specifications.add(equalsDivision(lolFilterModel.getDivisionEquals()));

        }

        if (!StringUtils.isEmpty(lolFilterModel.getMostUsedChampsEquals())) {
            specifications.add(equalsMostUsedChamps(lolFilterModel.getNameEquals()));

        }
        return specifications.stream().map(Specification::where).reduce(Specification.where(null), Specification::and);
    }

    private static Specification<Lol> equalsName(final String fieldValue) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("name"), fieldValue);
    }

    private static Specification<Lol> equalsDivision(final String fieldValue) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("division"), fieldValue);
    }

    private static Specification<Lol> equalsMostUsedChamps(final String fieldValue) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("most_used_champs"), fieldValue);
    }
}
