package ro.unibuc.rankohmeter.mappers;

import ro.unibuc.rankohmeter.entities.Lol;
import ro.unibuc.rankohmeter.models.LolModel;

public class LolMapper {
    private LolMapper() {
    }

    public static LolModel toModel(final Lol lol){
        return LolModel.builder()
                .id(lol.getId())
                .wins(lol.getWins())
                .losses(lol.getLosses())
                .division(lol.getDivision())
                .points(lol.getPoints())
                .most_used_champs(lol.getMostUsedChamps())
                .kills(lol.getKills())
                .deaths(lol.getDeaths())
                .assists(lol.getAssists())
                .build();
    }
}
