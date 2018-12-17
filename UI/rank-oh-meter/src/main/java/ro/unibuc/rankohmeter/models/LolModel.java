package ro.unibuc.rankohmeter.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LolModel {

    private Long id;

    private String name;

    private Long wins;

    private Long losses;

    private String division;

    private Long points;

    private String most_used_champs;

    private Long kills;

    private Long deaths;

    private Long assists;
}
