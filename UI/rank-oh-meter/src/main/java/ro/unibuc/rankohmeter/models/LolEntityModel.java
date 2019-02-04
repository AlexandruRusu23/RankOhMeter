package ro.unibuc.rankohmeter.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LolEntityModel extends GenericListFilterModel {

    private Long id;

    private String name;

    private Long wins;

    private Long losses;

    private String division;

    private Long points;

    private String mostUsedChamps;

    private String kills;

    private String deaths;

    private String assists;

    private Long playerRank;
}
