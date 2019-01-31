package ro.unibuc.rankohmeter.mappers;

import ro.unibuc.rankohmeter.entities.Lol;
import ro.unibuc.rankohmeter.models.LolEntityModel;

public class LolMapper {
    private LolMapper() {
    }

    public static LolEntityModel toModel(final Lol lol){
        return LolEntityModel.builder()
                .id(lol.getId())
                .name(lol.getName())
                .wins(lol.getWins())
                .losses(lol.getLosses())
                .division(lol.getDivision())
                .points(lol.getPoints())
                .mostUsedChamps(lol.getMostUsedChamps())
                .kills(lol.getKills())
                .deaths(lol.getDeaths())
                .assists(lol.getAssists())
                .build();
    }
}
