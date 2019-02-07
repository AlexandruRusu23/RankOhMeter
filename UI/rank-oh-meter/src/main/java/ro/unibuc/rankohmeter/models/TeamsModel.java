package ro.unibuc.rankohmeter.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamsModel {

    private List<LolEntityModel> team1;
    private List<LolEntityModel> team2;
}
