package ro.unibuc.rankohmeter.services;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.unibuc.rankohmeter.entities.Lol;
import ro.unibuc.rankohmeter.models.LolFilterModel;
import ro.unibuc.rankohmeter.models.GenericListModel;
import ro.unibuc.rankohmeter.repositories.LolRepository;
import ro.unibuc.rankohmeter.mappers.LolMapper;
import ro.unibuc.rankohmeter.models.LolEntityModel;
import ro.unibuc.rankohmeter.specifications.PlayersSpecifications;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LolService {

    @NonNull
    private final LolRepository lolRepository;

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


}
