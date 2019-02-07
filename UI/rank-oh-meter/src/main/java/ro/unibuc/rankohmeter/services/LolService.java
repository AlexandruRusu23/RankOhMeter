package ro.unibuc.rankohmeter.services;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.unibuc.rankohmeter.entities.Lol;
import ro.unibuc.rankohmeter.models.*;
import ro.unibuc.rankohmeter.repositories.LolRepository;
import ro.unibuc.rankohmeter.mappers.LolMapper;
import ro.unibuc.rankohmeter.specifications.PlayersSpecifications;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LolService {

    @NonNull
    private final LolRepository lolRepository;

    public List<LolNoPagModel> getAllNoPagPlayers() {
        return lolRepository
                .findAll()
                .stream()
                .map(LolMapper::toNoPagModel)
                .collect(Collectors.toList());
    }

    public GenericListModel<LolEntityModel> getAllPlayers(final LolFilterModel lolFilterModel) {
        final Page<Lol> lolPlayers = lolRepository.findAll(
                PlayersSpecifications.getPlayersSpecification(lolFilterModel),
                PageRequest.of(lolFilterModel.getPage(),
                        lolFilterModel.getSize(),
                        Sort.by("id")));

        List<LolEntityModel> lolEntityModels = lolPlayers.getContent()
                .stream()
                .map(LolMapper::toModel)
                .collect(Collectors.toList());

        return GenericListModel.<LolEntityModel>builder()
                .items(lolEntityModels)
                .totalCount(lolPlayers.getTotalElements())
                .build();
    }

    public List<Map<String, Integer>> getRankingsForSelectedPlayers(final TeamsModel teams) {
        Map<String, Integer> nameRankingPairTeam1 = new HashMap<>();
        teams.getTeam1().stream().map(LolEntityModel::getName).forEach(p->nameRankingPairTeam1.put(p, 1));

        Map<String, Integer> nameRankingPairTeam2 = new HashMap<>();
        teams.getTeam2().stream().map(LolEntityModel::getName).forEach(p->nameRankingPairTeam2.put(p, 2));

        List<Map<String, Integer>> test = new ArrayList<>();
        test.add(nameRankingPairTeam1);
        test.add(nameRankingPairTeam2);

        System.out.println(test);

        return test;
    }


}