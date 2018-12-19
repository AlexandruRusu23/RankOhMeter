package ro.unibuc.rankohmeter.services;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.unibuc.rankohmeter.LolRepository.LolRepository;
import ro.unibuc.rankohmeter.mappers.LolMapper;
import ro.unibuc.rankohmeter.models.LolModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LolService {

    @NonNull
    private final LolRepository lolRepository;

    public List<LolModel> getAllPlayers() {
        return lolRepository.findAll().stream().map(LolMapper::toModel).collect(Collectors.toList());
    }
}
