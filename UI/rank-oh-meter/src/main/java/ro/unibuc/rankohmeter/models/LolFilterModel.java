package ro.unibuc.rankohmeter.models;

import lombok.*;

@Builder
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class LolFilterModel extends GenericListFilterModel {

    private String nameEquals;

    private String divisionEquals;

    private String mostUsedChampsEquals;

}
