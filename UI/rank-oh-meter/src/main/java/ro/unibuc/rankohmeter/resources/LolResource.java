package ro.unibuc.rankohmeter.resources;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.unibuc.rankohmeter.models.LolModel;
import ro.unibuc.rankohmeter.services.LolService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/listing-players")
public class LolResource {

    @NonNull
    private final LolService lolService;

    @GetMapping
    public ResponseEntity<List<LolModel>> getAllVoucherTrigger(
            final LolModel lolModel) {
        return ResponseEntity.ok(lolService.getAllPlayers(lolModel));
    }
}
