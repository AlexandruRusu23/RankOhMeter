package ro.unibuc.rankohmeter.resources;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.rankohmeter.models.*;
import ro.unibuc.rankohmeter.services.LolService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/listing-players")
public class LolResource {

    @NonNull
    private final LolService lolService;

    @GetMapping
    public ResponseEntity<GenericListModel<LolEntityModel>> getAllPlayers(@ModelAttribute final LolFilterModel lolFilterModel) {
        return ResponseEntity.ok(lolService.getAllPlayers(lolFilterModel));
    }

    @GetMapping(value="/no-pag")
    public ResponseEntity<List<LolNoPagModel>> getAllNoPagPlayers() {
        return ResponseEntity.ok(lolService.getAllNoPagPlayers());
    }

    @RequestMapping(value="/rankings", method = RequestMethod.POST)
    public ResponseEntity<Object> getRankingsForSelectedPlayers(@RequestBody final TeamsModel teams) {
        return ResponseEntity.ok(lolService.getRankingsForSelectedPlayers(teams));
    }
}
